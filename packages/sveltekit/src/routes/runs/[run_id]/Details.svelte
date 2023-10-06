<script lang="ts">
  import { updated } from '$app/stores';
  import Panel from '$lib/layout/Panel.svelte';
  import Status from '$lib/ui/Status.svelte';
  import { formatCasualDateTime, formatDuration } from '$lib/utils/formatters/date.formatter';

  export let workflow: any;
  export let run: any;
  // You may want to import any icons from a library like FontAwesome or Heroicons
</script>

<Panel class="col-span-4 row-span-1">
  <!-- Workflow Name -->
  <div class="flex flex-row gap-2 justify-between items-center">
    <div data-testid="run-details">
      <div class="flex flex-row items-center gap-3">
        <span class="font-medium text-xl"><span class="text-slate-800">{workflow ? workflow.label : ''}</span></span>
        <span class="text-xs bg-slate-200 text-slate-600 px-2 py-0.5 rounded-xl font-semibold">id: {run.id.slice(-4)}</span>
        <Status status={run.status} />
      </div>
      <div class="flex flex-row items-center gap-3 text-sm text-slate-400">
        <div class="flex flex-row gap-1 items-center">
          <i class="fa-solid fa-calendar-days" />
          {formatCasualDateTime(run.created_at)}
        </div>
        <div class="flex flex-row gap-1 items-center">
          <i class="fa-solid fa-clock" />
          {formatDuration(run.created_at, run.updated_at)}
          {#if run.status == 'running'}
            so far
          {/if}
        </div>
      </div>
    </div>
    <div class="flex-row flex gap-2 items-center">
      <button
        type="button"
        class="hover:shadow-md shadow-sm border border-amber-400 flex flex-row gap-2 items-center bg-amber-300 rounded-xl px-5 py-2.5 text-lg text-amber-800 font-semibold"
        ><i class="fa-solid fa-cloud-arrow-down" /> Download Deliverable</button
      >
      <button
        type="button"
        class="hover:shadow-md shadow-sm border border-gray-300 flex flex-row gap-2 items-center bg-slate-300 rounded-xl px-5 py-2.5 text-lg text-slate-800 font-semibold"
        ><i class="fa-solid fa-file-zip" /> Download All</button
      >
    </div>
  </div>
</Panel>
