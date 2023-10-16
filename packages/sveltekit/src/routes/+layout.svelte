<script lang="ts">
  import state from '$lib/stores/state.store';
  import { onMount } from 'svelte';
  import '../app.css';
  import '../markdown.css';
  import { page } from '$app/stores';
  onMount(() => {
    if ($page.url.searchParams.has('admin')) {
      window.localStorage.setItem('admin', 'true');
    }
    $state.admin = window.localStorage.getItem('admin') ? true : false;
    console.log('state admin is ' + window.localStorage.getItem('admin'));
  });
</script>

<svelte:head>
  <!-- In your SvelteKit project, add in the <head> of your layout or html file -->
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap" rel="stylesheet" />
</svelte:head>
<div class="flex flex-col gap-0 w-full bg-slate-50 text-slate-800">
  <slot />
</div>
