<script lang="ts">
  import type { Log } from '$entities/log.entity';
  import type { Step } from '$entities/step.entity';
  import Panel from '$lib/layout/Panel.svelte';
  import AgentMini from '$lib/ui/AgentMini.svelte';
  import AttachmentMini from '$lib/ui/AttachmentMini.svelte';
  import StepStatus from './StepStatus.svelte';

  let classList = '';
  export { classList as class };

  export let steps: any[] = [];
  export let logs: Log[] = [];
  export let runStatus: string;

  let log_attachments: Record<string, Log[]> = {};
  $: if (logs) {
    let new_log_attachments: Record<string, Log[]> = {};
    for (const log of logs) {
      if (!log.attachments) {
        continue;
      }

      if (!new_log_attachments.hasOwnProperty(log.step_id)) {
        new_log_attachments[log.step_id] = [];
      }
      new_log_attachments[log.step_id].push(log);
    }

    log_attachments = new_log_attachments;
  }

  function handleStepClicked(step: Step) {}
</script>

<Panel class={classList} header="Workflow Steps">
  {#if steps}
    <ul>
      {#each steps as step (step.id)}
        <li class="first:border-t-0 border-t first:pt-0 pt-4 pb-2">
          <!-- Step Title and Description -->
          <div class="flex flex-col gap-1">
            <button type="button" class="flex flex-row justify-between gap-2 items-center w-full" on:click={() => handleStepClicked(step)}>
              <span class="flex flex-row gap-2 items-center">
                <StepStatus {step} {logs} {runStatus} />
                <h3 class="font-medium text-left text-sm">
                  {step.label}
                </h3>
              </span>
              <AgentMini primary_agent={step.primary_agent} other_agents={step.other_agents} />
            </button>
            {#if log_attachments.hasOwnProperty(step.id)}
              <div class="flex flex-col gap-1">
                {#each log_attachments[step.id] as log}
                  {#each log.attachments as attachment}
                    <AttachmentMini {attachment} />
                  {/each}
                {/each}
              </div>
            {/if}
          </div>
          <!-- Involved Agents -->
        </li>
      {/each}
    </ul>
  {/if}
</Panel>
