<script lang="ts">
  import type { Agent } from '$entities/agent.entity';

  export let primary_agent: Agent;
  export let other_agents: Agent[];
</script>

<div class="flex -space-x-2">
  <img src={primary_agent.avatar_url} alt={primary_agent.name} class="w-6 h-6 rounded-full" />
  {#if other_agents}
    {#each other_agents as agent}
      <img src={agent.avatar_url} alt={agent.name} class="w-6 h-6 rounded-full" />
    {/each}
  {/if}
</div>
