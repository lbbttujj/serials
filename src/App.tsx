import clsx from 'clsx'
import React, { useEffect, useState } from 'react'

import { SerialCard } from './components/mainSerialPage/SerialCard'
import { Registration } from './components/registration/Registration'
import { SerialDialog } from './components/serialDialog/SerialDialog'
import { ToolBar } from './components/toolbar/ToolBar'
import { useAppDispatch, useAppSelector } from './hooks'
import { fetchSerials } from './store/serialsSlice'

function App() {
	const serials = useAppSelector((state) => state.serials.visibleSerial)
	const isLoading = useAppSelector((state) => state.serials.status)

	const dispatch = useAppDispatch()

	const [isOpenAddDialog, setIsOpenAddDialog] = useState<boolean>(false)
	const [isOpenRegistrationDialog, setIsOpenRegistrationDialog] =
		useState<boolean>(false)
	const [isEdit, setIsEdit] = useState<boolean>(false)
	const [editId, setEditId] = useState<string | null>(null)

	const update = (id: string) => {
		setEditId(id)
		setIsEdit(true)
		setIsOpenAddDialog(true)
	}
	const add = () => {
		setEditId(null)
		setIsOpenAddDialog(true)
		setIsEdit(false)
	}

	const openAuthorize = () => {
		setIsOpenRegistrationDialog(true)
	}

	useEffect(() => {
		dispatch(fetchSerials())
	}, [])

	return (
		<div>
			{isOpenAddDialog && (
				<SerialDialog
					isEdit={isEdit}
					closeDialog={setIsOpenAddDialog}
					editFields={serials.find((serial) => serial._id === editId)}
				/>
			)}
			{isOpenRegistrationDialog && (
				<Registration closeDialog={setIsOpenRegistrationDialog} />
			)}
			<div className='p-8'>
				{isLoading === 'pending' ? (
					<div
						style={{
							width: 'calc( 100vw - 150px)',
							position: 'relative',
							top: '10rem',
							display: 'flex',
							justifyContent: 'center',
						}}
					>
						<div id='loader'>
							<div></div>
							<div></div>
						</div>
					</div>
				) : (
					<>
						<ToolBar add={add} openAuthorize={openAuthorize} />
						<div className='flex justify-center flex-wrap space-x-8 max-h-full overflow-y-auto'>
							{serials &&
								serials.map((serial) => {
									return (
										<SerialCard
											_id={serial._id}
											title={serial.title}
											description={serial.description}
											years={serial.years}
											rating={serial.rating}
											country={serial.country}
											series={serial.series}
											tags={serial.tags}
											image={serial.image}
											update={update}
											userId=''
										/>
									)
								})}
						</div>
					</>
				)}
			</div>
		</div>
	)
}

export default App
