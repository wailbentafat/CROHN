<script lang="ts">
	import FullNav from '$lib/FullNav.svelte';
	import { full_nav_state } from '$lib/FullNavState';
	import Nav from '$lib/Nav.svelte';

	import { AuthState } from '$lib/AuthState';
	import AuthPopup from '$lib/AuthPopup.svelte'
</script>

{#if !($AuthState).loggedin}
	<AuthPopup />
{/if}

<FullNav />
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<main id="main"
	on:click={(e) => {
		//@ts-ignore
        if(e.target.id == 'menu') return;
		full_nav_state.set(false);
	}}
>
	<Nav />
	<slot />
</main>

<style>
	#main {
		height: 100%;
		display: grid;
		grid-template-rows: auto 1fr;
	}

	:global(*) {
		--background-0: #ffffff;
		--background-1: #f4f4f4;
		--background-2: #f6f6f6;

		--text-0: #111;
		--text-1: #555;
		--text-2: #777;

		--brand-color: #ca0df0;

		--font-family: 'Roboto', sans-serif;

		--radius-0: 20px;
		--radius-1: 15px;

		font-family: var(--font-family);
		color: var(--text-0);
	}
</style>
