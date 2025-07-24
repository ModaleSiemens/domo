<script lang="ts">
  import { fly } from "svelte/transition";
</script>

<div id="form-wrapper">
  <div id="login-text" transition:fly={{x: 400, duration: 1000}}>
    <h2>inserisci le tue credenziali per accedere</h2>
  </div>
  <form action="./submit" method="get" class="sign-in-form" transition:fly={{y: -400, duration: 1000}}>
    <div id="form-fields">
      <p transition:fly={{x: -400, duration: 1000}}>
          <label for="email">email : </label>
        <input type="text" name="email" id="email" required />
      </p>
      <p transition:fly={{x: 400, duration: 1000}}>
        <label for="password">password : </label>
        <input type="password" name="password" id="password" required />
      </p>
    </div>
    <p>
      <button id="form-button" transition:fly={{y: -400, duration: 1000}}>log in</button>
    </p>
  </form>
</div>

<style>
  :global(body) {
    margin: 0;

    background-image: url("/flowery-meadow-and-sky-background.webp");

    background-color: black;

    background-repeat: no-repeat;
    background-size: cover;
  }

  #form-fields {
    text-align: right;
  }

  #form-wrapper {
    height: 100vh;

    display: flex;

    flex-direction: column;

    justify-content: center;
    align-items: center;

    font-size: 2rem;
  }

  #login-text {
    color: blueviolet;
    text-align: center;

    background: white;

    padding: 8px;

    border-radius: 32px;

    padding: 16px;
  }

  #form-button {
    background-color: white;

    border: none;

    font-size: 2rem;

    color: blueviolet;

    border-radius: 16px;

    padding: 16px;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;

    background-color: blueviolet;

    border-radius: 16px;

    color: white;

    flex: 0 0 auto;

    width: 40rem;
  }
</style>
