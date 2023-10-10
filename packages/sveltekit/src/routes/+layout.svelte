<script>
  import Content from '$lib/layout/Content.svelte';
  import LeftNav from '$lib/layout/LeftNav.svelte';
  import '../app.css';
  import '../markdown.css';
</script>

<svelte:head>
  <!-- In your SvelteKit project, add in the <head> of your layout or html file -->
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap" rel="stylesheet" />
</svelte:head>
<div class="flex flex-col gap-0 w-full">
  <LeftNav />
  <Content>
    <slot />
  </Content>
</div>
