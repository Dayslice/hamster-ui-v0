<script lang="ts">
  import { page } from '$app/stores';
  import type { Step } from '$entities/step.entity';
  import type { Workflow } from '$entities/workflow.entity';
  import stepService from '$lib/utils/api/stepService';
  import workflowService from '$lib/utils/api/workflowService';
  import { onMount } from 'svelte';
  import { Svelvet, Node, Anchor, Edge, Group } from 'svelvet';
  import type { CSSColorString, Connections } from 'svelvet';
  import StepNode from './StepNode.svelte';
  import StepToolNode from './StepToolNode.svelte';

  interface Node {
    id: number;
    position: { x: number; y: number };
    data: { label: string };
    width: number;
    height: number;
    bgColor: string;
    label: string;
  }

  interface Edge {
    id: string;
    source: number;
    target: number;
    type: string;
    label: string;
    animate?: boolean;
    noHandle?: boolean;
    arrow?: boolean;
  }

  let steps: Step[] = [];
  let workflow: Workflow;
  const workflowId = $page.params.workflow_id;
  let offsets: number[] = [];

  $: offsets = steps.reduce(
    (acc, step, idx) => {
      if (idx !== 0) {
        acc.push(acc[idx - 1] + (step.step_tools ? step.step_tools?.length : 0));
      }
      return acc;
    },
    [steps[0]?.step_tools?.length ?? 0],
  );

  let outputMap: Record<string, Connections>;

  onMount(async () => {
    steps = await stepService.getManyForUI(workflowId);
    workflow = await workflowService.getOne(workflowId);
    outputMap = mapOutputs();
  });

  const stepHeight: number = 40;
  const stepWidth: number = 300;
  const stepToolHeight: number = 60;
  const stepToolWidth: number = 260;
  const stepToolPadding: number = 6;
  const groupXPadding: number = 40;
  const groupYPadding: number = 20;

  const groupWidth: number = Math.max(stepWidth, stepToolWidth) + groupXPadding * 2;

  const mapOutputs = () => {
    let map: Record<string, Connections> = {};
    steps.forEach((step) => {
      step.step_tools.forEach((stepTool) => {
        stepTool.step_tool_inputs.forEach((inputStep, idx) => {
          if (!map[inputStep.id]) {
            map[inputStep.id] = [];
          }
          map[inputStep.id].push([`step-tool-${stepTool.id}`, `input-${stepTool.id}-${idx + 1}`]);
        });
      });
    });
    return map;
  };

  let lineColors: CSSColorString[] = [
    '#f87171',
    '#fb923c',
    '#fbbf24',
    '#a3e635',
    '#4ade80',
    '#67e8f9',
    '#60a5fa',
    '#818cf8',
    '#a78bfa',
    '#c084fc',
    '#f472b6',
  ];
</script>

{#if steps && outputMap && steps.length > 0}
  <Svelvet id="my-canvas" TD controls>
    {#each steps as step, idx}
      <Group
        color="#94a3b8"
        width={groupWidth}
        height={(stepToolPadding + stepToolHeight) * step.step_tools.length + (groupYPadding * 3 + stepHeight)}
        groupName={step.label}
        position={{
          x: (groupWidth + 40) * idx,
          y: idx == 0 ? 0 : (stepToolPadding + stepToolHeight) * offsets[idx - 1] + stepHeight * idx,
        }}
      >
        <StepNode {step} position={{ x: groupXPadding, y: groupYPadding }} dimensions={{ width: stepWidth, height: stepHeight }} />
        {#each step.step_tools as step_tool, tool_idx}
          <StepToolNode
            connections={outputMap[step_tool.id] ?? []}
            color={idx == 0 ? lineColors[tool_idx] : lineColors[offsets[idx - 1] + tool_idx]}
            {step_tool}
            height={stepToolHeight}
            position={{
              x: (groupWidth - stepToolWidth) / 2,
              y: tool_idx * (stepToolHeight + stepToolPadding) + groupYPadding * 2 + stepToolPadding + stepHeight,
            }}
          />
        {/each}
      </Group>
    {/each}
  </Svelvet>
{/if}
