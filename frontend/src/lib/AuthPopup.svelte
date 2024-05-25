<script lang="ts">
	let state: 'signup' | 'login' = 'login';
	let first_name: string = '';
	let second_name: string = '';
	let age: number = 0;
	let sex: string = 'male';
	let email: string = '';
	let password: string = '';

	import { AuthState, login, signup } from '$lib/AuthState';
	import { fade } from 'svelte/transition';
</script>

<main class="auth-popup" transition:fade={{ duration: 300 }}>
	{#if state == 'login'}
		<div id="container" class="form-container">
			<div class="form-wrapper">
				<h2>Login</h2>
				<form on:submit={() => login({ email, password })}>
					<div class="form-group">
						<label for="email">Email:</label>
						<input
							type="email"
							id="email"
							name="email"
							required
							class="form-input"
							bind:value={email}
						/>
					</div>
					<div class="form-group">
						<label for="password">Password:</label>
						<input
							type="password"
							id="password"
							name="password"
							required
							class="form-input"
							bind:value={password}
						/>
					</div>
					<button type="submit" class="form-button">Login</button>
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<!-- svelte-ignore a11y-no-static-element-interactions -->
					<span
						on:click={() => {
							AuthState.set({
								loggedin: true,
								token: '',
								first_name: 'jhon',
								last_name: 'Doe',
								gender: 'male',
								email: 'JhonDoe@gmail.com',
								age: 34,
							});
							alert('this is a debugging option it logs you in as a default person')
						}}
						style="
						text-decoration: underline;
						font-size: 16px;
						opacity: 0.2;
						margin: 0 10px;
					">bypass</span
					>
				</form>
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<p class="form-text">
					Don't have an account? <span
						on:click={() => (state = 'signup')}>Signup</span
					>
				</p>
			</div>
		</div>
	{:else}
		<div id="container" class="form-container">
			<div class="form-wrapper">
				<h2>Signup</h2>
				<form
					on:submit={() =>
						signup({
							first_name,
							second_name,
							age,
							sex,
							email,
							password,
						})}
				>
					<div class="form-group">
						<label for="firstName">First Name:</label>
						<input
							type="text"
							id="firstName"
							name="firstName"
							required
							class="form-input"
							bind:value={first_name}
						/>
					</div>
					<div class="form-group">
						<label for="lastName">Last Name:</label>
						<input
							type="text"
							id="lastName"
							name="lastName"
							required
							class="form-input"
							bind:value={second_name}
						/>
					</div>
					<div class="form-group">
						<label for="age">Age:</label>
						<input
							type="number"
							id="age"
							name="age"
							required
							class="form-input"
							bind:value={age}
						/>
					</div>
					<div class="formgroup">
						<label for="sex">sex:</label>
						<div class="checkbox-group">
							<label for="sex-male">
								<input
									type="checkbox"
									id="sex-male"
									name="sex"
									on:change={() => {
										if (sex === 'male') {
											sex = 'female';
										} else if (sex === 'female') {
											sex = 'male';
										}
									}}
									bind:value={sex}
									class="form-input"
									checked={sex === 'male'}
								/>
								Male
							</label>
							<label for="sex-female">
								<input
									type="checkbox"
									id="sex-female"
									name="sex"
									on:change={() => {
										if (sex === 'male') {
											sex = 'female';
										} else if (sex === 'female') {
											sex = 'male';
										}
									}}
									bind:value={sex}
									class="form-input"
									checked={sex === 'female'}
								/>
								Female
							</label>
						</div>
					</div>
					<div class="form-group">
						<label for="email">Email:</label>
						<input
							type="email"
							id="email"
							name="email"
							required
							class="form-input"
							bind:value={email}
						/>
					</div>
					<div class="form-group">
						<label for="password">Password:</label>
						<input
							type="password"
							id="password"
							name="password"
							required
							class="form-input"
							bind:value={password}
						/>
					</div>
					<button type="submit" class="form-button">Signup</button>
				</form>
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<p class="form-text">
					Already have an account? <span
						on:click={() => (state = 'login')}>Login</span
					>
				</p>
			</div>
		</div>
	{/if}
</main>

<style>
	main {
		position: absolute;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		z-index: 2;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	#container {
		background-color: var(--background-0);
		padding: 20px;
		border-radius: var(--radius-0);
		box-shadow: #61616133 0 30px 500px;
	}
	.form-container {
		margin-bottom: 20px;
	}
	.form-wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.form-wrapper h2 {
		margin-bottom: 10px;
	}
	.form-group {
		margin-bottom: 10px;
	}
	.form-group label {
		display: block;
		margin-bottom: 5px;
	}
	.form-group input {
		margin-bottom: 10px;
		padding: 5px;
		border-radius: 5px;
		border: 1px solid #ccc;
	}
	.form-button {
		padding: 7px 15px;
		border-radius: 5px;
		background-color: #fa6bfa;
		color: #fff;
		border: none;
		cursor: pointer;
		font-family: 'Roboto', sans-serif;
		font-size: 18px;
	}
	.form-text span {
		cursor: pointer;
		color: #fa6bfa;
	}
	.checkbox-group {
		display: flex;
		flex-direction: row;
		margin: 5px 0;
		gap: 15px;
	}
	.checkbox-group label {
		margin-bottom: 5px;
	}
</style>
