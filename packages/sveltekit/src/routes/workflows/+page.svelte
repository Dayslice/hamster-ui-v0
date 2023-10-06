<script lang="ts">
  import type { Workflow } from '$entities/workflow.entity';
  import Breadcrumbs from '$lib/layout/Breadcrumbs.svelte';
  import workflowService from '$lib/utils/api/workflowService';
  import { onMount } from 'svelte';

  let workflows: Workflow[] = [];
  let newWorkflow = {
    label: '',
    description: '',
    task: '',
  };

  let breadcrumbs: { label: string; url: string }[] = [{ label: 'Workflows', url: '/workflows' }];
  onMount(async () => {
    workflows = await workflowService.getMany();
  });

  async function createWorkflow() {
    const createdWorkflow = await workflowService.create(newWorkflow);
    workflows = [...workflows, createdWorkflow];
    newWorkflow = { label: '', description: '', task: '' };
  }
</script>

<Breadcrumbs {breadcrumbs} />
<div class="px-12">
  <!-- Workflows Table -->
  <table class="min-w-full table-auto border-collapse border border-gray-300 mt-4">
    <thead>
      <tr class="bg-gray-800 text-white font-semibold text-sm">
        <th class="px-4 py-2 border border-gray-300">Label</th>
        <th class="px-4 py-2 border border-gray-300">Description</th>
        <th class="px-4 py-2 border border-gray-300">Task</th>
        <th class="px-4 py-2 border border-gray-300">Actions</th>
      </tr>
    </thead>
    <tbody>
      {#each workflows as workflow}
        <tr class="hover:bg-gray-100 text-sm">
          <td class="px-4 py-2 border border-gray-300">{workflow.label}</td>
          <td class="px-4 py-2 border border-gray-300">{workflow.description}</td>
          <td class="px-4 py-2 border border-gray-300">{workflow.task}</td>
          <td class="px-4 py-2 border border-gray-300">
            <div class="flex flex-col gap-2 items-center justify-start text-xs">
              <a href={`/workflows/${workflow.id}/edit`} class="text-blue-500 hover:text-blue-700 text-center">View Steps</a>
              <button class="text-blue-500 hover:text-blue-700 text-center">Run</button>
            </div>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>

  <!-- Create Workflow Form -->
  <div class="mt-4">
    <h2 class="text-xl mb-2">Create New Workflow</h2>
    <form on:submit|preventDefault={createWorkflow}>
      <input class="border p-2 rounded mr-2" bind:value={newWorkflow.label} placeholder="Label" />
      <input class="border p-2 rounded mr-2" bind:value={newWorkflow.description} placeholder="Description" />
      <input class="border p-2 rounded mr-2" bind:value={newWorkflow.task} placeholder="Task" />
      <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Create</button>
    </form>
  </div>
</div>
