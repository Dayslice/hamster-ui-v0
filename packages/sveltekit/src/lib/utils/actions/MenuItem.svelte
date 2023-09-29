<script lang="ts">
  import type { ContextMenuItem, HighlightType } from './highlightMenu.action';

  export let item: ContextMenuItem;

  function handleClick() {
    item.onSelect(item);
  }
</script>

<button type="button" class={`cursor-pointer text-${item.color}-400`} on:click={handleClick} title={item.name}>
  <i class={item.icon} />
</button>
