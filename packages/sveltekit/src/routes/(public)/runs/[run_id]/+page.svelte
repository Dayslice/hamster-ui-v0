<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { page } from '$app/stores';

  // Components
  import Details from './Details.svelte';
  import Agents from './Agents.svelte';
  import StepsOverview from './StepsOverview.svelte';
  import ChatLog from './ChatLog.svelte';
  import CompanyOverview from './CompanyOverview.svelte';
  import Result from './Result.svelte';

  // Types
  import type { Log } from '$entities/log.entity';
  import type { Workflow } from '$entities/workflow.entity';
  import type { Run } from '$entities/run.entity';
  import type { Step } from '$entities/step.entity';
  import type { Company } from '$entities/company.entity';

  // Services
  import runService from '$lib/utils/api/runService';
  import workflowService from '$lib/utils/api/workflowService';
  import logService from '$lib/utils/api/logService';
  import stepService from '$lib/utils/api/stepService';
  import companyService from '$lib/utils/api/companyService';

  let run_id = $page.params.run_id;
  let run: Run;
  let company: Company;
  let workflow: Workflow;
  let logs: Log[] = [];
  let steps: Step[];
  let interval_id: number | NodeJS.Timer;
  let quick_interval_id: number | NodeJS.Timer;

  onMount(async () => {
    await fetchData();
    quick_interval_id = setInterval(async () => {
      if (logs.length == 0 || run.status == 'queued') {
        await fetchData();
      } else {
        clearInterval(quick_interval_id); // stop the interval if the status isn't 'running'
      }
    }, 2000);

    interval_id = setInterval(async () => {
      if (run && run.status === 'running') {
        await fetchData();
      } else {
        clearInterval(interval_id); // stop the interval if the status isn't 'running'
      }
    }, 20000);
  });

  onDestroy(() => {
    if (interval_id) clearInterval(interval_id);
    if (quick_interval_id) clearInterval(quick_interval_id);
  });

  async function fetchData() {
    run = await runService.getOne(run_id);

    if (run) {
      [company, workflow, logs] = await Promise.all([
        companyService.getOne(run.company_id),
        workflowService.getOne(run.workflow_id),
        logService.getMany([
          ['filter', `run_id||$eq||${run_id}`],
          ['join', 'source_agent'],
          ['join', 'attachments'],
          ['join', 'step'],
          ['join', 'step_tool'],
        ]),
      ]);

      if (workflow) {
        steps = await stepService.getManyForWorkflow(workflow.id);
      }
    }
  }
</script>

{#if run && workflow && logs && steps}
  <main class="gap-4 p-4 flex flex-col md:grid md:grid-cols-3 lg:grid-cols-4 mb-20">
    <div class="row-start-1 row-end-3 col-span-1 flex flex-col gap-4">
      <Details {workflow} bind:run lastLog={logs.length > 0 ? logs[logs.length - 1] : null} />
      <StepsOverview {steps} {logs} runStatus={run.status} />
    </div>

    <div class=" col-start-2 col-end-4 row-span-4 flex flex-col gap-4">
      {#if logs.length > 0}
        <Result agent={logs[0].source_agent ?? undefined} {workflow} {run} {logs} />
      {/if}
      <ChatLog class=" col-start-2 col-end-4" {logs} />
    </div>

    <div
      class="flex flex-col gap-4 md:col-start-1 md:col-end-2 md:row-start-3 md:row-end-4 lg:col-start-4 lg:col-end-5 lg:row-start-1 lg:row-end-2"
    >
      {#if company}
        <CompanyOverview {company} />
      {/if}
      <Agents {steps} />
    </div>
  </main>
{/if}
