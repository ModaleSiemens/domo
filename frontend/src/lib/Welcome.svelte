<script lang="ts">
  import SwitchableButtons from "./SwitchableButtons.svelte";

  import LogInForm from "./LogInForm.svelte";
  import SignUpForm from "./SignUpForm.svelte";
  import type { SvelteComponent } from "svelte";

  function onOptionSelected(option_index: number) {
    if(option_index === 0)
    {
      form = SignUpForm;
    }
    else 
    {
      form = LogInForm;
    }
  }


  let form : typeof SignUpForm;

  form = LogInForm;
</script>

<SwitchableButtons
  options={["sign up", "log in"]}
  on_option_selected={onOptionSelected}
/>
<svelte:component this={form} />

<style>
  :global(body) {
    margin: 0;

    background-image: url("/flowery-meadow-and-sky-background.webp");

    background-repeat: no-repeat;
    background-size: cover;

    height: 100vh;

    display: flex;

    justify-content: center;
    align-items: center;
  }
</style>
