//@ts-nocheck
import clsx from 'clsx'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { loginUser, registerUser } from '../../store/usersSlice'
import { Button } from '../uiKit'
import { Modal } from '../uiKit'
import styles from './Registration.module.less'

type RegistrationProps = {
	closeDialog: React.Dispatch<React.SetStateAction<boolean>>
}

export const Registration: React.FC<RegistrationProps> = ({ closeDialog }) => {
	const dispatch = useDispatch()
	const [username, setUsername] = useState<string>('')
	const [password, setPassword] = useState<string>('')

	const registrate = () => {
		// dispatch(registerUser({ username: username, password: password }))
		dispatch(loginUser({ username: username, password: password }))
	}

	return (
		<Modal close={closeDialog}>
			<div className={styles.authorizeDialog}>
				<div className={styles.authorizeDialogInputs}>
					<label htmlFor='loginInput'>Логин</label>
					<input
						onChange={(e) => setUsername(e.target.value)}
						id='loginInput'
					/>
					<label htmlFor='passwordInput'>Пароль</label>
					<input
						onChange={(e) => setPassword(e.target.value)}
						id='passwordInput'
					/>
				</div>

				<Button
					onClick={() => {
						closeDialog()
						registrate()
					}}
				>
					Войти
				</Button>
			</div>
		</Modal>
	)
}
