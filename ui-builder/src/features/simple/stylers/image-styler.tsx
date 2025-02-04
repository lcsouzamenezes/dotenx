import { useSetWithElement } from '../../elements/elements-store'
import { ImageElement } from '../../elements/extensions/image'
import { Expression } from '../../states/expression'
import { BordersEditor } from '../../style/border-editor'
import { SizeEditor } from '../../style/size-editor'
import { SpacingEditor } from '../../style/spacing-editor'
import { ImageDrop } from '../../ui/image-drop'
import { Styler } from './styler'

export function ImageStyler({ element }: { element: ImageElement }) {
	const set = useSetWithElement(element)

	return (
		<ImageDrop
			src={element.data.src.toString()}
			onChange={(value) => set((draft) => (draft.data.src = Expression.fromString(value)))}
			rightSection={<StyleEditor element={element} />}
		/>
	)
}

function StyleEditor({ element }: { element: ImageElement }) {
	return (
		<Styler>
			<SizeEditor element={element} simple />
			<BordersEditor element={element} simple />
			<SpacingEditor element={element} />
		</Styler>
	)
}
