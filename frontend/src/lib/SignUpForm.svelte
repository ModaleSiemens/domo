<script lang="ts">
  import { fly } from "svelte/transition";

  type RegisterInput = {
    username: string;
    email: string;
    password: string;
  };

  type RegisterResponse = {
    id: string;
    username: string;
    email: string;
  };

  async function register(e: Event) {
    const form = e.target as HTMLFormElement;

    const form_data = new FormData(form);

    const username = form_data.get("username")?.toString() ?? "";
    const email = form_data.get("email")?.toString() ?? "";
    const password = form_data.get("password")?.toString() ?? "";
    let message = "";

    const payload: RegisterInput = { username, email, password };

    console.log(email);

    try {
      const response = await fetch("http://localhost:8000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        message = error.message || "errore durante la registrazione";
        return;
      }

      const data: RegisterResponse = await response.json();
      message = `benvenuto, ${data.username}! registrazione effettuata`;
    } catch (e) {
      console.error(e);
      message = "qualcosa è andato storto0;";
    }
  }
</script>

<form on:submit|preventDefault={register} class="sign-up-form">
  <div id="form-fields">
    <p in:fly={{ x: 400, duration: 500 }}>
      <label for="username">username : </label>
      <input
        type="text"
        name="username"
        id="username"
        required
        autocomplete="on"
      />
    </p>
    <p in:fly={{ x: -400, duration: 500 }}>
      <label for="email">email : </label>
      <input type="email" name="email" id="email" required autocomplete="on" />
    </p>
    <p in:fly={{ x: 400, duration: 500 }}>
      <label for="password">password : </label>
      <input
        type="password"
        name="password"
        id="password"
        required
        autocomplete="on"
      />
    </p>
  </div>
  <p>
    <button id="form-button" in:fly={{ y: -400, duration: 500 }}>sign up</button
    >
  </p>
</form>

<style>
  form {
    display: flex;
    flex-direction: column;
    align-items: center;

    background-color: rgba(137, 43, 226, 0.6);

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
