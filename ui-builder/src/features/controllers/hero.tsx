import produce from 'immer'
import { ReactNode } from 'react'
import imageUrl from '../../assets/components/hero.png'
import { deserializeElement } from '../../utils/deserialize'
import { ImageElement } from '../elements/extensions/image'
import { TextElement } from '../elements/extensions/text'
import { Expression } from '../states/expression'
import { ImageDrop } from '../ui/image-drop'
import { Intelinput } from '../ui/intelinput'
import ColorOptions from './basic-components/color-options'
import { Controller, ElementOptions } from './controller'
import { ComponentName, DividerCollapsible } from './helpers'

export class Hero extends Controller {
	//feature details left is similar to this component but better//
	name = 'Hero'
	image = imageUrl
	defaultData = deserializeElement(defaultData)

	renderOptions(options: ElementOptions): ReactNode {
		const titleComponent = options.element.children?.[0].children?.[0] as TextElement
		const descriptionComponent = options.element.children?.[0].children?.[1] as TextElement
		const imageComponent = options.element.children?.[1].children?.[0] as ImageElement
		return (
			<div className="space-y-6">
				<ComponentName name="Hero" />
				<Intelinput
					label="Title"
					name="title"
					size="xs"
					value={titleComponent.data.text}
					onChange={(value) =>
						options.set(
							produce(titleComponent, (draft) => {
								draft.data.text = value
							})
						)
					}
				/>
				<Intelinput
					label="Description"
					name="description"
					size="xs"
					autosize
					maxRows={10}
					value={descriptionComponent.data.text}
					onChange={(value) =>
						options.set(
							produce(descriptionComponent, (draft) => {
								draft.data.text = value
							})
						)
					}
				/>
				<ImageDrop
					onChange={(src) =>
						options.set(
							produce(imageComponent, (draft) => {
								draft.data.src = Expression.fromString(src)
							})
						)
					}
					src={imageComponent.data.src.toString()}
				/>
				<DividerCollapsible closed title="color">
					{ColorOptions.getBackgroundOption({ options, wrapperDiv: options.element })}
					{ColorOptions.getTextColorOption({
						options,
						wrapperDiv: titleComponent,
						title: 'Title',
					})}
					{ColorOptions.getTextColorOption({
						options,
						wrapperDiv: descriptionComponent,
						title: 'Description',
					})}
				</DividerCollapsible>
			</div>
		)
	}
}

const defaultData = {
	kind: 'Columns',
	components: [
		{
			kind: 'Box',
			components: [
				{
					kind: 'Text',
					components: [],
					classNames: [],
					repeatFrom: null,
					bindings: {},
					events: [],
					id: '',
					parentId: '',
					data: {
						style: {
							desktop: {
								default: {
									fontSize: '3rem',
									fontWeight: '900',
									color: 'hsla(0, 0%, 0%, 0.7)',
									marginBottom: '40px',
								},
							},
							tablet: {},
							mobile: {},
						},
						text: 'Lorem ipsum dolor',
					},
				},
				{
					kind: 'Text',
					components: [],
					classNames: [],
					repeatFrom: null,
					bindings: {},
					events: [],
					id: '',
					parentId: '',
					data: {
						style: {
							desktop: {
								default: {
									fontSize: '1rem',
									color: 'hsla(0, 0%, 0%, 0.7)',
									lineHeight: '24px',
								},
							},
							tablet: {},
							mobile: {},
						},
						text: 'Sit amet consectetur adipisicing elit. Fugiat atque natus accusantium officia? Obcaecati magni, ex rerum accusantium sed voluptatum neque ea repellat atque nemo veniam voluptate, eligendi iste laboriosam?',
					},
				},
			],
			classNames: [],
			repeatFrom: null,
			bindings: {},
			events: [],
			id: '',
			parentId: '',
			data: { style: { desktop: {}, tablet: {}, mobile: {} } },
		},
		{
			kind: 'Box',
			components: [
				{
					kind: 'Image',
					components: [],
					classNames: [],
					repeatFrom: null,
					bindings: {},
					events: [],
					id: '',
					parentId: '',
					data: {
						style: {
							desktop: {
								default: {
									backgroundSize: 'cover',
									backgroundPosition: 'center',
									width: '100%',
									borderRadius: '20px',
								},
							},
							tablet: {},
							mobile: {},
						},
						src: 'https://img.freepik.com/free-photo/grunge-paint-background_1409-1337.jpg?w=1060&t=st=1664178763~exp=1664179363~hmac=e08ff5287818c28fea4d77fc347cf0c4f3db3fc6f8a0e59bc23e607c0fada0fa',
						alt: '',
					},
				},
			],
			classNames: [],
			repeatFrom: null,
			bindings: {},
			events: [],
			id: '',
			parentId: '',
			data: { style: { desktop: {}, tablet: {}, mobile: {} } },
		},
	],
	classNames: [],
	repeatFrom: null,
	bindings: {},
	events: [],
	id: '',
	parentId: '',
	data: {
		style: {
			desktop: {
				default: {
					display: 'grid',
					gridTemplateColumns: '1fr 1fr',
					gap: '100px',
					alignItems: 'center',
					paddingTop: '40px',
					paddingLeft: '40px',
					paddingRight: '40px',
					paddingBottom: '40px',
				},
			},
			tablet: {},
			mobile: {},
		},
	},
}
