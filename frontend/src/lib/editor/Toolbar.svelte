<script lang="ts">
  import FileSelector from "./FileSelector.svelte";
</script>

<div id="toolbar">
  <FileSelector />
</div>

<style>
  #toolbar {
    background-color: blueviolet;

    width: 100vw;
    height: 16vh;

    display: flex;

    justify-content: center;
  }
</style>
