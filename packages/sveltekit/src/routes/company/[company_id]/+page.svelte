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
  let company_id: string = $page.params.company_id;
  let company: any;
  let runs: any[] = [];

  onMount(async () => {
    company = await fetchCompany(company_id);
    runs = await fetchRuns(company_id);
  });
</script>

<LeftNav />
<Content>
  <div class="px-16 py-10 border-slate-300">
    <table class="divide-y divide-gray-300 px-12 w-full">
      <thead>
        <tr>
          <th scope="col" class="py-3 pl-4 pr-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 sm:pl-0">Run ID</th>
          <th scope="col" class="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">Workflow</th>
          <th scope="col" class="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">Started At</th>
          <th scope="col" class="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">Status</th>
          <th scope="col" class="relative py-3 pl-3 pr-4 sm:pr-0">
            <span class="sr-only">Edit</span>
          </th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200 bg-white">
        {#each runs as run}
          <tr class="cursor-pointer hover:bg-amber-200" on:click={() => goto(`/runs/${run.id}`)}>
            <td class="py-4 px-3 text-sm font-medium text-gray-900 sm:pl-0">{run.id.slice(-4)}</td>
            <td class="px-3 py-4 text-sm text-gray-500">{run.workflow.label}</td>
            <td class="px-3 py-4 text-sm text-gray-500">{formatCasualDateTime(run.created_at)}</td>
            <td class="relative py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0"><Status status={run.status} /> </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</Content>
