import { clsx } from 'clsx'
import React from 'react'

import { ReactComponent as Cross } from '../../../assets/cross.svg'
import styles from './Modal.module.less'

type ModalProps = {
	children: React.ReactNode
	close: () => void
}

export const Modal: React.FC<ModalProps> = ({ children, close }) => {
	return (
		<div
			onClick={() => {
				close()
			}}
			className={styles.backDrop}
		>
			<div
				onClick={(event) => event.stopPropagation()}
				className={clsx(
					styles.dialogWrapper,
					'p-4  bg-white border-2 border-solid relative rounded-2xl max-h-4/5 overflow-y-auto'
				)}
			>
				<span
					onClick={() => close()}
					className='absolute right-4 top-0 hover:cursor-pointer'
				>
					<Cross />
				</span>
				{children}
			</div>
		</div>
	)
}
