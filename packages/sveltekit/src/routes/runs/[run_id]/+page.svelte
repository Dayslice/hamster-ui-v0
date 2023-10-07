<script lang="ts">
  import Details from './Details.svelte';
  import { page } from '$app/stores';
  import { onMount, onDestroy } from 'svelte';
  import { fetchLogs, fetchRun, fetchSteps, fetchWorkflow } from '$lib/utils/fetchLogs';
  import Agents from './Agents.svelte';
  import StepsOverview from './StepsOverview.svelte';
  import ChatLog from './ChatLog.svelte';
  import Task from './Task.svelte';
  import type { Log } from '$entities/log.entity';
  import type { Workflow } from '$entities/workflow.entity';
  import type { Run } from '$entities/run.entity';
  import type { Step } from '$entities/step.entity';
  import runService from '$lib/utils/api/runService';
  import workflowService from '$lib/utils/api/workflowService';
  import logService from '$lib/utils/api/logService';
  import stepService from '$lib/utils/api/stepService';
  let run_id = $page.params.run_id;
  let run: Run;
  let workflow: Workflow;
  let logs: Log[] = [];
  let steps: Step[];
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
    run = await runService.getOne(run_id);
    if (run) {
      workflow = await workflowService.getOne(run.workflow_id);
      logs = await logService.getMany([
        ['filter', `run_id||$eq||${run_id}`],
        ['join', 'source_agent'],
        ['join', 'attachments'],
      ]);
      if (workflow) {
        steps = await stepService.getManyForWorkflow(workflow.id);
      }
    }
  }
</script>

{#if run && workflow && logs && steps}
  <main class="grid gap-4 grid-cols-4 p-4 auto-rows-max">
    <Details {workflow} {run} />
    <StepsOverview {steps} />
    <Task {workflow} {run} />
    <Agents {steps} />
    <ChatLog {logs} />
  </main>
{/if}
