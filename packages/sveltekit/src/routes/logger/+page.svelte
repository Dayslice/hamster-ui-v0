<script lang="ts">
  import { writable } from 'svelte/store';
  import Logger from './Logger.svelte';

  const store = writable({ count: 0 });
</script>

<div class="flex-col w-full max-w-3xl mx-auto flex items-center gap-4 text-sm">
  <Logger {store} />
</div>
