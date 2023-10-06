<script lang="ts">
  import Details from './Details.svelte';
  import { page } from '$app/stores';
  import { onMount, onDestroy } from 'svelte';
  import { fetchLogs, fetchRun, fetchSteps, fetchWorkflow } from '$lib/utils/fetchLogs';
  import Agents from './Agents.svelte';
  import StepsOverview from './StepsOverview.svelte';
  import ChatLog from './ChatLog.svelte';
  import LeftNav from '$lib/layout/LeftNav.svelte';
  import Content from '$lib/layout/Content.svelte';
  import Task from './Task.svelte';
  let run_id = $page.params.run_id;
  let run: any;
  let workflow: any;
  let logs: any[];
  let steps: any[];
  let interval_id: number | NodeJS.Timer;

  onMount(async () => {
    await fetchData();

    interval_id = setInterval(async () => {
      if (run && run.status === 'running') {
        await fetchData();
      } else {
        clearInterval(interval_id); // stop the interval if the status isn't 'running'
      }
    }, 30000);
  });

  onDestroy(() => {
    clearInterval(interval_id); // always clear the interval when the component is destroyed
  });

  async function fetchData() {
    run = await fetchRun(run_id);
    if (run) {
      workflow = await fetchWorkflow(run.workflow_id);
      logs = await fetchLogs(run_id);
      if (workflow) {
        steps = await fetchSteps(workflow.id);
      }
    }
  }
</script>

<LeftNav />
<Content>
  {#if run && workflow && logs && steps}
    <main class="grid gap-4 grid-cols-4 p-4 auto-rows-max">
      <Details {workflow} {run} />
      <StepsOverview {steps} />
      <Task {workflow} {run} />
      <Agents {steps} />
      <ChatLog {logs} />
    </main>
  {/if}
</Content>
