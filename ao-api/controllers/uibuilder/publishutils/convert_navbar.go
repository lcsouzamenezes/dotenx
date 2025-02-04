package publishutils

import (
	"bytes"
	"encoding/json"
	"fmt"
	"strings"
	"text/template"
)

const navbarTemplate = `<nav x-data="{isOpen:window.innerWidth > 640}" id="{{if .ElementId}}{{.ElementId}}{{else}}{{.Id}}{{end}}" class="{{range .ClassNames}}{{.}} {{end}}"   {{renderEvents .Events}} {{if .RepeatFrom.Name}}:key="index"{{end}}>{{.RenderedChildren}}</nav>`

// Exactly same as box, just a slightly different template
func convertNavbar(component map[string]interface{}, styleStore *StyleStore, functionStore *FunctionStore) (string, error) {
	b, err := json.Marshal(component)
	if err != nil {
		fmt.Println(err)
		return "", err
	}

	funcMap := template.FuncMap{
		"renderEvents": renderEvents,
	}

	var box Box
	json.Unmarshal(b, &box)
	tmpl, err := template.New("navbar").Funcs(funcMap).Parse(navbarTemplate)
	if err != nil {
		fmt.Println(err)
		return "", err
	}

	var renderedChildren []string

	for _, child := range box.Components {
		renderedChild, err := convertComponentToHTML(child.(map[string]interface{}), styleStore, functionStore)
		if err != nil {
			fmt.Println(err)
			return "", err
		}
		renderedChildren = append(renderedChildren, renderedChild)
	}

	params := struct {
		RenderedChildren string
		Id               string
		ElementId        string
		RepeatFrom       struct {
			Name     string
			Iterator string
		}
		Events     []Event
		ClassNames []string
		VisibleAnimation
	}{
		RenderedChildren: strings.Join(renderedChildren, "\n"),
		Id:               box.Id,
		ElementId:        box.ElementId,
		RepeatFrom:       box.RepeatFrom,
		Events:           box.Events,
		ClassNames:       box.ClassNames,
	}

	var out bytes.Buffer
	err = tmpl.Execute(&out, params)
	if err != nil {
		fmt.Println("error: ", err.Error())
		return "", err
	}

	// Add the events to the function store to be rendered later
	functionStore.AddEvents(box.Events)

	// Add the styles to the styleStore to be rendered later
	id := box.Id
	if box.ElementId != "" {
		id = box.ElementId
	}
	styleStore.AddStyle(id, box.Data.Style.Desktop, box.Data.Style.Tablet, box.Data.Style.Mobile)

	return out.String(), nil
}
