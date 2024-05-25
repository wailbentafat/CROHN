<script>
	import { full_nav_state } from './FullNavState';
</script>

<nav>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
	<img
		id="menu"
		on:click={() => {
			full_nav_state.set(true);
		}}
		src="/icons/menu.svg"
		alt="menu"
	/>
	<a href="/profile" id="user">
		<img src="/icons/user.svg" alt="user" />
	</a>
</nav>

<style>
	nav {
		display: flex;
		justify-content: space-between;
		padding: 10px 13px;
		background-color: #f8f8f8;
	}
	img {
		height: 30px;
		filter: invert(0.3);
	}
	#user{
		border-radius: 100%;
	}
</style>
