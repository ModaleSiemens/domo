<script lang="ts">
  let { options, default_option = 0, on_option_selected} = $props();

  let selected_option = $state(default_option);

  function switchOption(option_index : number) {
    on_option_selected(option_index);

    selected_option = option_index;
  }
</script>

<div class="buttons-wrapper">
  {#each options as option, i}
    <button id={selected_option === i? "selected" : null} type="button" onclick={() => switchOption(i)}>{option}</button>
  {/each}
</div>

<style>
  .buttons-wrapper {
    display: flex;
  }

  button {
    border: 0;

    padding: 8px;

    color: pink;
    background-color: white;
  }

  #selected {
    background-color: blueviolet;
  }
</style>
