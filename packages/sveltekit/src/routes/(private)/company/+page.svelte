<script lang="ts">
  import type { Company } from '$entities/company.entity';
  import Breadcrumbs from '$lib/layout/Breadcrumbs.svelte';
  import companyService from '$lib/utils/api/companyService';
  import { onMount } from 'svelte';
  import CompanyCard from './CompanyCard.svelte';

  let companies: Company[] = [];
  let newCompany: Partial<Company> = {
    label: '',
    description: '',
    business_goals: '',
    elevator_pitch: '',
    communication_style_id: 'a20135b3-da94-4682-ab43-725ae53831d1',
    url: '',
    metadata: { competitors: { url: '', name: '' } },
  };

  let breadcrumbs: { label: string; url: string }[] = [{ label: 'Companies', url: '/companies' }];

  onMount(async () => {
    companies = await companyService.getMany();
  });

  async function createCompany() {
    const createdCompany = await companyService.create(newCompany);
    companies = [...companies, createdCompany];
    newCompany = {
      label: '',
      description: '',
      business_goals: '',
      elevator_pitch: '',
      communication_style_id: 'a20135b3-da94-4682-ab43-725ae53831d1',
      url: '',
      metadata: { competitors: { url: '', name: '' } },
    };
  }
</script>

<Breadcrumbs {breadcrumbs} />
<div class="p-12 py-6 bg-white">
  <h1 class="text-2xl font-semibold mb-4">Companies</h1>
  <div class="grid grid-cols-1 xl:grid-cols-2 gap-8 mx-auto">
    {#each companies as company}
      <CompanyCard {company} />
    {/each}
  </div>

  <div class="mt-10 px-6 py-4 bg-white border-t border-t-slate-200">
    <h2 class="text-xl text-slate-800 font-semibold mb-6">Create New Company</h2>
    <form on:submit|preventDefault={createCompany} class="space-y-4">
      <div>
        <label for="label" class="block text-sm font-medium text-gray-600 mb-1">Label</label>
        <input id="label" class="w-full border border-gray-300 p-2 rounded" bind:value={newCompany.label} placeholder="Label" />
      </div>
      <div>
        <label for="logo_url" class="block text-sm font-medium text-gray-600 mb-1">Logo Url</label>
        <input id="logo_url" class="w-full border border-gray-300 p-2 rounded" bind:value={newCompany.logo_url} placeholder="Logo URL" />
      </div>
      <div>
        <label for="description" class="block text-sm font-medium text-gray-600 mb-1">Description</label>
        <textarea
          id="description"
          class="w-full border border-gray-300 p-2 rounded"
          bind:value={newCompany.description}
          placeholder="Description"
        />
      </div>

      <div>
        <label for="business_goals" class="block text-sm font-medium text-gray-600 mb-1">Business Goals</label>
        <textarea
          id="business_goals"
          class="w-full border border-gray-300 p-2 rounded"
          bind:value={newCompany.business_goals}
          placeholder="Business Goals"
        />
      </div>

      <div>
        <label for="elevator_pitch" class="block text-sm font-medium text-gray-600 mb-1">Elevator Pitch</label>
        <textarea
          id="elevator_pitch"
          class="w-full border border-gray-300 p-2 rounded"
          bind:value={newCompany.elevator_pitch}
          placeholder="Elevator Pitch"
        />
      </div>

      <div>
        <label for="url" class="block text-sm font-medium text-gray-600 mb-1">URL</label>
        <input id="url" class="w-full border border-gray-300 p-2 rounded" bind:value={newCompany.url} placeholder="URL" />
      </div>

      <!-- Add any other fields here with similar pattern -->

      <div class="flex justify-between items-center mt-4">
        <button type="submit" class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 active:bg-blue-800"> Create </button>
        <!-- Add any other action buttons here -->
      </div>
    </form>
  </div>
</div>
