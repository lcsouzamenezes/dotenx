import produce from 'immer'
import { ReactNode } from 'react'
import profile1Url from '../../assets/components/profile1.jpg'
import profile2Url from '../../assets/components/profile2.jpg'
import profile3Url from '../../assets/components/profile3.jpg'
import profile4Url from '../../assets/components/profile4.jpg'
import imageUrl from '../../assets/components/team-center-grid.png'
import { deserializeElement } from '../../utils/deserialize'
import { regenElement } from '../clipboard/copy-paste'
import { Element } from '../elements/element'
import { BoxElement } from '../elements/extensions/box'
import { ImageElement } from '../elements/extensions/image'
import { TextElement } from '../elements/extensions/text'
import { BoxStylerSimple } from '../simple/stylers/box-styler'
import { TextStyler } from '../simple/stylers/text-styler'
import { Expression } from '../states/expression'
import ColorOptions from './basic-components/color-options'
import { Controller, ElementOptions } from './controller'
import { ComponentName, DividerCollapsible, SimpleComponentOptionsProps } from './helpers'
import { DndTabs } from './helpers/dnd-tabs'
import { OptionsWrapper } from './helpers/options-wrapper'

export class TeamCenterGrid extends Controller {
	name = 'Team Center Grid'
	image = imageUrl
	defaultData = deserializeElement(defaultData)

	renderOptions(options: ElementOptions): ReactNode {
		return <GalleryBasicOptions options={options} />
	}
}

// =============  renderOptions =============

function GalleryBasicOptions({ options }: SimpleComponentOptionsProps) {
	const titleText = options.element.children?.[0].children?.[0] as TextElement
	const subtitleText = options.element.children?.[0].children?.[1] as TextElement
	const containerDiv = options.element.children?.[1].children?.[0] as BoxElement

	return (
		<OptionsWrapper>
			<ComponentName name="Team Center Grid" />
			<TextStyler label="Title" element={titleText} />
			<TextStyler label="Subtitle" element={subtitleText} />
			<BoxStylerSimple label="Background color" element={options.element} />
			<DndTabs
				containerElement={containerDiv}
				insertElement={() => regenElement(tile)}
				renderItemOptions={(item) => <ItemOptions item={item} />}
			/>
			<DividerCollapsible closed title="Tiles color">
				{ColorOptions.getBackgroundOption({
					options,
					wrapperDiv: containerDiv.children?.[0],
					title: 'Background color',
					mapDiv: containerDiv.children,
				})}
			</DividerCollapsible>
		</OptionsWrapper>
	)
}

function ItemOptions({ item }: { item: Element }) {
	return (
		<OptionsWrapper>
			<TextStyler label="Feature title" element={item.children?.[1] as TextElement} />
			<TextStyler label="Feature description" element={item.children?.[2] as TextElement} />
		</OptionsWrapper>
	)
}

// =============  defaultData =============

const wrapperDiv = produce(new BoxElement(), (draft) => {
	draft.style.desktop = {
		default: {
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'center',
			alignItems: 'center',
			width: '100%',
			paddingTop: '40px',
			paddingBottom: '40px',
		},
	}
}).serialize()

const topDiv = produce(new BoxElement(), (draft) => {
	draft.style.desktop = {
		default: {
			textAlign: 'center',
			marginBottom: '20px',
		},
	}
}).serialize()

const divFlex = produce(new BoxElement(), (draft) => {
	draft.style.desktop = {
		default: {
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			width: '100%',
		},
	}
}).serialize()

const title = produce(new TextElement(), (draft) => {
	draft.style.desktop = {
		default: {
			fontSize: '32px',
			marginBottom: '8px',
		},
	}
	draft.data.text = Expression.fromString('Our team')
}).serialize()

const subTitle = produce(new TextElement(), (draft) => {
	draft.style.desktop = {
		default: {
			fontSize: '24px',
			marginBottom: '12px',
			color: '#666',
		},
	}
	draft.data.text = Expression.fromString('Meet the team of people who make it all happen')
}).serialize()

const tileTitle = produce(new TextElement(), (draft) => {
	draft.style.desktop = {
		default: {
			fontSize: '24px',
			fontWeight: 'bold',
			marginBottom: '14px',
		},
	}
	draft.data.text = Expression.fromString('Feature')
})

const tileDetails = produce(new TextElement(), (draft) => {
	draft.style.desktop = {
		default: {
			fontSize: '14px',
		},
	}
	draft.data.text = Expression.fromString('Feature description goes here')
})

const tileIcon = produce(new ImageElement(), (draft) => {
	draft.style.desktop = {
		default: {
			width: '50%',
			borderRadius: '50%',
			marginBottom: '10px',
			transform: 'translateY(-10px)',
		},
	}
	draft.data.src = Expression.fromString(
		'https://cdn.iconscout.com/icon/free/png-256/like-1648810-1401300.png'
	)
})

const tile = produce(new BoxElement(), (draft) => {
	draft.style.desktop = {
		default: {
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'center',
			alignItems: 'center',
			boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.2)',
			borderRadius: '10px',
			paddingBottom: '30px',
			backgroundColor: 'white',
		},
	}
	draft.children = [tileIcon, tileTitle, tileDetails]
})

function createTile({
	image,
	title,
	description,
}: {
	image: string
	title: string
	description: string
}) {
	return produce(tile, (draft) => {
		const ImageElement = draft.children?.[0] as ImageElement
		ImageElement.data.src = Expression.fromString(image)
		;(draft.children?.[1] as TextElement).data.text = Expression.fromString(title)
		;(draft.children?.[2] as TextElement).data.text = Expression.fromString(description)
	})
}

const tiles = [
	createTile({
		image: profile1Url,
		title: 'John Doe',
		description: 'No-code developer',
	}),
	createTile({
		image: profile2Url,
		title: 'Jane Doe',
		description: 'Senior UX designer',
	}),
	createTile({
		image: profile3Url,
		title: 'Jack Doe',
		description: 'CEO',
	}),
	createTile({
		image: profile4Url,
		title: 'Sam Doe',
		description: 'Marketing manager',
	}),
]

const grid = produce(new BoxElement(), (draft) => {
	draft.style.desktop = {
		default: {
			display: 'grid',
			gridTemplateColumns: '1fr 1fr 1fr 1fr',
			gridGap: '20px',
			width: '70%',
		},
	}
	draft.style.tablet = {
		default: {
			gridTemplateColumns: '1fr 1fr',
		},
	}
	draft.style.mobile = {
		default: {
			gridTemplateColumns: '1fr',
		},
	}
}).serialize()

const defaultData = {
	...wrapperDiv,
	components: [
		{
			...topDiv,
			components: [title, subTitle],
		},
		{
			...divFlex,
			components: [
				{
					...grid,
					components: tiles.map((tile) => tile.serialize()),
				},
			],
		},
	],
}
