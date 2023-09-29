import { onMount } from 'svelte';

export interface HighlightType {
  name: string;
  action: string;
  color: string;
}

export interface HighlightMenuOptions {
  types: HighlightType[];
  theme: string | 'monday' | 'notion' | 'medium' | 'slack';
}

export function highlightMenu(node: HTMLElement, options: HighlightMenuOptions) {
  const { types, theme } = options;
  const menu = document.createElement('div');

  function getMenuWrapperClass() {
    switch (theme) {
      case 'monday':
        return 'bg-white border border-blue-800 shadow-lg';
      case 'notion':
        return 'bg-gray-100 border border-gray-300 shadow-sm';
      case 'medium':
        return 'bg-white border border-gray-300 shadow-md';
      case 'slack':
        return 'bg-white border border-purple-800 shadow-lg';
      default:
        return '';
    }
  }

  function handleMouseUp(event: MouseEvent) {
    const selection = window.getSelection()?.toString().trim();
    console.log('hello', selection);
    if (!selection) return;

    const range = window.getSelection()?.getRangeAt(0);
    const rect = range?.getBoundingClientRect();
    const menuTop = rect ? rect?.bottom + window.scrollY : 0;
    const menuLeft = rect ? rect?.left + window.scrollX : 0;

    const menuItems = types
      .map((type) => {
        let styleClass = '';
        switch (theme) {
          case 'monday':
            styleClass = 'bg-blue-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-800';
            break;
          case 'notion':
            styleClass = 'bg-gray-200 hover:bg-blue-500 text-gray-800 font-light px-3 py-1.5 rounded-sm hover:text-white';
            break;
          case 'medium':
            styleClass = 'bg-transparent border border-black text-black font-medium px-2 py-1 hover:bg-gray-200';
            break;
          case 'slack':
            styleClass = 'bg-purple-600 text-white font-bold px-4 py-2 rounded-md hover:bg-purple-800';
            break;
        }
        return `<button class="${styleClass} m-2 transition duration-300 ease-in-out" data-action="${type.action}">
                        ${type.name}
                    </button>`;
      })
      .join('');

    menu.innerHTML = `
            <div class="${getMenuWrapperClass()} p-2 rounded-md absolute" style="top:${menuTop}px; left:${menuLeft}px;">
                ${menuItems}
            </div>`;
    document.body.appendChild(menu);
  }

  function handleMenuClick(event: MouseEvent) {
    if (!(event.target instanceof HTMLElement) || !event.target.dataset.action) return;

    const action = event.target.dataset.action;
    const selection = window.getSelection()?.toString();
    applyHighlight(event);
    node.dispatchEvent(new CustomEvent('highlight', { detail: { action, selection } }));
    menu.remove();
  }

  function applyHighlight(event: Event) {
    const target = event.target as HTMLElement;
    const selection = window.getSelection();
    const action = target.getAttribute('data-action');

    if (action && selection && selection.rangeCount) {
      const range = selection.getRangeAt(0);
      const span = document.createElement('span');
      span.classList.add('bg-green-100', 'cursor-pointer'); // Getting the color directly from the clicked button.
      range.surroundContents(span);
      selection.removeAllRanges();
    }
  }

  const init = () => {
    console.log('hel');
    node.addEventListener('mouseup', handleMouseUp);
    menu.addEventListener('click', handleMenuClick);

    return () => {
      menu.remove();
      node.removeEventListener('mouseup', handleMouseUp);
      menu.removeEventListener('click', handleMenuClick);
    };
  };

  init();
}
