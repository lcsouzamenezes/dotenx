package publishutils

import (
	"bytes"
	"encoding/json"
	"fmt"
	"text/template"
)

type TextArea struct {
	kind       string        `json:"kind"`
	Id         string        `json:"id"`
	Components []interface{} `json:"components"`
	RepeatFrom struct {
		Name     string
		Iterator string
	} `json:"repeatFrom"`
	ClassNames []string `json:"classNames"`
	ElementId  string   `json:"elementId"`
	Bindings   Bindings `json:"bindings"`
	Data       struct {
		Style struct {
			Desktop StyleModes `json:"desktop"`
			Tablet  StyleModes `json:"tablet"`
			Mobile  StyleModes `json:"mobile"`
		} `json:"style"`
		DefaultValue string `json:"defaultValue"`
		Name         string `json:"name"`
		Placeholder  string `json:"placeholder"`
		Required     bool   `json:"required"`
		Type         string `json:"type"`
		Value        string `json:"value"`
		Rows         string `json:"rows"`
		Cols         string `json:"cols"`
	} `json:"data"`
}

const textAreaTemplate = `<textarea {{if .Bindings.Class.FromStateName}}:class="{{renderClassBinding .Bindings}}"{{end}} {{if or .Bindings.Show.FromStateName .Bindings.Hide.FromStateName}}x-show="{{renderBindings .Bindings}}"{{end}} cols="{{.Data.Cols}}" rows="{{.Data.Rows}}" id="{{if .ElementId}}{{.ElementId}}{{else}}{{.Id}}{{end}}" class="{{range .ClassNames}}{{.}} {{end}}" placeholder="{{.Data.Placeholder}}" x-model="formData.{{.Data.Name}}" {{if .Data.DefaultValue}} x-init="formData.{{.Data.Name}}='{{.Data.DefaultValue}}'" {{end}}></textarea>`

func convertTextArea(component map[string]interface{}, styleStore *StyleStore, functionStore *FunctionStore) (string, error) {
	funcMap := template.FuncMap{
		"renderClassBinding": RenderClassBinding,
		"renderEvents":       renderEvents,
		"renderBindings":     RenderShowHideBindings,
	}
	b, err := json.Marshal(component)
	if err != nil {
		fmt.Println(err)
		return "", err
	}
	var textArea TextArea
	json.Unmarshal(b, &textArea)
	tmpl, err := template.New("textArea").Funcs(funcMap).Parse(textAreaTemplate)
	if err != nil {
		fmt.Println(err)
		return "", err
	}

	var out bytes.Buffer
	err = tmpl.Execute(&out, textArea)
	if err != nil {
		fmt.Println("error: ", err.Error())
		return "", err
	}

	// Add the styles to the styleStore to be rendered later
	id := textArea.Id
	if textArea.ElementId != "" {
		id = textArea.ElementId
	}
	styleStore.AddStyle(id, textArea.Data.Style.Desktop, textArea.Data.Style.Tablet, textArea.Data.Style.Mobile)

	return out.String(), nil
}
