<script>
  import { page } from '$app/stores';
  import Content from '$lib/layout/Content.svelte';
  import LeftNav from '$lib/layout/LeftNav.svelte';

  import state from '$lib/stores/state.store';
</script>

<svelte:head>
  <!-- In your SvelteKit project, add in the <head> of your layout or html file -->
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap" rel="stylesheet" />
</svelte:head>
{#if $state.admin}
  <LeftNav />
{/if}
<Content>
  <slot />
</Content>
