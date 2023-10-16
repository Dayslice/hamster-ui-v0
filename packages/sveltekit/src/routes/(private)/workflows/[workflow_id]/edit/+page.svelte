<script lang="ts">
  import { page } from '$app/stores';
  import type { Agent } from '$entities/agent.entity';
  import type { Step } from '$entities/step.entity';
  import type { Workflow } from '$entities/workflow.entity';
  import Breadcrumbs from '$lib/layout/Breadcrumbs.svelte';
  import AgentMini from '$lib/ui/AgentMini.svelte';
  import agentService from '$lib/utils/api/agentService';
  import stepService from '$lib/utils/api/stepService';
  import workflowService from '$lib/utils/api/workflowService';
  import { getDifferences } from '$lib/utils/tools';
  import { onMount } from 'svelte';

  let steps: Step[] = [];
  let workflow: Workflow;

  let allAgents: Agent[] = [];

  let breadcrumbs: { label: string; url: string }[] = [];

  let selectedStep: Step | null = null;
  let newStep: Partial<Step>;

  const workflowId = $page.params.workflow_id;
  const initializeStep = (): Partial<Step> => {
    return {
      label: '',
      description: '',
      workflow_id: workflow.id,
      primary_agent_id: '',
      order: steps.length + 1,
    };
  };
  onMount(async () => {
    steps = await stepService.getManyForWorkflow(workflowId);
    workflow = await workflowService.getOne(workflowId);
    newStep = initializeStep();
    breadcrumbs = [
      { label: 'Workflows', url: '/workflows' },
      { label: workflow.label, url: `/workflows/${workflow.id}/edit` },
    ];

    allAgents = await agentService.getMany();
  });

  async function createOrUpdateStep() {
    if (selectedStep != null) {
      await stepService.update(selectedStep.id, getDifferences(selectedStep, newStep));
    } else {
      await stepService.create(newStep);
    }
    steps = await stepService.getManyForWorkflow(workflowId);
    newStep = initializeStep();
    selectedStep = null;
  }

  function editStep(step: Step) {
    selectedStep = step;
    newStep = { ...step };
  }
</script>

<Breadcrumbs {breadcrumbs} />
<div class="px-12 bg-white">
  <!-- Steps Table -->
  <table class="min-w-full table-auto border-collapse border border-gray-300 mt-4">
    <thead>
      <tr class="bg-gray-800 text-white font-semibold text-sm">
        <th class="px-4 py-2 border border-gray-300">Label</th>
        <th class="px-4 py-2 border border-gray-300">Description</th>
        <th class="px-4 py-2 border border-gray-300">Agents</th>
        <th class="px-4 py-2 border border-gray-300">Step Tools</th>
        <th class="px-4 py-2 border border-gray-300">Order</th>
        <th class="px-4 py-2 border border-gray-300">Actions</th>
      </tr>
    </thead>
    <tbody>
      {#each steps as step}
        <tr class="hover:bg-gray-100 text-sm">
          <td class="px-4 py-2 border border-gray-300">{step.label}</td>
          <td class="px-4 py-2 border border-gray-300">{step.description}</td>
          <!-- Involved Agents -->
          <td class="px-4 py-2 border border-gray-300"><AgentMini primary_agent={step.primary_agent} other_agents={step.other_agents} /></td
          >
          <td class="px-4 py-2 border border-gray-300 text-center">{step.step_tools.length}</td>
          <td class="px-4 py-2 border border-gray-300 text-center">{step.order}</td>
          <td class="px-4 py-2 border border-gray-300">
            <div class="flex flex-col gap-2 items-center justify-center text-xs">
              <button class="text-blue-500 hover:text-blue-700 text-center" on:click={() => editStep(step)}>Edit</button>
              <a href={`/workflows/${workflowId}/step/${step.id}/edit`} class="w-full text-center text-blue-500 hover:text-blue-700"
                >View Tools</a
              >
            </div>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
  {#if newStep}
    <!-- Add/Edit Step Form -->
    <div class="mt-10 px-6 py-4 bg-white border-t border-t-slate-200">
      <h2 class="text-xl text-slate-800 font-semibold mb-6">{selectedStep ? 'Edit' : 'Add'} Step</h2>
      <form on:submit|preventDefault={createOrUpdateStep} class="space-y-4">
        <div>
          <label for="stepLabel" class="block text-sm font-medium text-gray-600 mb-1">Label</label>
          <input
            id="stepLabel"
            class="w-full border border-gray-300 p-2 rounded"
            bind:value={newStep.label}
            placeholder="Enter step label"
          />
        </div>
        <div>
          <label for="stepDescription" class="block text-sm font-medium text-gray-600 mb-1">Description</label>
          <textarea
            id="stepDescription"
            rows="4"
            class="w-full border border-gray-300 p-2 rounded"
            bind:value={newStep.description}
            placeholder="Enter step description"
          />
        </div>
        <div>
          <label for="primaryAgent" class="block text-sm font-medium text-gray-600 mb-1">Primary Agent</label>
          <select id="primaryAgent" bind:value={newStep.primary_agent_id} class="w-full border border-gray-300 p-2 rounded">
            <option value="" disabled>Select a primary agent</option>
            {#each allAgents as agent}
              <option value={agent.id}>{agent.name} ({agent.title})</option>
            {/each}
          </select>
        </div>
        <div class="flex justify-between items-center">
          <button type="submit" class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 active:bg-blue-800"
            >{selectedStep ? 'Update' : 'Add'}</button
          >
          {#if selectedStep}
            <button
              type="button"
              class="text-red-500 hover:text-red-600"
              on:click={() => {
                selectedStep = null;
                newStep = { label: '', description: '' };
              }}>Cancel Edit</button
            >
          {/if}
        </div>
      </form>
    </div>
  {/if}
</div>
