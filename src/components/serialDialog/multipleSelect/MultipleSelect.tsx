import React, { useEffect, useRef, useState } from 'react'

import { SerialCard } from '../../../store/types'
import styles from './MultipleSelect.module.less'

type MultipleSelectProps = {
	setFields: React.Dispatch<React.SetStateAction<SerialCard>>
	editFields: string[]
}

export const MultipleSelect: React.FC<MultipleSelectProps> = ({
	setFields,
	editFields = [],
}) => {
	const [tags, setTags] = useState<string[]>(editFields)
	const [newTag, setNewTags] = useState<string>('')

	const handleChangeTag = (event: React.ChangeEvent<HTMLInputElement>) => {
		setNewTags(event.target.value)
	}

	useEffect(() => {
		setFields((prev) => {
			return {
				...prev,
				tags: [...tags],
			}
		})
	}, [tags])

	const addNewTag = () => {
		setNewTags('')
		setTags((prev) => {
			return [...prev, newTag]
		})
	}

	const deleteTagItem = (event: React.MouseEvent<HTMLSpanElement>) => {
		setTags((prev) => {
			return prev.filter(
				(el) =>
					el !==
					// @ts-ignore todo: Надо по другому
					((event.target as Element).previousSibling.textContent as string)
			)
		})
	}

	return (
		<>
			<div className={styles.tagsBlock}>
				{tags.map((tag) => {
					return (
						<>
							<div className={styles.tagItem}>{tag}</div>
							<span onClick={deleteTagItem}>X</span>
						</>
					)
				})}
				<input value={newTag} onChange={handleChangeTag} multiple={true} />
				<span onClick={() => addNewTag()} role='button'>
					Добавить
				</span>
			</div>
			<div className={styles.dropdown}></div>
		</>
	)
}
