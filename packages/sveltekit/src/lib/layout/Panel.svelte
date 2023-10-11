<script lang="ts">
  export let header: string | null = null;
  let classList = '';
  export { classList as class };
  export let contentClass = '';
</script>

<section class="flex flex-col gap-6 bg-white py-4 p-6 rounded-lg border border-slate-200 shadow-shallow {classList}">
  {#if header}
    <header class="flex flex-row justify-between items-end border-b border-slate-200 pb-2">
      <h2 class="font-sans leading-tight text-xl font-semibold text-slate-800">{header}</h2>
      <slot name="actions" />
    </header>
  {/if}
  <div class={contentClass}>
    <slot />
  </div>
</section>
