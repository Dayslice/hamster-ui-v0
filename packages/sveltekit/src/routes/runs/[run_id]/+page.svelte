<script lang="ts">
  import Details from './Details.svelte';
  import { page } from '$app/stores';
  import Header from '$lib/layout/Header.svelte';
  import { onMount } from 'svelte';
  import { fetchLogs, fetchRun, fetchSteps, fetchWorkflow } from '$lib/utils/fetchLogs';
  import Agents from './Agents.svelte';
  import StepsOverview from './StepsOverview.svelte';
  import ChatLog from './ChatLog.svelte';
  import LeftNav from '$lib/layout/LeftNav.svelte';
  import Content from '$lib/layout/Content.svelte';
  let run_id = $page.params.run_id;
  let run: any;
  let workflow: any;
  let logs: any[];
  let steps: any[];

  onMount(async () => {
    run = await fetchRun(run_id);
    workflow = await fetchWorkflow(run.workflow_id);
    logs = await fetchLogs(run_id);
    steps = await fetchSteps(workflow.id);
  });
</script>

<LeftNav />
<Content>
  {#if run && workflow && logs && steps}
    <main class="grid gap-4 grid-cols-4 p-4 auto-rows-max">
      <Details {workflow} {run} />
      <StepsOverview {steps} />
      <ChatLog {logs} />
      <Agents {steps} />
    </main>
  {/if}
</Content>
