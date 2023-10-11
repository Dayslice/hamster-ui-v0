<script lang="ts">
  import type { Log } from '$entities/log.entity';
  import Panel from '$lib/layout/Panel.svelte';
  import AttachmentChat from '$lib/ui/AttachmentChat.svelte';
  import { formatCasualDateTime } from '$lib/utils/formatters/date.formatter';
  import SvelteMarkdown from 'svelte-markdown';

  let classList = '';
  export { classList as class };

  // Placeholder data for chat logs.
  export let logs: Log[] = [];
</script>

<Panel class={classList} header="Work History" contentClass=" !pb-0 !mb-0">
  <div class=" overflow-y-auto max-h-120 -mx-6 px-6 -my-6 py-6">
    {#each logs as log}
      <div class="flex items-start mb-4 space-x-4">
        <img src={log.source_agent?.avatar_url || ''} alt={log.source_agent?.name || ''} class="w-10 h-10 rounded-full" />
        <div class="text-sm">
          <div class="text-gray-500 mb-1">
            {log.source_agent?.name || 'System'} •
            <span class="text-slate-400 text-xs"
              >{formatCasualDateTime(log.created_at)}
              {#if log.step}
                • <span class="text-slate-400 text-xs">{log.step.label}</span>
              {/if}
            </span>
          </div>
          <div class="bg-gray-100 p-2 rounded-lg text-sm leading-relaxed whitespace-pre-wrap markdown-body">
            <SvelteMarkdown source={log.content} />
          </div>
          {#each log.attachments as attachment}
            <AttachmentChat {attachment} />{/each}
        </div>
      </div>
    {/each}
  </div>
</Panel>
