import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import styles from './App.module.css';

const fieldsSchema = yup.object().shape({
	email: yup
		.string()
		.matches(
			/^[-.@\w_]*$/,
			'Неверный email. Допустимые символы: буквы, цифры, дефис, точка и нижнее подчеркивание.',
		)
		.max(25, 'Неверный email. Должно быть не более 25 символов.')
		.min(7, 'Неверный email. Должно быть не менее 7 символов.'),
	password: yup
		.string()
		.max(35, 'Неверный пароль. Пароль должен содержать не более 35 символов')
		.matches(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^\w\s]).{0,}/,
			'Неверный пароль. Пароль должен содержать строчные и прописные буквы латиницы, цифры и специальные символы.',
		)
		.min(6, 'Пароль должен содержать не менее 6 символов.'),
	passwordRepeat: yup
		.string()
		.oneOf(
			[yup.ref('password')],
			'Повторный пароль не совпадает с введенным паролем',
		),
});

export const App = () => {
	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm({
		mode: 'onBlur',
		defaultValues: {
			email: '',
			password: '',
			passwordRepeat: '',
		},
		resolver: yupResolver(fieldsSchema),
	});

	console.log(errors);

	// const emailProps = {
	// 	minLength: {
	// 		value: 7,
	// 		message: 'Неверный email. Должно быть не менее 7 символов.',
	// 	},
	// 	maxLength: {
	// 		value: 35,
	// 		message: 'Неверный пароль. Пароль должен содержать не более 35 символов',
	// 	},
	// 	pattern: {
	// 		value: /^[-.@\w_]*$/,
	// 		message:
	// 			'Неверный email. Допустимые символы: буквы, цифры, дефис, точка и нижнее подчеркивание.',
	// 	},
	// };

	const emailError = errors.email?.message;

	// const passwordRepeatProps = {
	// 	minLength: { value: 6, message: 'Пароль должен содержать не менее 6 символов.' },
	// 	maxLength: {
	// 		value: 25,
	// 		message: 'Неверный email. Должно быть не более 25 символов.',
	// 	},
	// 	pattern: {
	// 		value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^\w\s]).{0,}/,
	// 		message:
	// 			'Неверный пароль. Пароль должен содержать строчные и прописные буквы латиницы, цифры и специальные символы.',
	// 	},
	// };

	const passwordError = errors.password?.message;

	const passwordRepeatError = errors.passwordRepeat?.message;

	const onSubmit = (formData) => {
		if (formData) {
			console.log(formData);
		}
	};

	console.log(errors);

	return (
		<div className={styles.app}>
			Регистрация
			<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
				{emailError && <div className={styles.error}>{emailError}</div>}
				{passwordError && <div className={styles.error}>{passwordError}</div>}
				{passwordRepeatError && (
					<div className={styles.error}>{passwordRepeatError}</div>
				)}
				<input
					className={styles.input}
					name="email"
					type="email"
					{...register('email')}
					placeholder="Почта"
				/>
				<input
					className={styles.input}
					name="password"
					type="password"
					{...register('password')}
					placeholder="Пароль"
				/>
				<input
					className={styles.input}
					name="password"
					type="password"
					placeholder="Повтор пароля"
					{...register('passwordRepeat')}
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
