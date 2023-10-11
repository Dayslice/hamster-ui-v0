<script lang="ts">
  import { updated } from '$app/stores';
  import type { Agent } from '$entities/agent.entity';
  import type { Attachment } from '$entities/attachment.entity';
  import type { Log } from '$entities/log.entity';
  import type { Run } from '$entities/run.entity';
  import type { Workflow } from '$entities/workflow.entity';
  import Panel from '$lib/layout/Panel.svelte';
  import AttachmentChat from '$lib/ui/AttachmentChat.svelte';
  import AttachmentMini from '$lib/ui/AttachmentMini.svelte';
  import AttachmentResult from '$lib/ui/AttachmentResult.svelte';
  import { formatCasualDateTime, formatDuration } from '$lib/utils/formatters/date.formatter';
  import SvelteMarkdown from 'svelte-markdown';

  let classList = '';
  export { classList as class };

  export let logs: Log[];
  export let run: Run;
  export let workflow: Workflow;
  export let agent: Agent;

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

  function handleRunAgain(e: MouseEvent) {}
</script>

<Panel
  class="shadow-lg text-slate-800  {classList}"
  header="Result
"
>
  <div slot="actions">
    <button type="button" class="bg-slate-700 text-white font-semibold text-xs px-4 py-2 rounded-lg -mt-2" on:click={handleRunAgain}
      ><i class="fa-solid fa-rotate ml-1" /> Run Again
    </button>
  </div>
  {#if run.status == 'done'}
    <div class="flex flex-col gap-4 text-sm">
      <span class="">{agent.name} and the team finished <strong>{workflow.label}</strong> and are excited to share their results!</span>

      {#if outputs.length > 0}
        <div class="flex flex-col">
          <span>They created {outputs.length == 1 ? 'a deliverable' : `${outputs.length} deliverables`} that you can download.</span>
          <ul class="gap-2">
            {#each outputs as attachment}
              <AttachmentResult {attachment} />
            {/each}
          </ul>
        </div>
      {/if}

      {#if attachments.length > 0}
        <span>They used <strong>{attachments.length} external data sources</strong> to help get to the final output.</span>
        <div class="flex flex-col">
          <ul class="gap-2 inline-block">
            {#each attachments as attachment}
              <AttachmentMini {attachment} />
            {/each}
          </ul>
        </div>
      {/if}

      <div class="flex flex-row justisfy-between items-center">
        <span>
          Below is the teams' final message for this workflow. You can <button
            class="hover:underline hover:decoration-dashed font-semibold text-emerald-500">copy it to your clipboard</button
          >
          or you can
          <button class=" text-emerald-500 font-semibold">use it as the input to another workflow</button>.
        </span>
      </div>
      <div class="markdown-body text-sm leading-relaxed whitespace-pre-wrap bg-slate-100 border border-slate-300 px-6 py-4 text-slate-800">
        <SvelteMarkdown source={logs[logs.length - 1].content} />
      </div>
    </div>
  {:else}
    <div class="text-center border border-dashed border-slate-200 mx-14 py-4">
      <span class="text-sm text-slate-400">
        <i class="fa-regular fa-clock" /> Your results and downloads will be available when the run is completed.</span
      >
    </div>
  {/if}
</Panel>
