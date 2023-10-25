<script lang="ts">
  import { page } from '$app/stores';
  import Header from '$lib/layout/Header.svelte';
  import { onMount } from 'svelte';
  import { fetchCompany, fetchLogs, fetchRun, fetchRuns, fetchSteps, fetchWorkflow } from '$lib/utils/fetchLogs';
  import LeftNav from '$lib/layout/LeftNav.svelte';
  import Content from '$lib/layout/Content.svelte';
  import { formatCasualDateTime } from '$lib/utils/formatters/date.formatter';
  import { goto } from '$app/navigation';
  import Status from '$lib/ui/Status.svelte';
  import workflowService from '$lib/utils/api/workflowService';
  import type { Workflow } from '$entities/workflow.entity';
  import WorkflowRunner from './WorkflowRunner.svelte';
  import WorkflowRunnerWithInput from './WorkflowRunnerWithInput.svelte';
  import Panel from '$lib/layout/Panel.svelte';
  import runService from '$lib/utils/api/runService';
  let company_id: string = $page.params.company_id;
  let company: any;
  let workflows: Workflow[] = [];
  let runs: any[] = [];

  onMount(async () => {
    company = await fetchCompany(company_id);
    runs = await fetchRuns(company_id);
    workflows = await workflowService.getMany();
  });

  const handleDeleteRun = async (idx: number, id: string) => {
    await runService.deleteOne(id);
    runs.splice(idx, 1);
    runs = runs;
    //runs = await fetchRuns(company_id);
  };
</script>

<div class="px-16 py-10 border-slate-300 flex flex-row gap-12 bg-white items-start">
  <table class="flex-1 divide-y divide-gray-300 w-full bg-white">
    <thead>
      <tr>
        <th scope="col" class="py-3 pl-4 pr-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 sm:pl-0">Run ID</th>
        <th scope="col" class="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">Workflow</th>
        <th scope="col" class="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">Started At</th>
        <th scope="col" class="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">Status</th>
        <th scope="col" class="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"> Actions </th>
      </tr>
    </thead>
    <tbody class="divide-y divide-gray-200 bg-white">
      {#each runs as run, idx}
        <tr class="cursor-pointer hover:bg-amber-200">
          <td class="py-4 px-3 text-sm font-medium text-gray-900 sm:pl-0" on:click={() => goto(`/runs/${run.id}`)}>{run.id.slice(-4)}</td>
          <td class="px-3 py-4 text-sm text-gray-500" on:click={() => goto(`/runs/${run.id}`)}>{run.workflow.label}</td>
          <td class="px-3 py-4 text-sm text-gray-500" on:click={() => goto(`/runs/${run.id}`)}>{formatCasualDateTime(run.created_at)}</td>
          <td class="relative py-4 pl-3 pr-4 text-left text-sm font-medium sm:pr-0"><Status status={run.status} /> </td>
          <td class="relative py-4 pl-3 pr-4 text-left text-sm font-medium sm:pr-0"
            ><button type="button" class="text-red-400 text-sm" on:click={() => handleDeleteRun(idx, run.id)}
              ><i class="fa-solid fa-trash" /></button
            >
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
  <Panel class="w-full max-w-md">
    <WorkflowRunnerWithInput companyId={company_id} />
  </Panel>
</div>
