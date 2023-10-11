<script lang="ts">
  import { updated } from '$app/stores';
  import type { Attachment } from '$entities/attachment.entity';
  import type { Log } from '$entities/log.entity';
  import type { Run } from '$entities/run.entity';
  import Panel from '$lib/layout/Panel.svelte';
  import AttachmentChat from '$lib/ui/AttachmentChat.svelte';
  import { formatCasualDateTime, formatDuration } from '$lib/utils/formatters/date.formatter';
  import SvelteMarkdown from 'svelte-markdown';

  let classList = '';
  export { classList as class };

  export let logs: Log[];
  export let run: Run;

  let outputs: Attachment[] = [];
  let attachments: Attachment[] = [];

  $: for (const log of logs) {
    if (!log.attachments) {
      continue;
    }
    if (log.type == 'output') {
      outputs.push(...log.attachments);
    } else {
      attachments.push(...log.attachments);
    }
  }
</script>

<Panel
  class="shadow-lg text-slate-800  {classList}"
  header="Result
"
>
  {#if run.status == 'done'}
    <div class="flex flex-col gap-4">
      <div class="markdown-body text-sm leading-relaxed whitespace-pre-wrap">
        <SvelteMarkdown source={logs[logs.length - 1].content} />
      </div>

      {#if outputs.length > 0}
        <div class="flex flex-col">
          <span class=" font-semibold">Outputs</span>
          <ul class="gap-2">
            {#each outputs as attachment}
              <AttachmentChat {attachment} />
            {/each}
          </ul>
        </div>
      {/if}
      {#if attachments.length > 0}
        <div class="flex flex-col">
          <span class=" font-semibold">Supporting Files</span>
          <ul class="gap-2 ml-4 inline-block">
            {#each attachments as attachment}
              <AttachmentChat {attachment} />
            {/each}
          </ul>
        </div>
      {/if}
    </div>
  {:else}
    <div class="text-center border border-dashed border-slate-200 mx-14 py-4">
      <span class="text-sm text-slate-400">
        <i class="fa-regular fa-clock" /> Your results and downloads will be available when the run is completed.</span
      >
    </div>
  {/if}
</Panel>
