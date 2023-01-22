import React, { useState } from 'react'
import { SerialCard } from '../store/types'
import { addSerial } from '../store/serialsSlice'
import { useAppDispatch } from '../hooks'
import { ReactComponent as Cross } from '../assets/cross.svg'

type AddSerialDialogProps = {
	closeDialog: React.Dispatch<React.SetStateAction<boolean>>
}

export const AddSerialDialog: React.FC<AddSerialDialogProps> = ({
	closeDialog,
}) => {
	const dispatch = useAppDispatch()
	const [fields, setFields] = useState<SerialCard>({
		isFinished: true,
	} as SerialCard)

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

	const close = () => {
		closeDialog(false)
	}

	const add = () => {
		dispatch(addSerial(fields))
		close()
	}

	return (
		<div
			onClick={() => {
				close()
			}}
			className='z-10 w-screen h-screen bg-black/60 absolute'
		>
			<div
				onClick={(event) => event.stopPropagation()}
				className=' p-4  bg-white w-6/12 relative left-1/4 top-16 opacity-100 border-2 border-solid rounded-2xl'
			>
				<form method='POST'>
					<div className='rounded-md relative flex flex-wrap h-60 flex-col'>
						<span
							onClick={() => close()}
							className='absolute right-4 top-0 hover:cursor-pointer'
						>
							<Cross />
						</span>

						<div className='mb-3 mr-2 mt-3'>
							<label htmlFor='title' className='mr-4'>
								Название
							</label>
							<input
								className='border-solid border-2 rounded-xl px-4 py-2 w-8/12 active:border-indigo-700'
								id='title'
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
						<div className='mb-8 mr-2 mt-3'>
							<label className='mr-4' htmlFor='isFinished'>
								Сериал закончился
							</label>
							<input
								className='border-solid border-2 rounded-xl px-4 py-2 w-1/12 active:border-indigo-700'
								id='isFinished'
								type='checkbox'
								onChange={(event) =>
									setFields((prev) => {
										return {
											...prev,
											isFinished: event.target.checked,
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
					<div className='w-full flex flex-col'>
						<label htmlFor='image'>Выберете изображение</label>
						{image && (
							<div className='absolute left-3/4 border-2 border-solid rounded-xl p-2'>
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
							debugger
							if (Object.keys(fields).length === 8) {
								console.log('success')
								add()
							} else {
								console.log('Необходимо заполнить все поля')
							}
						}}
					>
						Добавить
					</button>
				</form>
			</div>
		</div>
	)
}
