import { writable } from 'svelte/store';
import axios from 'axios';
import { getCookie, setCookie } from './Cookies';
import { goto } from '$app/navigation';
import { full_nav_state } from './FullNavState';
import { onMount } from 'svelte';

export const AuthState = writable({
	loggedin: false,
	token: '',
	first_name: '',
	last_name: '',
	email: '',
	gender: '',
	age: 0,
});

export const signup = async (body: any) => {
	axios
		.post('https://b449-105-99-114-244.ngrok-free.app/auth/register', {
			...body,
		})
		.then((res) => {
			login(body);
		})
		.catch((res) => {
			console.error(res);
			alert('failed to login');
		});
};

export const login = async (body: any) => {
	axios
		.post('https://b449-105-99-114-244.ngrok-free.app/auth/login', {
			...body,
		})
		.then((res) => {
			console.log(res);
			if (res.status == 200) {
				AuthState.set({
					loggedin: true,
					token: res.data.access_token,
					first_name: res.data.user.first_name,
					last_name: res.data.user.last_name,
					email: res.data.user.email,
					gender: res.data.user.gender,
					age: res.data.user.age,
				});
				setCookie('token', res.data.access_token, 1);
			} else {
				alert('failed to login');
			}
		})
		.catch((res) => {
			console.error(res);
			alert('failed to login');
		});
};

export const logout = () => {
	goto('/');
	full_nav_state.set(false);
	AuthState.set({
		loggedin: false,
		token: '',
		first_name: '',
		last_name: '',
		email: '',
		gender: '',
		age: 0,
	});
	setCookie('token', '', 1);
};

const login_from_cookie = async () => {
	let token = getCookie('token');
	console.log(token);
	if (!token) return;
	fetch('https://b449-105-99-114-244.ngrok-free.app/auth/token-info', {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
	}).then((res) => {console.log(res);res.json().then(console.log)});
};

// onMount(login_from_cookie)
