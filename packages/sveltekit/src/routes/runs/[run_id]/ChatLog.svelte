<script lang="ts">
  import Panel from '$lib/layout/Panel.svelte';
  import { formatCasualDateTime } from '$lib/utils/formatters/date.formatter';

  // Placeholder data for chat logs.
  export let logs: any[] = [];
</script>

<Panel header="Chat History" class="col-span-2 row-span-2" contentClass=" !pb-0 !mb-0">
  <div class=" overflow-y-auto">
    {#each logs as log}
      <div class="flex items-start mb-4 space-x-4">
        <img src={log.source_agent?.avatar_url || ''} alt={log.source_agent?.name || ''} class="w-10 h-10 rounded-full" />
        <div class="text-sm">
          <div class="text-gray-500 mb-1">
            {log.source_agent?.name || 'System'} • <span class="text-slate-400 text-xs">{formatCasualDateTime(log.created_at)}</span>
          </div>
          <div class="bg-gray-100 p-2 rounded-lg">{log.content}</div>
        </div>
      </div>
    {/each}
  </div>
</Panel>
