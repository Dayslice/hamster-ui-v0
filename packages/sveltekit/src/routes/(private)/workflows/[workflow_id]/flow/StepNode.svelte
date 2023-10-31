<script lang="ts">
  import { Anchor, Node } from 'svelvet';
  import StepToolNode from './StepToolNode.svelte';
  import type { Step } from '$entities/step.entity';
  import StepEdge from './StepEdge.svelte';
  import AgentMini from '$lib/ui/AgentMini.svelte';

  export let step: Step;
  export let dimensions: { width: number; height: number };
  export let position: { x: number; y: number };
</script>

<Node {position} {dimensions} id="step-{step.id}" borderRadius={6} borderWidth={1} locked>
  <div class="w-full h-full bg-none flex flex-col items-center justify-center border-slate-400 cursor-default">
    <div class="flex flex-row gap-1 5">
      <AgentMini primary_agent={step.primary_agent} other_agents={step.other_agents} />
      <div class="text-base font-semibold text-slate-700">{step.label}</div>
    </div>
  </div>
</Node>
