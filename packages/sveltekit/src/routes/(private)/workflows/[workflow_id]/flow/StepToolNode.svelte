<!-- StepToolNode.svelte -->
<script lang="ts">
  import type { StepTool } from '$entities/step_tool.entity';
  import { writable } from 'svelte/store';
  import { Node, Anchor, Edge } from 'svelvet';
  import type { CSSColorString, Connections } from 'svelvet';
  import StepEdge from './StepEdge.svelte';
  import BasicInputEdge from './BasicInputEdge.svelte';
  import SelectedInputEdge from './SelectedInputEdge.svelte';
  import AgentMini from '$lib/ui/AgentMini.svelte';

  export let step_tool: StepTool;
  export let position: { x: number; y: number };
  export let color: CSSColorString;
  export let height: number;
  let selected: boolean;
  export let connections: Connections;

  function editConfig() {
    // Implement configuration editing logic here
  }

  const handleNodeClicked = (e: any) => {};
</script>

<Node
  id="step-tool-{step_tool.id}"
  dimensions={{ width: 250, height: height }}
  {position}
  locked
  borderRadius={6}
  borderWidth={2}
  on:nodeClicked={handleNodeClicked}
>
  <div
    class="w-full h-full flex flex-row flex-gap-0.5 bg-slate-200 items-center rounded-lg border-2 bg-opacity-70 cursor-pointer"
    style="border-color: {color}"
  >
    <div class="flex flex-col bg-slate-200 h-full py-1 rounded-l-lg">
      <div>
        <Anchor id={`input-${step_tool.id}-2`} input direction="west">
          <div class="h-1" /></Anchor
        >
        <Anchor id={`input-${step_tool.id}-1`} input direction="west">
          <div class="h-1" /></Anchor
        >
        <Anchor id={`input-${step_tool.id}-3`} input direction="west">
          <div class="h-1" /></Anchor
        >
        <Anchor id={`input-${step_tool.id}-4`} input direction="west">
          <div class="h-1" /></Anchor
        >
        <Anchor id={`input-${step_tool.id}-4`} input direction="west">
          <div class="h-1" /></Anchor
        >
      </div>
      <div class="flex-1" />
      <div />
    </div>
    <div class="flex flex-col bg-slate-200 h-full px-2 py-1 rounded-l-lg">
      <div>
        <i
          class:!text-slate-400={step_tool.step_tool_inputs.length == 0}
          class="fa-sharp fa-solid fa-circle-chevron-right text-slate-800"
        />
      </div>
      <div class="flex-1" />
      <div>
        <Anchor id={`output-${step_tool.id}`} output direction="west" {connections} edge={BasicInputEdge} edgeColor={writable(color)}
          ><i class:!text-slate-400={connections.length == 0} class={`fa-sharp fa-solid fa-circle-chevron-left text-slate-800`} /></Anchor
        >
      </div>
    </div>
    <div class="flex-1 bg-white h-full flex items-center">
      <div class="flex-1 flex-col gap-1">
        <h3 class="text-center leading-tight px-6 font-semibold text-slate-700">{step_tool.tool.label}</h3>
      </div>
    </div>
    <div class="h-full bg-white rounded-r-lg items-center flex">
      <i class="fa-regular fa-ellipsis-vertical text-2xl text-slate-400 px-4" />
    </div>
  </div>
</Node>
