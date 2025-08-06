<script lang="ts">
	import Dropzone from 'svelte-file-dropzone';
	import { VList } from 'virtua/svelte';

	interface DroppedFile {
		path?: string;
	}

	let files: {
		accepted: File[];
		rejected: File[];
	} = $state({
		accepted: [],
		rejected: []
	});

	let data: (string | undefined)[] = $derived(Array.from(files.accepted, (file) => file.name));

	function removeFileFromList(name: string | undefined) {
		files.accepted = files.accepted.filter((file) => file.name !== name);
	}

	function handleFilesSelected(e: any) {
		const { acceptedFiles, fileRejections } = e.detail;

		console.log(JSON.stringify(e.detail));

		files.accepted = [...files.accepted, ...acceptedFiles];
		files.rejected = [...files.rejected, ...fileRejections];
	}

	async function  uploadFiles(e: any) {
		const formData = new FormData();

		files.accepted.forEach((file) => {
      formData.append('files', file);
    });

    const res = await fetch('http://localhost:8000/api/content', {
      method: 'POST',
      body: formData
    });
	}
</script>

<div id="file-selector">
	<Dropzone
		containerClasses="dropzone"
		on:drop={handleFilesSelected}
		accept="application/pdf, text/plain, image/*"
	>
		trascina qui gli allegati
	</Dropzone>
	<div id="file-list" style="display: {files.accepted.length ? 'block' : 'none'}">
		<VList {data} style="height: 16vh;" getKey={(_, i) => i}>
			{#snippet children(item, index)}
				<div class="item-controls">
					<div class="item">
						{item}
					</div>
					<input
						type="button"
						value="rimuovi"
						class="remove-button"
						onclick={() => removeFileFromList(data[index])}
					/>
				</div>
			{/snippet}
		</VList>
	</div>
	<input
		type="button"
		value="carica allegati"
		id="send-button"
		style="display: {files.accepted.length ? 'block' : 'none'}"
		onclick={uploadFiles}
	/>
</div>

<style>
	:global(.dropzone) {
		background-color: white !important;
		color: blueviolet !important;

		border: none !important;

		display: flex;

		justify-content: center;

		text-align: center;

		font-size: 2rem;
	}

	#send-button {
		width: 16vw;

		border: none;

		background-color: white;

		color: blueviolet;

		font-size: 2rem;
	}

	#file-selector {
		display: flex;
		flex-direction: row;

		flex-grow: 1;
	}

	#file-list {
		width: 50vw;
	}

	#file-list :global(.virtual-list-inner) {
		display: flex;

		justify-content: space-around;
	}

	.item-controls {
		display: flex;

		flex-direction: row;

		justify-content: space-between;

		background-color: blueviolet;

		color: white;

		align-items: center;
	}

	.remove-button {
		min-width: 16vw;
		height: 64px;

		background-color: white;
		color: blueviolet;

		border: solid blueviolet 8px;

		font-size: 1.5rem;
	}

	.item {
		font-size: 1.5rem;

		padding-left: 16px;
	}
</style>
