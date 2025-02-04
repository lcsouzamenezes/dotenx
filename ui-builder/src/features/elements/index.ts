import { BoxElement } from './extensions/box'
import { ButtonElement } from './extensions/button'
import { AreaChart } from './extensions/chart-area'
import { BarChart } from './extensions/chart-bar'
import { BubbleChart } from './extensions/chart-bubble'
import { DoughnutChart } from './extensions/chart-doughnut'
import { LineChart } from './extensions/chart-line'
import { PieChart } from './extensions/chart-pie'
import { PolarAreaChart } from './extensions/chart-polar-area'
import { RadarChart } from './extensions/chart-radar'
import { ScatterChart } from './extensions/chart-scatter'
import { CollapsibleElement } from './extensions/collapsible'
import { ColumnsElement } from './extensions/columns'
import { DividerElement } from './extensions/divider'
import { DropdownElement } from './extensions/dropdown'
import { ExtensionElement } from './extensions/extension'
import { FormElement } from './extensions/form'
import { IconElement } from './extensions/icon'
import { ImageElement } from './extensions/image'
import { InputElement } from './extensions/input'
import { LinkElement } from './extensions/link'
import { MenuButtonElement } from './extensions/nav/menu-button'
import { NavMenuElement } from './extensions/nav/nav-menu'
import { NavbarElement } from './extensions/nav/navbar'
import { PictureElement } from './extensions/picture'
import { SelectElement } from './extensions/select'
import { SliderElement } from './extensions/slider'
import { StackElement } from './extensions/stack'
import { SubmitElement } from './extensions/submit'
import { TextElement } from './extensions/text'
import { TextareaElement } from './extensions/textarea'
import { VideoElement } from './extensions/video'
import { YouTubeElement } from './extensions/youtube'
import './fa-import'

export const ElementSections = [
	{
		title: 'Basic',
		items: [
			TextElement,
			ButtonElement,
			ImageElement,
			LinkElement,
			DividerElement,
			BoxElement,
			ColumnsElement,
			StackElement,
			IconElement,
			VideoElement,
			YouTubeElement,
			PictureElement,
		],
	},
	{
		title: 'Compound',
		items: [NavbarElement, SliderElement, CollapsibleElement, DropdownElement],
	},
	{
		title: 'Form',
		items: [FormElement, InputElement, SelectElement, TextareaElement, SubmitElement],
	},
	{
		title: 'Charts',
		items: [
			BarChart,
			AreaChart,
			LineChart,
			PieChart,
			DoughnutChart,
			PolarAreaChart,
			RadarChart,
			ScatterChart,
			BubbleChart,
		],
	},
] as const

export const ELEMENTS = [
	TextElement,
	ButtonElement,
	ImageElement,
	LinkElement,
	DividerElement,
	BoxElement,
	ColumnsElement,
	StackElement,
	IconElement,
	VideoElement,
	YouTubeElement,
	PictureElement,
	NavbarElement,
	SliderElement,
	CollapsibleElement,
	DropdownElement,
	FormElement,
	InputElement,
	SelectElement,
	TextareaElement,
	SubmitElement,
	BarChart,
	AreaChart,
	LineChart,
	PieChart,
	DoughnutChart,
	PolarAreaChart,
	RadarChart,
	ScatterChart,
	BubbleChart,
	MenuButtonElement,
	NavMenuElement,
	ExtensionElement,
]
