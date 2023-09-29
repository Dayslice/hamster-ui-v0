<script lang="ts">
  import { SvelteComponent, createEventDispatcher, onDestroy, onMount } from 'svelte';
  import MenuItem from './MenuItem.svelte';
  import type { ContextMenuItem } from './highlightMenu.action';

  export let items: ContextMenuItem[] = [];
  export let position = { top: '0px', left: '0px' };

  const dispatchEvent = createEventDispatcher();

  let menuElement: HTMLDivElement; // reference to the root element
  const outsideClickListener = (event: MouseEvent) => {
    if (!menuElement || menuElement == null) {
      dispatchEvent('close');
    }
    if (!menuElement.contains(event.target as Node) && menuElement != event.target) {
      // If the click was outside the menu, dispatch a custom event

      dispatchEvent('close');
    }
  };
  onMount(() => {
    // This function will handle clicks on the document
    setTimeout(() => {
      document.addEventListener('click', outsideClickListener);
    }, 0);
  });

  // Cleanup listener when the component is destroyed
  onDestroy(() => {
    document.removeEventListener('click', outsideClickListener);
  });
</script>

<div
  bind:this={menuElement}
  style="top: {position.top}; left: {position.left}"
  class="absolute bg-white text-xs p-1.5 px-2.5 rounded border-2 border-gray-200 drop-shadow-sm shadow-gray-200"
>
  <div class="flex flex-row gap-2">
    {#each items as item (item.name)}
      <MenuItem {item} />
    {/each}
  </div>
</div>
