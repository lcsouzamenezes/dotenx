package docker

import (
	"bytes"
	"context"
	"errors"
	"fmt"
	"io"
	"log"

	"github.com/docker/docker/api/types"
	"github.com/docker/docker/api/types/container"
	"github.com/docker/docker/api/types/mount"
	"github.com/docker/docker/api/types/network"
	"github.com/dotenx/dotenx/runner/config"
	"github.com/dotenx/dotenx/runner/models"
)

func (executor *dockerExecutor) Execute(task *models.Task) (result *models.TaskExecutionResult) {
	result = &models.TaskExecutionResult{}
	result.Id = task.Details.Id
	result.Status = models.StatusCompleted
	if task.Details.Image == "" {
		result.Status = models.StatusFailed
		result.Error = errors.New("task dto is invalid and cant be processed")
		return
	}
	/*reader,*/ _, err := executor.Client.ImagePull(context.Background(), task.Details.Image, types.ImagePullOptions{})
	if err != nil {
		result.Status = models.StatusFailed
		result.Error = errors.New("error in pulling base image " + err.Error())
		return
	}
	//io.Copy(os.Stdout, reader) // to get pull image log
	var cont container.ContainerCreateCreatedBody
	if !task.IsPredifined {
		cont, err = executor.Client.ContainerCreate(
			context.Background(),
			&container.Config{
				Image: task.Details.Image,
				Cmd:   task.Script,
			}, nil, nil, nil, "")
	} else {
		task.EnvironmentVariables = append(task.EnvironmentVariables, "TASK_NAME="+task.Details.Name)
		networkConfig := &network.NetworkingConfig{
			EndpointsConfig: map[string]*network.EndpointSettings{},
		}
		gatewayConfig := &network.EndpointSettings{
			Gateway: "local",
		}
		networkConfig.EndpointsConfig["local"] = gatewayConfig
		cont, err = executor.Client.ContainerCreate(
			context.Background(),
			&container.Config{
				Image: task.Details.Image,
				Env:   task.EnvironmentVariables,
			},
			&container.HostConfig{
				Mounts: []mount.Mount{
					{
						Type:   mount.TypeBind,
						Source: config.Configs.App.FileSharing,
						Target: "/tmp",
					},
				},
			}, networkConfig, nil, "")
	}
	if err != nil {
		result.Status = models.StatusFailed
		result.Error = errors.New("error in creating container" + err.Error())
		return
	}
	err = executor.Client.ContainerStart(context.Background(), cont.ID, types.ContainerStartOptions{})
	if err != nil {
		log.Println(err)
		result.Error = err
		result.Status = models.StatusFailed
		result.Log = "error while starting container"
		return
	}
	//defer executor.Client.ContainerRemove(context.Background(), cont.ID, types.ContainerRemoveOptions{})
	fmt.Println("### for task[" + task.Details.Name + "], created container id is: " + cont.ID)

	statusCh, errCh := executor.Client.ContainerWait(context.Background(), cont.ID, container.WaitConditionNotRunning)
	select {
	case err := <-errCh:
		if err != nil {
			result.Error = err
			result.Status = models.StatusFailed
			result.Log = err.Error()
			return
		}
	case <-statusCh:
	}
	out, err := executor.Client.ContainerLogs(context.Background(), cont.ID, types.ContainerLogsOptions{ShowStdout: true})
	if err != nil {
		result.Error = err
		result.Status = models.StatusFailed
		result.Log = "error while get log of container"
		return
	}
	/*for start := time.Now(); time.Since(start) < time.Duration(task.Details.Timeout)*time.Second; {
		statusCode = executor.CheckStatus(cont.ID)
		if statusCode == -1 { // failed
			break
		} else if statusCode == 0 { // done
			result.Status = models.StatusCompleted
			break
		}
	}
	if statusCode != -1 && statusCode != 0 { // timedout
		result.Error = errors.New("timed out")
		result.Log = "timed out"
		return
	}*/
	result.Log = executor.GetLogs(out)
	log.Println("log: " + result.Log)
	log.Print("err: ")
	log.Println(result.Error)
	return
}

func (executor *dockerExecutor) GetLogs(reader io.Reader) string {
	buf := new(bytes.Buffer)
	buf.ReadFrom(reader)
	logs := buf.String()
	return logs
}
