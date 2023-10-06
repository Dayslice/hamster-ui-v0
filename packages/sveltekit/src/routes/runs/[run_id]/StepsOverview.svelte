<script lang="ts">
  import Panel from '$lib/layout/Panel.svelte';
  import AgentMini from '$lib/ui/AgentMini.svelte';

  // Example steps data. This would be fetched or passed as props.
  export let steps: any[] = [];
</script>

<Panel header="Step Overview" class="col-span-1 row-span-2">
  {#if steps}
    <ul>
      {#each steps as step}
        <li class="first:border-t-0 border-t first:pt-0 pt-4 pb-2 flex flex-row justify-between items-center">
          <!-- Step Title and Description -->
          <div class="flex flex-col gap-1">
            <h3 class="font-medium text-lg">{step.label}</h3>
            <span class="underline text-slate-600 text-sm">review step results <i class="text-sm fa-solid fa-arrow-right underline" /></span
            >
          </div>

          <!-- Involved Agents -->
          <AgentMini primary_agent={step.primary_agent} other_agents={step.other_agents} />
        </li>
      {/each}
    </ul>
  {/if}
</Panel>
