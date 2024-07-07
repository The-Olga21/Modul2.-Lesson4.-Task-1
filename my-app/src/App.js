import { useState, useRef } from 'react';
import styles from './App.module.css';

const sendFormData = (formData) => {
	console.log(formData);
};

export const App = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [passwordRepeat, setPasswordRepeat] = useState('');

	const [emailError, setEmailError] = useState(null);
	const [passwordError, setPasswordError] = useState(null);
	const [passwordRepeatError, setPasswordRepeatError] = useState(null);

	const submitButtonRef = useRef(null);

	const onEmailChange = ({ target }) => {
		setEmail(target.value);

		let newErrorOfEmail = null;

		if (!/^[-.@\w_]*$/.test(target.value)) {
			newErrorOfEmail =
				'Неверный email. Допустимые символы: буквы, цифры, дефис, точка и нижнее подчеркивание';
		} else if (target.value.length > 25) {
			newErrorOfEmail = 'Неверный email. Должно быть не более 25 символов';
		}
		setEmailError(newErrorOfEmail);
	};

	const onEmailBlur = ({ target }) => {
		if (target.value.length < 7) {
			setEmailError('Неверный email. Должно быть не менее 7 символов');
		}
	};

	const onPasswordChange = ({ target }) => {
		setPassword(target.value);

		let newErrorOfPassword = null;

		if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^\w\s]).{0,}/.test(target.value)) {
			newErrorOfPassword =
				'Неверный пароль. Пароль должен содержать строчные и прописные буквы латиницы, цифры и специальные символы';
		}
		setPasswordError(newErrorOfPassword);
	};

	const onPasswordBlur = ({ target }) => {
		setPassword(target.value);

		let newErrorOfPassword = null;

		if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^\w\s]).{0,}/.test(target.value)) {
			newErrorOfPassword =
				'Неверный пароль. Пароль должен содержать строчные и прописные буквы латиницы, цифры и специальные символы';
		} else if (target.value.length < 6) {
			setPasswordError('Пароль должен содержать не менее 6 символов');
		}
		setPasswordError(newErrorOfPassword);
	};

	const onCorrectOfPasswordRepeat = ({ target }) => {
		setPasswordRepeat(target.value);

		let newErrorOfPasswordRepeat = null;

		if (target.value !== password) {
			newErrorOfPasswordRepeat =
				'Повторный пароль не совпадает с введенным паролем';
		}

		setPasswordRepeatError(newErrorOfPasswordRepeat);
	};

	const onSubmit = (event) => {
		event.preventDefault();
		if ((email, password, passwordRepeat)) {
			sendFormData({ email, password, passwordRepeat });
		}
	};

	return (
		<div className={styles.app}>
			Регистрация
			<form className={styles.form} onSubmit={onSubmit}>
				{emailError && <div className={styles.error}>{emailError}</div>}
				{passwordError && <div className={styles.error}>{passwordError}</div>}
				{passwordRepeatError && (
					<div className={styles.error}>{passwordRepeatError}</div>
				)}
				<input
					className={styles.input}
					name="email"
					type="email"
					placeholder="Почта"
					value={email}
					onChange={onEmailChange}
					onBlur={onEmailBlur}
				/>
				<input
					className={styles.input}
					name="password"
					type="password"
					placeholder="Пароль"
					value={password}
					onChange={onPasswordChange}
					onBlur={onPasswordBlur}
				/>
				<input
					className={styles.input}
					name="password"
					type="password"
					placeholder="Повтор пароля"
					value={passwordRepeat}
					onChange={onCorrectOfPasswordRepeat}
				/>
				<button
					className={styles.button}
					type="submit"
					disabled={!!emailError || !!passwordError || !!passwordRepeatError}
				>
					Зарегистрироваться
				</button>
			</form>
			<p className={styles.infotitle}>* Информация:</p>
			<p className={styles.info}>
				- Длина email должна составлять от 7-ми до 25-ти (включительно) символов.
				Email должен состоять из следующих символов на выбор: латинские буквы,
				цифры, дефис, точка, нижнее подчеркивание.{' '}
			</p>
			<p className={styles.info}>
				- Пароль должен содержать строчные и прописные буквы латиницы, цифры и
				специальные символы. Длина пароля должна быть не менее 6-ти и не более
				35-ти символов.
			</p>
		</div>
	);
};
