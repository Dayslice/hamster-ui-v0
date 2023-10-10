<script lang="ts">
  import { updated } from '$app/stores';
  import Panel from '$lib/layout/Panel.svelte';
  import Status from '$lib/ui/Status.svelte';
  import { formatCasualDateTime, formatDuration } from '$lib/utils/formatters/date.formatter';

  export let workflow: any;
  export let run: any;
  // You may want to import any icons from a library like FontAwesome or Heroicons
</script>

<Panel class="col-span-4">
  <!-- Workflow Name -->
  <div class="flex flex-col md:flex-row ustify-start md:justify-between items-center">
    <div data-testid="run-details" class="flex flex-col gap-1.5">
      <div class="flex flex-row items-center gap-3">
        <span class="font-medium text-xl"><span class="text-slate-800">{workflow ? workflow.label : ''}</span></span>

        <Status status={run.status} />
      </div>
      <div class="flex flex-row items-center gap-4 text-sm text-slate-400">
        <div class="flex flex-row gap-1 items-center">
          <i class="fa-solid fa-calendar-days text-xs" />
          {formatCasualDateTime(run.created_at)}
        </div>
        <div class="flex flex-row gap-1 items-center">
          <i class="fa-solid fa-clock text-xs" />
          {formatDuration(run.created_at, run.updated_at)}
          {#if run.status == 'running'}
            so far
          {/if}
        </div>
        <div class="flex flex-row gap-1 items-center">
          <i class="fa-solid fa-tag text-xs" />
          {run.id.slice(-4)}
        </div>
      </div>
    </div>
    <div class="flex-col flex gap-1 items-center text-sm">
      <button
        disabled={run.status != 'done'}
        type="button"
        class="disabled:bg-slate-100 disabled:text-slate-400 disabled:border-slate-400 hover:shadow-md shadow-sm border border-slate-700 flex flex-row gap-2 items-center bg-slate-800 rounded-xl px-5 py-2.5 text-white font-semibold"
        ><i class="fa-solid fa-cloud-arrow-down" /> Download Deliverable</button
      >
      {#if run.status != 'done'}
        <span class="text-xs text-slate-400 italic"><i class="fa-regular fa-info-circle" /> Available after run is finished.</span>{/if}
    </div>
  </div>
</Panel>
