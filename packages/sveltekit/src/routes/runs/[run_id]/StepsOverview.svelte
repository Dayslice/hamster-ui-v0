<script lang="ts">
  import type { Attachment } from '$entities/attachment.entity';
  import type { Log } from '$entities/log.entity';
  import type { Step } from '$entities/step.entity';
  import Panel from '$lib/layout/Panel.svelte';
  import AgentMini from '$lib/ui/AgentMini.svelte';
  import AttachmentMini from '$lib/ui/AttachmentMini.svelte';

  // Example steps data. This would be fetched or passed as props.
  export let steps: any[] = [];
  export let logs: Log[] = [];
  export let runComplete: boolean;
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

  enum stepStatus {
    NOT_STARTED = 'not_started',
    IN_PROGRESS = 'in_progress',
    DONE = 'done',
  }
  function getStepStatus(step_id: string) {
    if (!logs.some((log) => log.step_id == step_id)) {
      return stepStatus.NOT_STARTED;
    }

    if (logs[logs.length - 1].step_id == step_id && !runComplete) {
      return stepStatus.IN_PROGRESS;
    }
    return stepStatus.DONE;
  }
  function handleStepClicked(step: Step) {}
</script>

<Panel header="Step Overview">
  {#if steps}
    <ul>
      {#each steps as step (step.id)}
        {@const status = getStepStatus(step.id)}
        <li class="first:border-t-0 border-t first:pt-0 pt-4 pb-2">
          <!-- Step Title and Description -->
          <div class="flex flex-col gap-1">
            <button type="button" class="flex flex-row justify-between gap-2 items-center w-full" on:click={() => handleStepClicked(step)}>
              <span class="flex flex-row gap-2 items-center">
                {#if status == stepStatus.IN_PROGRESS}
                  <span class="rounded-full flex flex-col items-center justify-center px-1 py-0.5 bg-yellow-100 border border-yellow-300">
                    <i class="text-xs fa-solid fa-spinner text-yellow-600 animate-spin" />
                  </span>
                {:else if status == stepStatus.NOT_STARTED}
                  <span class="rounded-full flex flex-col items-center justify-center px-1 py-0.5 bg-slate-100 border border-slate-300">
                    <i class="text-xs fa-solid fa-ellipsis text-slate-600" />
                  </span>
                {:else}
                  <span class="rounded-full flex flex-col items-center justify-center px-1 py-0.5 bg-green-100 border border-green-300">
                    <i class=" text-xs fa-solid fa-check text-green-600" />
                  </span>
                {/if}

                <h3
                  class="font-medium text-left text-sm
                "
                >
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
