<script lang="ts">
  import Panel from '$lib/layout/Panel.svelte';
  import Status from '$lib/ui/Status.svelte';
  import { formatCasualDateTime, formatDuration } from '$lib/utils/formatters/date.formatter';

  export let workflow: any;
  export let run: any;
  let classList = '';
  export { classList as class };
</script>

<Panel class={classList}>
  <!-- Workflow Name -->
  <div class="flex flex-col gap-1.5">
    <div class="flex flex-row items-center gap-3">
      <span class="font-medium text-xl"><span class="text-slate-800">{workflow ? workflow.label : ''}</span></span>

      <Status status={run.status} />
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

    <div class="mt-2 pt-2 border-t border-slate-100 f text-sm text-slate-800">{workflow.task}</div>
  </div>
</Panel>
