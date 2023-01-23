// @ts-nocheck
import React, { useState, useEffect } from 'react'
import { SerialCard } from './components/SerialCard'
import { useAppDispatch, useAppSelector } from './hooks'
import { fetchSerials } from './store/serialsSlice'
import { AddSerialDialog } from './components/AddSerialDialog'
import { ToolBar } from './components/ToolBar'

function App() {
	const serials = useAppSelector((state) => state.serials.visibleSerial)
	const isLoading = useAppSelector((state) => state.serials.status)

	const dispatch = useAppDispatch()

	const [isOpenAddDialog, setIsOpenAddDialog] = useState<boolean>(false)

	useEffect(() => {
		dispatch(fetchSerials())
	}, [])

	return (
		<div>
			{isOpenAddDialog && <AddSerialDialog closeDialog={setIsOpenAddDialog} />}
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
						<ToolBar setIsOpenAddDialog={setIsOpenAddDialog} />
						<div className='flex justify-center flex-wrap space-x-8 max-h-full overflow-y-hidden'>
							{serials &&
								serials.map((serial) => {
									return (
										<SerialCard
											id={serial._id}
											title={serial.title}
											description={serial.description}
											years={serial.years}
											isFinished={serial.isFinished}
											rating={serial.rating}
											country={serial.country}
											series={serial.series}
											tags={serial.tags}
											image={serial.image}
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
