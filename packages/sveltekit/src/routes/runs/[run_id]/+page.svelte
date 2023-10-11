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
  import CompanyOverview from './CompanyOverview.svelte';
  import Result from './Result.svelte';
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
    run = await runService.getOne(run_id, [['join', 'company']]);
    if (run) {
      workflow = await workflowService.getOne(run.workflow_id);
      logs = await logService.getMany([
        ['filter', `run_id||$eq||${run_id}`],
        ['join', 'source_agent'],
        ['join', 'attachments'],
        ['join', 'step'],
        ['join', 'step_tool'],
      ]);
      if (workflow) {
        steps = await stepService.getManyForWorkflow(workflow.id);
      }
    }
  }
</script>

{#if run && workflow && logs && steps}
  <main class="gap-4 p-4 flex flex-col md:grid md:grid-cols-3 lg:grid-cols-4">
    <div class="row-start-1 row-end-3 col-span-1 flex flex-col gap-4">
      <Details {workflow} {run} />

      <StepsOverview {steps} {logs} runComplete={run.status == 'done'} />
    </div>
    <div class=" col-start-2 col-end-4 row-span-4 flex flex-col gap-4">
      <Result class="" {run} {logs} />
      <ChatLog class=" col-start-2 col-end-4" {logs} />
    </div>

    <div
      class="flex flex-col gap-4 md:col-start-1 md:col-end-2 md:row-start-3 md:row-end-4 lg:col-start-4 lg:col-end-5 lg:row-start-1 lg:row-end-2"
    >
      <CompanyOverview company={run.company} />
      <Agents {steps} />
    </div>
  </main>
{/if}
