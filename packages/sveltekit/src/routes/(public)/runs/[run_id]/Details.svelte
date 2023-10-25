<script lang="ts">
  import Panel from '$lib/layout/Panel.svelte';
  import Status from '$lib/ui/Status.svelte';
  import runService from '$lib/utils/api/runService';
  import { formatCasualDateTime, formatDuration } from '$lib/utils/formatters/date.formatter';

  export let workflow: any;
  export let run: any;
  let classList = '';
  export { classList as class };

  let showFullInput: boolean = false;

  const handleCancelRun = async () => {
    run = await runService.cancelOne(run.id);
  };
</script>

<Panel class={classList}>
  <!-- Workflow Name -->
  <div class="flex flex-col gap-1.5">
    <div class="flex flex-row items-center gap-3">
      <span class="font-medium text-xl"><span class="text-slate-800">{workflow ? workflow.label : ''}</span></span>

      <Status status={run.status} />
      {#if run.status == 'running'}
        <button type="button" on:click={handleCancelRun}><i class="fa-solid fa-ban text-red-400 text-sm" /></button>
      {/if}
    </div>
    <div class="flex flex-col gap-1 items-start lg:flex-row lg:items-center lg:gap-4 text-sm text-slate-400">
      <div class="flex flex-row gap-1 items-center">
        <i class="fa-solid fa-calendar-days text-xs" />
        {formatCasualDateTime(run.created_at)}
      </div>
      <div class="flex flex-row gap-1 items-center">
        <i class="fa-solid fa-clock text-xs" />
        {formatDuration(run.created_at, run.updated_at)}
      </div>
      <div class="flex flex-row gap-1 items-center">
        <i class="fa-solid fa-tag text-xs" />
        {run.id.slice(-4)}
      </div>
    </div>

    {#if workflow.task}
      <div class="mt-2 pt-2 border-t border-slate-100 f text-sm text-slate-800">
        <span class="font-semibold text-sm">Task:</span>
        {workflow.task}
      </div>
    {/if}
    {#if run.initial_input}
      <div class="mt-2 pt-2 border-t border-slate-100 f text-sm text-slate-800">
        <span class="font-semibold text-sm">Input: </span>
        {#if run.initial_input.length < 140}
          {run.initial_input}
        {:else}
          {showFullInput ? run.initial_input : `${run.initial_input.substring(0, 140)}...`}
          <br /><button on:click={() => (showFullInput = !showFullInput)} class="underline text-blue-600 text-sm"
            >{showFullInput ? 'hide' : 'show'} full input</button
          >
        {/if}
      </div>
    {/if}
  </div>
</Panel>
