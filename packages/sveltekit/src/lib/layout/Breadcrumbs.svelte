<script lang="ts">
  export let breadcrumbs: { url: string; label: string }[] = [];

  const homeIcon = `
      <path fill-rule="evenodd" d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z" clip-rule="evenodd" />
    `;

  const arrowIcon = `
      <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
    `;
</script>

<nav class="flex border-b border-gray-200 bg-white" aria-label="Breadcrumb">
  <ol role="list" class="mx-auto flex w-full max-w-screen-xl space-x-4 px-4 sm:px-6 lg:px-8">
    {#each breadcrumbs as breadcrumb, i}
      <li class="flex">
        <a class="flex items-center text-gray-500 hover:text-gray-700" href={breadcrumb.url}>
          {#if i == 0}
            <i class="mr-2 fa-solid fa-house text-xs" />
          {:else}
            <i class="mr-6 fa-light fa-chevron-right" />
          {/if}
          <span class="text-sm font-medium">{breadcrumb.label}</span>
        </a>
      </li>
    {/each}
  </ol>
</nav>
