<script lang="ts">
  import { fly } from "svelte/transition";
</script>

<form
  action="./submit"
  method="get"
  class="log-in-form"
>
  <div id="form-fields">
    <p in:fly={{ x: -400, duration: 500 }}>
      <label for="email">email : </label>
      <input type="email" name="email" id="email" required autocomplete="on"/>
    </p>
    <p in:fly={{ x: 400, duration: 500 }}>
      <label for="password">password : </label>
      <input type="password" name="password" id="password" required autocomplete="on"/>
    </p>
  </div>
  <p>
    <button id="form-button" in:fly={{ y: -400, duration: 500 }}
      >log in</button
    >
  </p>
</form>

<style>
  form {
    display: flex;
    flex-direction: column;
    align-items: center;

    background-color: rgba(137, 43, 226, 0.589);

    border-radius: 16px;

    color: white;

    padding: 16px;

    text-align: right;
  }

  #form-button {
    background-color: white;

    border: none;

    font-size: 1rem;

    color: blueviolet;

    border-radius: 16px;

    padding: 8px;
  }  
</style>
