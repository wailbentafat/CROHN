<script>
	import { AuthState } from '$lib/AuthState';
</script>

<main>
    <h2>profile:</h2>
	<div class="profile">
		<img src="/icons/user.svg" alt="Profile" />
		<h1>{$AuthState.last_name} {$AuthState.first_name}</h1>
		<p>Age: {$AuthState.age} {$AuthState.gender}</p>
	</div>
    <h2>settings:</h2>
</main>

<style>
	.profile {
		margin: 50px 0;
		text-align: center;
	}

	img {
		width: 150px;
		height: 150px;
		border-radius: 50%;
		margin-bottom: 10px;
	}

	p {
		font-size: 18px;
	}

	h2 {
        padding: 10px;
	}
</style>
