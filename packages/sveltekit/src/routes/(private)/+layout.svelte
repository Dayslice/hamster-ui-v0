<script>
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import Content from '$lib/layout/Content.svelte';
  import LeftNav from '$lib/layout/LeftNav.svelte';

  import state from '$lib/stores/state.store';
  import { onMount } from 'svelte';

  onMount(() => {
    $state.admin = window.localStorage.getItem('admin') ? true : false;
    if ($state.admin == false || $page.url.searchParams.has('admin')) {
      goto('/501');
    }
  });
</script>

{#if $state.admin}
  <LeftNav />
  <Content>
    <slot />
  </Content>
{/if}
