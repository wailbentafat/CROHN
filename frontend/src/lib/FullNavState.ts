import { writable } from "svelte/store";
import type { Writable } from "svelte/store";

export let full_nav_state: Writable<boolean> = writable(false)
