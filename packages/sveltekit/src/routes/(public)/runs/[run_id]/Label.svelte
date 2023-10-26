<script lang="ts">
  import type { Run } from '$entities/run.entity';
  import runService from '$lib/utils/api/runService';

  export let run: Run;
  export let initialLabel: string;

  enum LabelStates {
    VIEWING = 'viewing',
    EDITING = 'editing',
  }

  let labelState: LabelStates = LabelStates.VIEWING;

  const saveTitle = async () => {
    // Assuming you'll have a method to update the label in your service
    if (run.label != initialLabel) {
      run = await runService.update(run.id, { label: initialLabel }); // Adjust this method according to your API
    }
    initialLabel = run.label;
    labelState = LabelStates.VIEWING;
  };
</script>

{#if labelState === LabelStates.VIEWING}
  <div class="flex flex-row gap-1 items-center">
    <span class="font-medium text-xl text-slate-800">
      {initialLabel}
    </span>
    <i class=" text-slate-700 fa-solid fa-pencil text-xxs cursor-pointer ml-2" on:click={() => (labelState = LabelStates.EDITING)} />
  </div>
{:else}
  <div class="w-full">
    <input
      bind:value={initialLabel}
      class="w-full font-medium text-xl text-slate-800 border-b focus:border-blue-400"
      on:blur={saveTitle}
      on:keydown={(e) => e.key === 'Enter' && saveTitle()}
    />
  </div>
{/if}
