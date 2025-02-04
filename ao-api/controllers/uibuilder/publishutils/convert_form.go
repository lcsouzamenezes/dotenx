package publishutils

import (
	"bytes"
	"encoding/json"
	"fmt"
	"strings"
	"text/template"
)

type Form struct {
	Kind       string        `json:"kind"`
	Id         string        `json:"id"`
	Components []interface{} `json:"components"`
	RepeatFrom struct {
		Name     string
		Iterator string
	} `json:"repeatFrom"`
	Events     []Event  `json:"events"`
	Bindings   Bindings `json:"bindings"`
	ClassNames []string `json:"classNames"`
	ElementId  string   `json:"elementId"`
	Data       struct {
		Style struct {
			Desktop StyleModes `json:"desktop"`
			Tablet  StyleModes `json:"tablet"`
			Mobile  StyleModes `json:"mobile"`
		} `json:"style"`
		Text           string `json:"text"`
		DataSourceName string `json:"dataSourceName"`
	} `json:"data"`
}

const formTemplate = `{{if .RepeatFrom.Name}}<template x-for="({{.RepeatFrom.Iterator}}, index) in {{.RepeatFrom.Name}}">{{end}}<form {{if .Bindings.Class.FromStateName}}:class="{{renderClassBinding .Bindings}}"{{end}} {{if or .Bindings.Show.FromStateName .Bindings.Hide.FromStateName}}x-show="{{renderBindings .Bindings}}"{{end}} @submit.prevent="$store.{{.DataSourceName}}.fetch({body: formData})" x-data="{formData:{}}" {{if .RepeatFrom.Name}}:key="index"{{end}} id="{{if .ElementId}}{{.ElementId}}{{else}}{{.Id}}{{end}}" class="{{range .ClassNames}}{{.}} {{end}}">{{.RenderedChildren}}</form>{{if .RepeatFrom.Name}}</template>{{end}}`

func convertForm(component map[string]interface{}, styleStore *StyleStore, functionStore *FunctionStore) (string, error) {
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

	var form Form
	json.Unmarshal(b, &form)
	tmpl, err := template.New("form").Funcs(funcMap).Parse(formTemplate)
	if err != nil {
		fmt.Println(err)
		return "", err
	}

	var renderedChildren []string

	for _, child := range form.Components {
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
		Bindings         Bindings
		RepeatFrom       struct {
			Name     string
			Iterator string
		}
		Events         []Event
		DataSourceName string
		ClassNames     []string
	}{
		RenderedChildren: strings.Join(renderedChildren, "\n"),
		Id:               form.Id,
		ElementId:        form.ElementId,
		Bindings:         form.Bindings,
		RepeatFrom:       form.RepeatFrom,
		Events:           form.Events,
		DataSourceName:   form.Data.DataSourceName,
		ClassNames:       form.ClassNames,
	}

	var out bytes.Buffer
	err = tmpl.Execute(&out, params)
	if err != nil {
		fmt.Println("error: ", err.Error())
		return "", err
	}

	// Add the events to the function store to be rendered later
	functionStore.AddEvents(form.Events)

	// Add the styles to the styleStore to be rendered later
	id := form.Id
	if form.ElementId != "" {
		id = form.ElementId
	}
	styleStore.AddStyle(id, form.Data.Style.Desktop, form.Data.Style.Tablet, form.Data.Style.Mobile)

	return out.String(), nil
}
