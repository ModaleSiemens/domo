import { writable } from "svelte/store";
import { browser } from "$app/environment";
import { isActionFailure } from "@sveltejs/kit";

export const user = writable(null);
export const isAuthenticated = writable(false);

export function setUser(user_data : any) {
  user.set(user_data);
  isAuthenticated.set(!!user_data);
}

export function clearUser() {
  user.set(null);
  isAuthenticated.set(false);
}