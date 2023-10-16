import { writable } from 'svelte/store';

const state = writable({
  admin: false,
});

export default state;
