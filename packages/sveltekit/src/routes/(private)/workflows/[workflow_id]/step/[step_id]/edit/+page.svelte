<script lang="ts">
  import { page } from '$app/stores';
  import { JSONEditor } from 'svelte-jsoneditor';
  import type { StepTool } from '$entities/step_tool.entity';
  import type { Tool } from '$entities/tool.entity';
  import stepToolService from '$lib/utils/api/stepToolService';
  import toolService from '$lib/utils/api/toolService'; // assuming this exists
  import { onMount } from 'svelte';
  import { getDifferences } from '$lib/utils/tools';
  import type { Workflow } from '$entities/workflow.entity';
  import workflowService from '$lib/utils/api/workflowService';
  import stepService from '$lib/utils/api/stepService';
  import type { Step } from '$entities/step.entity';
  import Breadcrumbs from '$lib/layout/Breadcrumbs.svelte';

  let stepTools: StepTool[] = [];
  let step: Step;
  let workflow: Workflow;
  let tools: Tool[] = [];
  let selectedStepTool: StepTool | null = null;
  let originalStepTool: StepTool | null = null;
  let inJsonEditor = false;
  let jsonStarters: Record<string, any> = {
    summary: {
      data: 'Put your data OR reference another step tool like {ID}',
      model: 'gpt-4',
      format:
        'FORMAT INSTRUCTIONS:You must respond in Slack workplace style. direct, concise, succinct answers. In general, show your work as to how you get there if you are given a complex, logical reasoning topics. It’s okay to have opinions on topics but explicitly sign-post when you are stating an opinion versus a fact. Your personality type is an INTJ so communication and thinking style is very analytical. You do not like fluffiness, ambiguity, or flowery language because you feel like that conceals clear reasoning. Highlight important thoughts with Markdown-style bolding like **this is important** \n',
      prompt: 'Summarize this information in a clear and conise manner, in the style of an 18th century memoir in France.',
      include_agent: true,
      include_company: true,
    },
    collab: {
      prompt: 'Put your data they should discuss here OR reference another step tool like {ID}',
      solution_key: 'The ID of a Step Tool that has the initial solution to start the discussion with.',
    },
    pdf: {
      map_prompt: `Write a concise summary of the following text delimited by triple backquotes.
              Return your response in bullet points which covers the key points of the text.
              \`\`\`{text}\`\`\`
              BULLET POINT SUMMARY:`,
      combine_prompt: `Write a summary of this chunk of text that includes the main points and any important details.
                      {text}`,
      pdf_url: 'https://**.pdf',
    },
    semrush: {
      type: 'domain_organic',
      requires_domain: true,
      requires_competitors: false,
      display_limit: 20,
      export_columns: 'Ph,Po,Pp,Nq',
      display_sort: 'nq_desc',
    },
    markdown: {
      model_structure: {},
    },
  };
  let newStepTool: Partial<StepTool>;
  const initializeStepTool = (): Partial<StepTool> => {
    return {
      tool_id: '',
      config: {},
      step_id: step.id,
      order: stepTools.length + 1,
    };
  };

  let breadcrumbs: { label: string; url: string }[] = [];

  let configJson = { text: undefined, json: {} };
  const workflowId = $page.params.workflow_id;
  const stepId = $page.params.step_id;

  onMount(async () => {
    try {
      stepTools = await stepToolService.getManyForStep(stepId);
      tools = await toolService.getMany();
      workflow = await workflowService.getOne(workflowId);
      step = await stepService.getOne(stepId);

      newStepTool = initializeStepTool();

      breadcrumbs = [
        { label: 'Workflows', url: '/workflows' },
        { label: workflow.label, url: `/workflows/${workflow.id}/edit` },
        { label: step.label, url: `/workflows/${workflow.id}/step/${step.id}/edit` },
      ];
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  });

  function selectStepTool(stepTool: StepTool) {
    selectedStepTool = { ...stepTool };
    newStepTool = { ...stepTool };
    configJson = { ...configJson, json: { ...newStepTool.config } };
  }

  async function createOrUpdateStepTool() {
    if (inJsonEditor) {
      return; // Return early and don't process the submission
    }

    newStepTool.config = configJson.json;
    let result: StepTool;
    if (selectedStepTool) {
      result = await stepToolService.update(selectedStepTool.id, getDifferences(selectedStepTool, newStepTool));
    } else {
      result = await stepToolService.create(newStepTool);
    }
    const uuids = extractUUIDs(JSON.stringify(newStepTool.config));
    stepToolService.updateInputs(result.id, uuids);
    stepTools = await stepToolService.getManyForStep(stepId);
    reset();
  }

  function extractUUIDs(jsonString: string) {
    const regex = /\{([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})\}/gi;
    let match;
    const uuids = [];
    while ((match = regex.exec(jsonString)) !== null) {
      uuids.push(match[1]);
    }
    return uuids;
  }

  function handleToolChange() {
    const tool = tools.find((t) => t.id == newStepTool.tool_id);
    if (!tool) {
      return;
    }
    if (Object.hasOwn(jsonStarters, tool.ref)) {
      configJson = { ...configJson, json: Object.assign(jsonStarters[tool.ref]) };
    } else {
      configJson = { ...configJson, json: {} };
    }
  }

  function reset() {
    selectedStepTool = null;
    newStepTool = initializeStepTool();
    configJson = { ...configJson, json: {} };
    configJson = configJson;
  }

  async function moveOrder(index: number, direction: number) {
    // Swap the order of the two items based on the direction
    const itemToMove = stepTools[index];
    const itemToSwapWith = stepTools[index + direction];

    // Update their order values
    itemToMove.order += direction;
    itemToSwapWith.order -= direction;

    // Swap their positions in the list
    stepTools[index] = itemToSwapWith;
    stepTools[index + direction] = itemToMove;

    // Update the order in the API (You can optimize this by sending fewer requests)
    await stepToolService.update(itemToMove.id, { order: itemToMove.order });
    await stepToolService.update(itemToSwapWith.id, { order: itemToSwapWith.order });

    // Update the local list of items (If needed, depending on how your service updates data)
    stepTools = [...stepTools];
  }

  function handleJsonEditorKeydown(event: KeyboardEvent) {
    // Check if the pressed key is Enter
    if (event.key === 'Enter' || event.keyCode === 13) {
      event.preventDefault(); // Prevent the default behavior (form submission)
    }
  }
</script>

<Breadcrumbs {breadcrumbs} />
<div class="px-12 bg-white">
  <table class="min-w-full table-auto border-collapse border border-gray-300 mt-4">
    <thead>
      <tr class="bg-gray-800 text-white font-semibold text-sm">
        <th class="px-4 py-2 border border-gray-300">Id</th>
        <th class="px-4 py-2 border border-gray-300">Tool</th>
        <th class="px-4 py-2 border border-gray-300">Config</th>
        <th class="px-4 py-2 border border-gray-300">Order</th>
        <th class="px-4 py-2 border border-gray-300">Actions</th>
      </tr>
    </thead>
    <tbody>
      {#each stepTools as stepTool, index (stepTool.id)}
        <tr class="hover:bg-gray-100 text-sm" data-item={stepTool}>
          <td class="px-4 py-2 border border-gray-300">{stepTool.id}</td>
          <td class="px-4 py-2 border border-gray-300">{stepTool.tool.label}</td>
          <td class="px-4 py-2 border border-gray-300 font-mono text-xs">{JSON.stringify(stepTool.config, undefined, 2)}</td>
          <td class="px-4 py-2 border border-gray-300"
            ><div class="flex flex-row justify-center items-center gap-1">
              {stepTool.order}
              <div class="flex flex-col -space-y-2 justify-around items-center">
                {#if index > 0}
                  <i class="text-xs fa-solid fa-caret-up cursor-pointer" on:click={() => moveOrder(index, -1)} />
                {/if}
                {#if index < stepTools.length - 1}
                  <i class="text-xs fa-solid fa-caret-down cursor-pointer" on:click={() => moveOrder(index, 1)} />
                {/if}
              </div>
            </div>
            <!-- Add a condition to ensure the up arrow doesn't appear for the first item and likewise for the down arrow -->
          </td>
          <td class="px-4 py-2 border border-gray-300">
            <div class="flex flex-col gap-2 items-center justify-center text-xs">
              <button class="text-blue-500 hover:text-blue-700 text-center" on:click={() => selectStepTool(stepTool)}>Edit</button>
            </div></td
          >
        </tr>
      {/each}
    </tbody>
  </table>

  {#if newStepTool}
    <div class="mt-10 px-6 py-4 bg-white border-t border-t-slate-200">
      <h2 class="text-xl text-slate-800 font-semibold mb-6">{selectedStepTool ? 'Edit' : 'Add'} Step Tool</h2>
      <form on:submit|preventDefault={createOrUpdateStepTool} class="space-y-4">
        <div>
          <label for="tool" class="block text-sm font-medium text-gray-600 mb-1">Tool</label>
          <select
            id="tool"
            bind:value={newStepTool.tool_id}
            class="w-full border border-gray-300 p-2 rounded"
            on:change={() => handleToolChange()}
          >
            <option value="" disabled>Select a tool</option>

            {#each tools as tool}
              <option value={tool.id}>{tool.label}</option>
            {/each}
          </select>
        </div>
        <div class="mb-4">
          <label class="block mb-2">Configuration</label>
          <JSONEditor bind:content={configJson} onFocus={() => (inJsonEditor = true)} onBlur={() => (inJsonEditor = false)} />
        </div>
        <div class="flex justify-between items-center">
          <button type="submit" class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 active:bg-blue-800">
            {selectedStepTool ? 'Update' : 'Add'}
          </button>
          {#if selectedStepTool}
            <button
              type="button"
              class="text-red-500 hover:text-red-600"
              on:click={() => {
                reset();
              }}>Cancel Edit</button
            >
          {/if}
        </div>
      </form>
    </div>
  {/if}
</div>
