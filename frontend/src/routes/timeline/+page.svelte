<script lang="ts">
	import Event from '$lib/Event.svelte';
	import { TimelineState, upload_file } from '$lib/TimelineState';

	let fileInput: any;

	function uploadFile() {
		fileInput.click();
	}
</script>

<div>
	<div id="header">
		<h2>medical records</h2>
		<button on:click={uploadFile}>upload file</button>
		<input
			type="file"
			bind:this={fileInput}
			style="display: none;"
			on:change={(e) => {
				//@ts-ignore
				upload_file(e.target.files[0])
			}}
		/>
	</div>
	<div id="container">
		{#each $TimelineState as event, index}
			<Event {event} side={index % 2 == 0} />
		{/each}
	</div>
</div>

<style>
	#container {
		height: calc(100vh - 100px);
		overflow-y: auto;
		padding: 0 10px;
		scrollbar-width: thin;
	}
	#header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	h2 {
		margin: 10px 0 0 10px;
		font-weight: 400;
		text-decoration: underline;
	}
	button {
		height: fit-content;
		font-size: 16px;
		padding: 6px 16px;
		margin-top: 10px;
		margin-right: 15px;
		border: none;
		background-color: #ebabff;
		border-radius: 15px 15px 5px 15px;
		box-shadow: #0001 0 0 15px;
		user-select: none;
		cursor: pointer;
	}
</style>
