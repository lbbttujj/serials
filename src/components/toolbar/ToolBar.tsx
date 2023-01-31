import React from 'react'

import { useAppDispatch, useAppSelector } from '../../hooks'
import { setVisibleSerials } from '../../store/serialsSlice'
import { logout } from '../../store/usersSlice'
import { debounce } from '../../utils/debounce'
import { Button } from '../uiKit'

type ToolBarProps = {
	add: () => void
	openAuthorize: () => void
}

export const ToolBar: React.FC<ToolBarProps> = ({ add, openAuthorize }) => {
	const dispatch = useAppDispatch()
	const serials = useAppSelector((state) => state.serials.serials)

	function filter(e: React.ChangeEvent<HTMLInputElement>) {
		const payload = e.target.value
		const newVisibleSerials = serials.filter((item) => {
			let sum = ''
			Object.entries(item).forEach(([key, value]) => {
				if (key !== 'image') {
					return (sum += value + '')
				}
			})
			return sum.toLowerCase().includes(payload)
		})
		dispatch(setVisibleSerials(newVisibleSerials))
	}

	// @ts-ignore
	filter = debounce(filter, 500)

	return (
		<div className='w-full flex justify-center mb-5'>
			<input
				onChange={filter}
				className='w-4/12 ml-32 border-2 border-solid py-2 px-2 border-black/70 focus:border-indigo-800  rounded-xl mr-4'
			/>
			<Button onClick={add}>Добавить сериал</Button>
			<Button onClick={openAuthorize}>Войти</Button>
			<Button onClick={() => dispatch(logout())}>Выйти</Button>
		</div>
	)
}
