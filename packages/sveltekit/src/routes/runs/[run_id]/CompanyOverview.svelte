<script lang="ts">
  import type { Company } from '$entities/company.entity';
  import Panel from '$lib/layout/Panel.svelte';
  let classList = '';
  export { classList as class };
  export let company: Company;
  // You may want to import any icons from a library like FontAwesome or Heroicons
</script>

<Panel class={classList} contentClass="text-slate-800">
  <div class="flex flex-col gap-.5 lg:flex-row lg:gap-4 lg:items-start">
    <img class="w-12 h-12 rounded-full aspect-square border-2 border-slate-100" alt="{company.label} logo" src={company.logo_url} />
    <span class="flex flex-col gap-1">
      <div class="font-semibold text-slate-800">{company.label}</div>
      <span class="text-sm">{company.elevator_pitch}</span>
    </span>
  </div>
  <!-- Workflow Name -->
</Panel>
