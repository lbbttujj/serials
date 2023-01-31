import React from 'react'

import styles from './Button.module.less'

type ButtonProps = {
	children: React.ReactNode
	onClick: (e: React.MouseEvent<HTMLDivElement>) => void
}

export const Button: React.FC<ButtonProps> = ({ children, onClick }) => {
	return (
		<div className={styles.button} onClick={onClick}>
			{children}
		</div>
	)
}
