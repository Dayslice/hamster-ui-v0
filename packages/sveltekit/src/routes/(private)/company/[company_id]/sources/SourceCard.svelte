<!-- Card.svelte -->
<script lang="ts">
  export let groupedSource: { count: number; contents: string[]; file: string; metadata: Record<string, any> };
</script>

{#if groupedSource}
  <a class="group bg-white shadow-md hover:shadow-lg rounded-lg w-full border border-slate-300">
    <div
      class="p-4 bg-slate-100 border-b rounded-t-lg border-b-slate-200 justify-between flex flex-col md:flex-row gap-1 md:gap-6 items-start"
    >
      <div class="flex flex-row items-start">
        <div class="ml-4">
          <span class="text-lg font-semibold lead-snug">{groupedSource.file}</span>
        </div>
      </div>
    </div>
    <div class="p-4 flex flex-col gap-2 leading-relaxed">></div>
  </a>
{/if}
