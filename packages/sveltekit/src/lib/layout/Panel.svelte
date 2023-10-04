<script lang="ts">
  export let header: string | null = null;
  let classList = '';
  export { classList as class };
  export let contentClass = '';
</script>

<section class="flex flex-col gap-6 bg-white py-6 p-6 rounded-lg border border-slate-200 shadow-shallow {classList}">
  {#if header}
    <header>
      <h2 class="font-sans leading-tight text-xl font-semibold text-slate-800 border-b border-slate-200 pb-1">{header}</h2>
    </header>
  {/if}
  <div class={contentClass}>
    <slot />
  </div>
</section>
