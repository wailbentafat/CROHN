<script lang="ts">
	import { slide } from 'svelte/transition';
	import { full_nav_state } from './FullNavState';
	import { goto } from '$app/navigation';
	import { logout } from './AuthState';
	const open = (link: string) => {
		full_nav_state.set(false);
		goto(link);
	};
</script>

{#if $full_nav_state}
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<nav
		transition:slide={{
			axis: 'x',
		}}
	>
		<span class='link' on:click={() => open('/')} id="logo">
			<img src="/favicon.png" alt="" />
			Corhn<span>J</span>
		</span>
		<span class='link' on:click={() => open('/')}>Assistant</span>
		<span class='link' on:click={() => open('/timeline')}>Timeline</span>
		<span class='link' on:click={() => open('/profile')}>Profile</span>
		<div id="bottom">
			<div id="logout" on:click={logout}>logout</div>
			<div id="version">ver: alpha</div>
		</div>
	</nav>
{/if}

<style>
	nav {
		position: absolute;
		top: 0;
		left: 0;
		background-color: var(--background-0);
		width: 80vw;
		height: 100vh;
		box-shadow: #00000030 10px 0 1000px 100px;
		padding: 20px;
		z-index: 1;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
	}
	#logo {
		display: flex;
		align-items: center;
		gap: 10px;
		font-size: 35px;
		font-weight: 600;
		color: #313131;
		padding-bottom: 20px;
		border-bottom: solid 2px #999;
		font-family: 'Sen', sans-serif;
		font-weight: 00;
	}
	#logo img {
		height: 60px;
		width: 60px;
		transform: translateY(-3px);
	}
	#logo span{
		color: #EBABFF;
		transform: translate(-10px, 5px);
		font-weight: 600;
	}
	.link {
		display: block;
		border-bottom: solid 2px #999;
		padding: 15px 5px;
		color: var(--text-0);
		text-decoration: none;
		user-select: none;
		cursor: pointer;
		transition: background-color 300ms ease-in-out;
	}
	.link:hover{
		background-color: #f5f5f5;
	}
	#bottom {
		margin-top: auto;
		display: flex;
		gap: 8px;
	}
	#bottom div {
		font-size: 14px;
		padding: 5px 8px;
		border-radius: 12px;
		user-select: none;
		cursor: pointer;
	}
	#logout {
		background-color: rgb(250, 93, 73);
		color: white;
	}
	#version {
		background-color: #dbdbdb;
		color: white;
	}
</style>
