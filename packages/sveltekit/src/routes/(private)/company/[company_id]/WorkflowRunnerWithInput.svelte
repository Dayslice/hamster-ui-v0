<script lang="ts">
  import { onMount } from 'svelte';
  import workflowService from '$lib/utils/api/workflowService';
  import type { Run } from '$entities/run.entity';
  import { goto } from '$app/navigation';
  import type { Workflow } from '$entities/workflow.entity';

  export let companyId: string;
  let workflows: Workflow[] = [];
  let selectedWorkflowId: string | null = null;
  let selectedWorkflow: Workflow | undefined;
  let initialInput: string = ''; // This will store the value from the text area

  let formDisabled = false;

  onMount(async () => {
    try {
      workflows = await workflowService.getMany();
      if (workflows.length) selectedWorkflowId = workflows[0].id;
    } catch (error) {
      console.error('Error fetching workflows:', error);
    }
  });

  $: if (selectedWorkflowId) {
    selectedWorkflow = workflows.find((workflow) => workflow.id == selectedWorkflowId);
  }

  async function runWorkflow() {
    if (selectedWorkflowId) {
      formDisabled = true;
      try {
        const run: Run = await workflowService.run(selectedWorkflowId, companyId, initialInput);
        await goto(`/runs/${run.id}`);
      } catch (error) {
        formDisabled = false;
        console.error('Error running workflow:', error);
        alert('Failed to start the workflow.');
      }
    }
  }
</script>

<div class="flex flex-col gap-2 items-start">
  <span class="text-sm">Run a new workflow</span>
  <select bind:value={selectedWorkflowId} class="text-sm border-solid border-slate-200 border text-slate-800 px-3 py-2 rounded-md mb-2">
    {#each workflows as workflow (workflow.id)}
      <option value={workflow.id}>{workflow.label}</option>
    {/each}
  </select>
  {#if selectedWorkflowId}
    <span class="text-xs text-slate-700 bg-slate-50 border border-slate-300 px-2 py-1">{selectedWorkflow?.task}</span>
  {/if}
  <textarea
    bind:value={initialInput}
    class="text-sm border-solid border-slate-200 border text-slate-800 px-3 py-2 rounded-md mb-2 w-full max-w-4xl"
    placeholder={`Enter your initial input here. Populates the {action_input} tag.`}
    rows="5"
  />
  <!-- Text area field for initial input -->
  <button
    disabled={formDisabled}
    type="button"
    class="bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 px-6 py-2 disabled:bg-slate-300 disabled:text-slate-600"
    on:click={runWorkflow}>Run</button
  >
</div>
