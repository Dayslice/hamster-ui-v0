<!-- Card.svelte -->
<script lang="ts">
  import type { Company } from '$entities/company.entity';

  export let company: Company;
</script>

{#if company}
  <a class="group bg-white shadow-md hover:shadow-lg rounded-lg w-full border border-slate-300" role="button" href="/company/{company.id}">
    <div class="p-4 bg-slate-100 border-b border-b-slate-200 justify-between flex flex-col md:flex-row gap-1 md:gap-6 items-start">
      <div class="flex flex-row items-start">
        <img class="w-16 h-16 rounded-full border-2" alt="{company.label} logo" src={company.logo_url} />
        <div class="ml-4">
          <span class="text-lg font-semibold lead-snug">{company.label}</span>
          <p class="text-xs">{company.elevator_pitch.substring(0, 160)}{company.elevator_pitch.length > 160 ? '...' : ''}</p>
        </div>
      </div>
    </div>
    <div class="p-4 flex flex-col gap-2 leading-relaxed">
      <span class="font-semibold text-sm">Company Overview</span>
      <p class="text-xs">{company.description.substring(0, 340)}{company.description.length > 340 ? '...' : ''}</p>
      <span class="font-semibold text-sm">Business Objectives</span>
      <p class="text-xs">{company.business_goals}</p>
    </div>
  </a>
{/if}
