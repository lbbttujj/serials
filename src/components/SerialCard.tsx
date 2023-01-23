import React, { useRef } from 'react'
import clsx from 'clsx'
import { SerialCard as SerialCardProps } from '../store/types'
import { useAppDispatch } from '../hooks'
import { deleteSeialById } from '../store/serialsSlice'
import styles from './SerialCard.module.less'

export const SerialCard: React.FC<SerialCardProps> = ({
	id,
	title,
	description,
	years,
	country,
	isFinished,
	rating,
	series,
	tags,
	image,
}) => {
	const dispatch = useAppDispatch()
	const fullDescription = useRef<HTMLDivElement>(null)

	const getImage = (base64Image: string) => {
		return (
			<img
				style={{ margin: 'auto' }}
				width='200px'
				src={`data:image/jpeg;base64,${base64Image}`}
			/>
		)
	}

	const deleteItem = (id: string) => {
		dispatch(deleteSeialById(id))
	}

	const showFullDescription = () => {
		if (fullDescription && fullDescription.current) {
			fullDescription.current.classList.remove('invisible')
		}
	}
	const hideFullDescription = () => {
		if (fullDescription && fullDescription.current) {
			fullDescription.current.classList.add('invisible')
		}
	}
	console.log(tags)
	debugger
	return (
		<div
			className={clsx(
				styles.serial,
				'serial relative w-1/5 border-2 border-solid p-6 pb-14 rounded-xl mb-5'
			)}
		>
			<div className={styles.imgBlock}>
				{getImage(image)}
				<div className={styles.imgBlockTitle}>{title}</div>
			</div>

			<hr />

			<div className={styles.mainPropertiesBlock}>
				<div>
					<b>Рейтинг: </b>
					{rating.split('').join(',')}
				</div>
				<div>
					<b>Страна: </b>
					{country}
				</div>
				<div>
					<b>Годы выхода:</b> {years}
				</div>
				<div>
					<b>Количество серий:</b> {series}
				</div>
				<div className={styles.tags}>
					{tags &&
						tags.map((el) => {
							return <div>{el}</div>
						})}
				</div>
			</div>

			<hr />

			<p>
				<b>Описание:</b>
			</p>
			<div className={styles.description}>
				<p className={styles.descriptionText}>{description}</p>
			</div>
			<p onMouseOver={showFullDescription} className={clsx(styles.nextRead)}>
				Читать далее
			</p>
			<div
				onMouseLeave={hideFullDescription}
				ref={fullDescription}
				className={clsx(styles.fullDescription, 'invisible')}
			>
				{description}
			</div>
			<button
				className='w-10/12 absolute px-2 py-1 border-2 rounded-xl bottom-2 border-solid border-red-800 text-red-800 hover:text-white hover:bg-red-800'
				onClick={() => deleteItem(id)}
			>
				Удалить
			</button>
		</div>
	)
}
