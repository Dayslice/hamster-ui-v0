import ContextMenu from './ContextMenu.svelte';

export interface HighlightType {
  name: string;
  icon: string;
  action: string;
  color: string;
}

export interface ContextMenuItem extends HighlightType {
  onSelect: CallableFunction;
}

export interface HighlightMenuOptions {
  types: HighlightType[];
}

export function highlightMenu(node: HTMLElement, options: HighlightMenuOptions) {
  const { types } = options;
  let menu: ContextMenu | undefined;
  let target: EventTarget | null = null;
  let selectedText: string | null = null;

  function showMenu(event: MouseEvent) {
    const selection = window.getSelection();

    if (!selection?.toString().trim()) {
      return; // Exit if there's no highlighted text
    }
    if (menu && selection?.toString().trim() != selectedText) {
      menu.$destroy();
    }

    if (!isSelectionWithinNode(selection, node)) {
      // If the selection is outside the node, adjust the range
      const range = selection.getRangeAt(0);
      adjustRange(range, node);

      // If the adjusted range is empty, exit the function
      if (!range.toString().trim()) {
        return;
      }

      // Update the selection with the adjusted range
      selection.removeAllRanges();
      selection.addRange(range);
    }

    selectedText = selection?.toString().trim();
    const range = window.getSelection()?.getRangeAt(0);
    target = event.target;

    console.log(target);
    const rect = range?.getBoundingClientRect();
    const menuTop = rect ? rect?.bottom + window.scrollY : 0;
    const menuLeft = rect ? rect?.left + window.scrollX : 0;

    menu = new ContextMenu({
      target: document.body, // You can append to other elements if required
      props: {
        items: types.map((type) => ({
          ...type,
          onSelect: (selected_type: HighlightType) => {
            // Handle the action for the menu item click
            handleMenuClick(selected_type);
            if (menu) {
              menu.$destroy(); // Clean up after action
              menu = undefined;
            }
          },
          onClose: () => {
            if (menu) {
              menu.$destroy();
              menu = undefined;
            }
          },
        })),
        position: { top: `${menuTop}px`, left: `${menuLeft}px` },
      },
    });
    menu.$on('close', () => {
      menu ? menu.$destroy() : null;
    });
  }

  function handleMenuClick(type: HighlightType) {
    const selection = window.getSelection()?.toString();
    applyHighlight(type);
    node.dispatchEvent(new CustomEvent('highlight', { detail: { type, selection } }));
    if (menu) {
      menu.$destroy();
    }
  }

  function adjustRange(range: Range, node: Node) {
    // If the startContainer is outside the node, set it to the beginning of the node
    if (!node.contains(range.startContainer)) {
      range.setStart(node, 0);
    }

    // If the endContainer is outside the node, set it to the end of the node
    if (!node.contains(range.endContainer)) {
      range.setEnd(node, node.childNodes.length);
    }
  }

  function isSelectionWithinNode(selection: Selection, node: Node): boolean {
    const range = selection.getRangeAt(0);
    return node.contains(range.startContainer) && node.contains(range.endContainer);
  }

  function applyHighlight(type: HighlightType) {
    const selection = window.getSelection();

    if (type.action && selection && selection.rangeCount) {
      const range = selection.getRangeAt(0).cloneRange();

      if (!isSelectionWithinNode(selection, node)) return; // Ensure the selection is within our element
      adjustRange(range, node);

      const span = document.createElement('span');
      span.classList.add(`bg-${type.color}-100`, 'cursor-pointer'); // Getting the color directly from the clicked button.
      range.surroundContents(span);
      selection.removeAllRanges();
    }
  }

  node.addEventListener('mouseup', showMenu);

  return {
    destroy() {
      node.removeEventListener('mouseup', showMenu);
    },
  };
}
