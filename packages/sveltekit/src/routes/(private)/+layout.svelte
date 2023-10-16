<script>
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import Content from '$lib/layout/Content.svelte';
  import LeftNav from '$lib/layout/LeftNav.svelte';
  import Panel from '$lib/layout/Panel.svelte';

  import state from '$lib/stores/state.store';
  import { onMount } from 'svelte';

  onMount(() => {
    $state.admin = window.localStorage.getItem('admin') ? true : false;
  });
</script>

{#if $state.admin}
  <LeftNav />
  <Content>
    <slot />
  </Content>
{:else}
  <div class="flex flex-col items-center justify-center h-screen bg-gray-100">
    <div class="text-4xl font-semibold mb-4 text-gray-700">501 - Unauthorized</div>
    <Panel class="text-2xl font-medium text-white !bg-red-500 p-6 rounded-lg shadow-lg">Unauthorized Access</Panel>
  </div>
{/if}
