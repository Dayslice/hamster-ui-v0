<script lang="ts">
  import Panel from '$lib/layout/Panel.svelte';

  interface Agent {
    id: string;
    name: string;
    expertise: string;
    title: string;
    background_short: string;
    avatar_url: string;
    [key: string]: any;
  }

  interface Step {
    primary_agent: Agent;
    other_agents: Agent[];
    [key: string]: any;
  }

  export let steps: any[];

  function getUniqueAgents(steps: Step[]): Agent[] {
    if (!steps) {
      return [];
    }
    const uniqueAgentsMap: { [key: string]: Agent } = {};

    for (const step of steps) {
      // Add primary agent if not in map
      if (!uniqueAgentsMap[step.primary_agent.id]) {
        uniqueAgentsMap[step.primary_agent.id] = step.primary_agent;
      }

      // Loop through other agents and add them if not in map
      for (const agent of step.other_agents) {
        if (!uniqueAgentsMap[agent.id]) {
          uniqueAgentsMap[agent.id] = agent;
        }
      }
    }

    // Convert map values to an array
    return Object.values(uniqueAgentsMap);
  }

  // Example agents data. You'll likely fetch this from an API or pass it as props.
  $: agents = getUniqueAgents(steps);
</script>

<Panel header="Workflow Roster" class="col-span-1 row-span-4">
  <ul>
    {#each agents as agent}
      <li class="flex flex-col gap-2 items-left last:mb-0 px-4 first:pt-0 py-4 border-b border-b slate-50 last:border-b-0">
        <div class="flex flex-row items-center">
          <img src={agent.avatar_url} alt={agent.name} class="w-14 h-14 rounded-full mr-3" />

          <!-- Name and Role -->
          <div>
            <div class="font-semibold text-slate-800">{agent.name}</div>
            <div class="text-sm text-slate-700">{agent.title}</div>
          </div>
        </div>
        <!-- Avatar -->
        <div class="flex flex-wrap gap-x-2 gap-y-1 items-center">
          <span class="text-xs text-slate-700 pl-1">skills:</span>
          {#each agent.expertise[0].split(', ') as expertise}
            <span class="bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded-full">{expertise}</span>
          {/each}
        </div>
      </li>
    {/each}
  </ul>
</Panel>
