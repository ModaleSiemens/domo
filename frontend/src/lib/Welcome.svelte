<script lang="ts">
  import SwitchableButtons from "./SwitchableButtons.svelte";

  import LogInForm from "./LogInForm.svelte";
  import SignUpForm from "./SignUpForm.svelte";

  function onOptionSelected(option_index: number) {
    if (option_index === 0) {
      Form = SignUpForm;
    } else {
      Form = LogInForm;
    }
  }

  let Form: typeof SignUpForm = $state(SignUpForm);
</script>

<div class="spacer"></div>
<SwitchableButtons
  options={["sign up", "log in"]}
  on_option_selected={onOptionSelected}
/>
<Form />

<style>
  :global(body) {
    margin: 0;

    background-image: url("/flowery-meadow-and-sky-background.webp");

    background-repeat: no-repeat;
    background-size: cover;

    height: 100vh;

    display: flex;

    justify-content:start;
    align-items: center;

    flex-direction: column;
  }

  .spacer {
    height: 25vh;
  }
</style>
