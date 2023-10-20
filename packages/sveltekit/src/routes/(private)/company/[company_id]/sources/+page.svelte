<script lang="ts">
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import { fetchCompany } from '$lib/utils/fetchLogs';

  import { formatCasualDateTime } from '$lib/utils/formatters/date.formatter';
  import { goto } from '$app/navigation';
  import Status from '$lib/ui/Status.svelte';
  import Panel from '$lib/layout/Panel.svelte';
  import sourceService from '$lib/utils/api/sourceService';
  import type { Source } from '$entities/source.entity';
  import SourceCard from './SourceCard.svelte';
  let company_id: string = $page.params.company_id;
  let company: any;
  let sources: Source[] = [];
  let groupedSources: Record<string, { count: number; contents: string[]; file: string; metadata: Record<string, any> }> = {};
  onMount(async () => {
    company = await fetchCompany(company_id);
    sources = await sourceService.getManyForCompany(company_id);
    groupedSources = sources.reduce((acc: any, chunk) => {
      const original = chunk.metadata.original;
      if (!acc[original]) {
        acc[original] = {
          count: 1,
          contents: [chunk.content],
          file: chunk.contentUrl,
          metadata: chunk.metadata,
        };
      } else {
        acc[original].count += 1;
        acc[original].contents.push(chunk.content);
      }
      return acc;
    }, {});
    console.log(groupedSources);
  });
</script>

<div class="px-16 py-10 border-slate-300 flex flex-row gap-12 bg-white items-start">
  <h1 class="text-2xl font-semibold mb-4">Data Sources</h1>
  <div class="grid grid-cols-1 xl:grid-cols-2 gap-8 mx-auto">
    {#if groupedSources}
      {#each Object.keys(groupedSources) as groupedSource}
        <SourceCard groupedSource={groupedSources[groupedSource]} />
      {/each}
    {/if}
  </div>
</div>
