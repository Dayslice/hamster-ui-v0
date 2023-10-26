<script lang="ts">
  import { writable } from 'svelte/store';
  import type { Log } from '$entities/log.entity';
  import type { Step } from '$entities/step.entity';

  export let step: Step;
  export let logs: Log[] = [];
  export let runStatus: string;

  $: status = determineStepStatus(runStatus);

  enum StepStatus {
    NOT_STARTED = 'not_started',
    CANCELLED = 'cancelled',
    IN_PROGRESS = 'in_progress',
    DONE = 'done',
  }

  function determineStepStatus(_runStatus: string): StepStatus {
    const lastLog = logs[logs.length - 1];
    const stepLog = logs.find((log) => log.step_id === step.id);

    if (!stepLog) {
      return _runStatus == 'cancelled' ? StepStatus.CANCELLED : StepStatus.NOT_STARTED;
    }

    if (lastLog.step_id === step.id) {
      switch (_runStatus) {
        case 'cancelled':
          return StepStatus.CANCELLED;
        case 'done':
          return StepStatus.DONE;
        default:
          return StepStatus.IN_PROGRESS;
      }
    }

    return StepStatus.DONE;
  }
</script>

<!-- UI representation of the status -->
{#if status == StepStatus.IN_PROGRESS}
  <span class="rounded-full flex items-center justify-center px-1 py-0.5 bg-yellow-100 border border-yellow-300">
    <i class="text-xs fa-solid fa-spinner text-yellow-600 animate-spin" />
  </span>
{:else if status == StepStatus.NOT_STARTED}
  <span class="rounded-full flex flex-col items-center justify-center px-1 py-0.5 bg-slate-100 border border-slate-300">
    <i class="text-xs fa-solid fa-ellipsis text-slate-600" />
  </span>
{:else if status == StepStatus.CANCELLED}
  <span class="rounded-full flex flex-col items-center justify-center px-1 py-0.5 bg-slate-100 border border-slate-300">
    <i class="text-xs fa-solid fa-ban text-slate-600" />
  </span>
{:else}
  <span class="rounded-full flex flex-col items-center justify-center px-1 py-0.5 bg-green-100 border border-green-300">
    <i class=" text-xs fa-solid fa-check text-green-600" />
  </span>
{/if}
