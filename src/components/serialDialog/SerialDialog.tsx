import { clsx } from 'clsx'
import React, { useEffect, useState } from 'react'

import { ReactComponent as Cross } from '../../assets/cross.svg'
import { useAppDispatch } from '../../hooks'
import { addSerial, updateSerial } from '../../store/serialsSlice'
import { SerialCard } from '../../store/types'
import { Modal } from '../uiKit'
import { MultipleSelect } from './multipleSelect/MultipleSelect'
import styles from './SerialDialog.module.less'

type AddSerialDialogProps = {
	closeDialog: React.Dispatch<React.SetStateAction<boolean>>
	isEdit?: boolean
	editFields?: SerialCard
}

export const SerialDialog: React.FC<AddSerialDialogProps> = ({
	closeDialog,
	isEdit = false,
	editFields = {} as SerialCard,
}) => {
	const dispatch = useAppDispatch()
	const [fields, setFields] = useState<SerialCard>(editFields as SerialCard)
	const [image, setImage] = useState('')

	// throw new Error('Test')

	const convertToBase64 = (event: React.ChangeEvent<HTMLInputElement>) => {
		const files = event.target.files
		if (files && files[0]) {
			const file = files[0]
			const reader = new FileReader()

			reader.onloadend = () => {
				if (reader.result) {
					setImage(reader.result.toString())
					setFields((prev) => {
						if (reader.result) {
							const image = reader.result.toString().split('base64,')[1]
							return { ...prev, image: image }
						}
						return { ...prev }
					})
				}
			}
			reader.readAsDataURL(file)
		}
	}

	useEffect(() => {
		console.log(fields)
	}, [fields])

	const close = () => {
		closeDialog(false)
	}

	const add = () => {
		dispatch(addSerial(fields))
		close()
	}

	const edit = () => {
		dispatch(updateSerial(fields))
		close()
	}

	return (
		<Modal close={close}>
			<form method='POST'>
				<div className='rounded-md relative flex flex-wrap h-60 flex-col'>
					<div className='mb-3 mr-2 mt-3'>
						<label htmlFor='title' className='mr-4'>
							Название
						</label>
						<input
							className='border-solid border-2 rounded-xl px-4 py-2 w-8/12 active:border-indigo-700'
							id='title'
							defaultValue={editFields.title}
							onChange={(event) =>
								setFields((prev) => {
									return {
										...prev,
										title: event.target.value,
									}
								})
							}
						/>
					</div>
					<div className='mb-3 mr-2 ml-4 mt-3'>
						<label className='mr-4' htmlFor='country'>
							Страна
						</label>
						<input
							className='border-solid border-2 rounded-xl px-4 py-2 w-8/12 active:border-indigo-700'
							id='country'
							defaultValue={editFields.country}
							onChange={(event) =>
								setFields((prev) => {
									return {
										...prev,
										country: event.target.value,
									}
								})
							}
						/>
					</div>
					<div className='mb-3 mr-2 ml-7 mt-3'>
						<label className='mr-4' htmlFor='years'>
							Годы
						</label>
						<input
							className='border-solid border-2 rounded-xl px-4 py-2 w-8/12 active:border-indigo-700'
							id='years'
							defaultValue={editFields.years}
							onChange={(event) =>
								setFields((prev) => {
									return {
										...prev,
										years: event.target.value,
									}
								})
							}
						/>
					</div>

					<div className='mb-3 mr-2 mt-3'>
						<label className='mr-4' htmlFor='rating'>
							Рейтинг
						</label>
						<input
							type='range'
							min={0}
							max={99}
							defaultValue={editFields.rating}
							className='border-solid border-2 rounded-xl px-4 py-2 w-8/12 active:border-indigo-700'
							id='rating'
							onChange={(event) =>
								setFields((prev) => {
									return {
										...prev,
										rating: event.target.value,
									}
								})
							}
						/>
					</div>
					<div className='mb-3 mr-2 mt-3'>
						<label className='mr-4' htmlFor='series'>
							Количество серий
						</label>
						<input
							className='border-solid border-2 rounded-xl px-4 py-2 w-6/12 active:border-indigo-700'
							id='series'
							defaultValue={editFields.series}
							type='number'
							onChange={(event) =>
								setFields((prev) => {
									return {
										...prev,
										series: Number(event.target.value),
									}
								})
							}
						/>
					</div>
				</div>
				<div className='mb-3 mr-2 mt-3'>
					<label className='mr-4' htmlFor='tags'>
						Тэги
					</label>
					<MultipleSelect editFields={editFields.tags} setFields={setFields} />
				</div>
				<div className='w-full flex flex-col'>
					<label htmlFor='image'>Выберете изображение</label>
					{image && (
						<div className='absolute left-3/4 border-2 border-solid rounded-xl p-2 flex'>
							<img width='100px' src={image}></img>
						</div>
					)}
					<input
						id='image'
						type='file'
						className='block w-full text-sm text-slate-500
                                          file:mr-4 file:py-2 file:px-4
                                          file:rounded-full file:border-0
                                          file:text-sm file:font-semibold
                                          file:bg-violet-50 file:text-violet-700
                                          hover:file:bg-violet-100 mb-16'
						onChange={(event) => convertToBase64(event)}
					/>
					<label className='mb-2' htmlFor='description'>
						Введите описание
					</label>
					<textarea
						className='mb-4 border-2 border-solid rounded-xl p-4'
						defaultValue={editFields.description}
						id='description'
						onChange={(event) =>
							setFields((prev) => {
								return {
									...prev,
									description: event.target.value,
								}
							})
						}
					/>
				</div>
				<button
					className='px-4 py-2 bg-white w-full text-indigo-700 border-2 rounded-2xl border-solid border-indigo-700 hover:text-white hover:bg-indigo-700'
					onClick={() => {
						isEdit ? edit() : add()
					}}
				>
					{isEdit ? 'Изменить' : 'Добавить'}
				</button>
			</form>
		</Modal>
	)
}
