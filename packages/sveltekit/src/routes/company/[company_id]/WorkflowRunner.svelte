<script lang="ts">
  import { onMount } from 'svelte';
  import workflowService from '$lib/utils/api/workflowService';
  import type { Workflow } from '$entities/workflow.entity';
  import type { Run } from '$entities/run.entity';
  import { goto } from '$app/navigation';

  export let companyId: string;
  let workflows: Workflow[] = [];
  let selectedWorkflowId: string | null = null;

  onMount(async () => {
    try {
      workflows = await workflowService.getMany();
      if (workflows.length) selectedWorkflowId = workflows[0].id; // Default to the first workflow if available
    } catch (error) {
      console.error('Error fetching workflows:', error);
    }
  });

  async function runWorkflow() {
    if (selectedWorkflowId) {
      try {
        workflowService.run(selectedWorkflowId, companyId);
        goto(`/company/${companyId}`);
      } catch (error) {
        console.error('Error running workflow:', error);
        alert('Failed to start the workflow.');
      }
    }
  }
</script>

<div class="flex flex-row gap-2 items-center">
  <span class="text-sm">Run a new workflow</span>
  <select bind:value={selectedWorkflowId} class="text-sm border-solid border-slate-200 border text-slate-800 px-3 py-3 rounded-md mr-2">
    {#each workflows as workflow (workflow.id)}
      <option value={workflow.id}>{workflow.label}</option>
    {/each}
  </select>

  <!-- Button to run the selected workflow -->
  <button type="button" class="bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 px-6 py-2" on:click={runWorkflow}>Run</button>
</div>
<!-- Dropdown to select a workflow -->
