<script lang="ts">
	import type { TimelineEvent } from './TimelineState';
	export let event: TimelineEvent = {
		type: 'visit',
		content: 'undefined',
		date: new Date(0),
		link: '/404',
	};
	export let side: boolean = false;

	const formatTime = (date: Date): string => {
		return date.toLocaleString();
	};
</script>

<main style={side ? 'direction: rtl' : 'direction: ltr'}>
	<div class="date">
		{formatTime(event.date)}
	</div>
	<div class="info">
		<h2>
			{event.type}:
		</h2>
		<div>
			{event.content}
		</div>
		<a href={event.link} target="_blank"
			><img src="/icons/link.svg" alt="link" /></a
		>
	</div>
</main>

<style>
	main {
		display: grid;
		grid-template-columns: 2fr 3fr;
		grid-template-rows: 1fr;
		margin: 10px 0;
		gap: 10px;
	}
	.date {
		display: flex;
		justify-content: end;
		align-items: start;
		font-size: 12px;
		color: #333;
		padding-top: 20px;
		font-weight: 300;
	}
	.info {
		background: white;
		border: solid #ccc 1px;
		box-shadow: #9991 0 5px 30px;
		padding: 10px;
		border-radius: 10px;
		direction: ltr;
		display: grid;
		grid-template-columns: 1fr 20px;
		grid-template-rows: auto 1fr;
	}
	.info h2 {
		margin: 0;
		font-weight: 400;
		font-size: 18px;
	}
	.info a {
		grid-column: 2 / 3;
		grid-row: 1 / 2;
		margin: auto;
	}
	.info img{
		filter: invert(0.1);
	}
	.info div {
		grid-column: 1 / 3;
		font-size: 15px;
	}
</style>
