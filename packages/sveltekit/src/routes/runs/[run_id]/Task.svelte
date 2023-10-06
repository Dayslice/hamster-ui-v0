<script lang="ts">
  import { updated } from '$app/stores';
  import Panel from '$lib/layout/Panel.svelte';
  import { formatCasualDateTime, formatDuration } from '$lib/utils/formatters/date.formatter';

  export let workflow: any;
  export let run: any;
  // You may want to import any icons from a library like FontAwesome or Heroicons
</script>

<Panel class="col-span-2 row-span-1">
  <!-- Workflow Name -->
  <div class="flex flex-row gap-2 items-start gap-6 text-sm">
    <span class="font-semibold text-sm pt-0.5">Task: </span>
    {workflow.task}
  </div>
</Panel>
