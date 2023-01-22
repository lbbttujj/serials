import React from 'react'
import { SerialCard as SerialCardProps } from '../store/types'
import { useAppDispatch } from '../hooks'
import { deleteSeialById } from '../store/serialsSlice'

export const SerialCard: React.FC<SerialCardProps> = ({
	id,
	title,
	description,
	years,
	country,
	isFinished,
	rating,
	series,
	image,
}) => {
	const dispatch = useAppDispatch()

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

	return (
		<div className='relative w-1/5 border-2 border-solid p-6 pb-14 rounded-xl mb-5'>
			<div>{getImage(image)}</div>
			<div
				style={{ width: '100%', textAlign: 'center' }}
				className='text-3xl font-bold'
			>
				{title}
			</div>
			<hr />
			<div>
				<b>Рейтинг: </b>
				{rating.split('').join(',')}
			</div>
			<p>{!isFinished && 'Сериал еще не закончился'}</p>
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
			<br />
			<hr />
			<p>
				<b>Описание:</b>
			</p>
			<p style={{ wordWrap: 'break-word' }}>{description}</p>
			<button
				className='w-10/12 absolute px-2 py-1 border-2 rounded-xl bottom-2 border-solid border-red-800 text-red-800 hover:text-white hover:bg-red-800'
				onClick={() => deleteItem(id)}
			>
				Удалить
			</button>
		</div>
	)
}
