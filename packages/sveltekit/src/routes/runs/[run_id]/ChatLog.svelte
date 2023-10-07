<script lang="ts">
  import type { Log } from '$entities/log.entity';
  import Panel from '$lib/layout/Panel.svelte';
  import { formatCasualDateTime } from '$lib/utils/formatters/date.formatter';
  import { extractFilename } from '$lib/utils/tools';
  import SvelteMarkdown from 'svelte-markdown';

  // Placeholder data for chat logs.
  export let logs: Log[] = [];
</script>

<Panel header="Chat History" class="col-span-2 row-span-4" contentClass=" !pb-0 !mb-0">
  <div class=" overflow-y-auto">
    {#each logs as log}
      <div class="flex items-start mb-4 space-x-4">
        <img src={log.source_agent?.avatar_url || ''} alt={log.source_agent?.name || ''} class="w-10 h-10 rounded-full" />
        <div class="text-sm">
          <div class="text-gray-500 mb-1">
            {log.source_agent?.name || 'System'} • <span class="text-slate-400 text-xs">{formatCasualDateTime(log.created_at)}</span>
          </div>
          <div class="bg-gray-100 p-2 rounded-lg text-sm leading-relaxed whitespace-pre-wrap markdown-body">
            <SvelteMarkdown source={log.content} />
          </div>
          {#each log.attachments as attachment}
            <a
              href="file:/{attachment.url}"
              target="_blank"
              class="mt-4 mb-2 p-2 text-sm rounded-md shadow bg-slate-50 border border-slate-300 hover:shadow-md hover:bg-gray-50 transition-all duration-200 flex items-center space-x-2"
            >
              <i class="text-xs text-slate-700 fa-regular fa-paperclip" />
              <span class="font-medium text-slate-700 hover:underline"
                >{attachment.label} <span class="text-slate-400 text-sm">{extractFilename(attachment.url)}</span></span
              >
            </a>
          {/each}
        </div>
      </div>
    {/each}
  </div>
</Panel>
