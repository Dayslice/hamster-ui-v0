import { onMount } from 'svelte';

interface HighlightType {
  name: string;
  action: string;
  color: string;
}

interface HighlightMenuOptions {
  types: HighlightType[];
  theme: 'monday' | 'notion' | 'medium' | 'slack';
}

export function highlightMenu(node: HTMLElement, options: HighlightMenuOptions) {
  const { types, theme } = options;
  const menu = document.createElement('div');

  function getMenuWrapperClass() {
    switch (theme) {
      case 'monday':
        return 'bg-white border border-monday-blue-dark shadow-lg';
      case 'notion':
        return 'bg-gray-100 border border-gray-300 shadow-sm';
      case 'medium':
        return 'bg-white border border-gray-300 shadow-md';
      case 'slack':
        return 'bg-white border border-slack-purple-dark shadow-lg';
      default:
        return '';
    }
  }

  function handleMouseUp(event: MouseEvent) {
    const selection = window.getSelection()?.toString().trim();
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
            styleClass = 'bg-monday-blue text-white font-semibold px-4 py-2 rounded-md hover:bg-monday-blue-dark';
            break;
          case 'notion':
            styleClass = 'bg-gray-200 hover:bg-blue-500 text-gray-800 font-light px-3 py-1.5 rounded-sm hover:text-white';
            break;
          case 'medium':
            styleClass = 'bg-transparent border border-black text-black font-medium px-2 py-1 hover:bg-gray-200';
            break;
          case 'slack':
            styleClass = 'bg-slack-purple text-white font-bold px-4 py-2 rounded-md hover:bg-slack-purple-dark';
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
    node.dispatchEvent(new CustomEvent('highlight', { detail: { action, selection } }));
    menu.remove();
  }

  onMount(() => {
    node.addEventListener('mouseup', handleMouseUp);
    menu.addEventListener('click', handleMenuClick);

    return () => {
      menu.remove();
      node.removeEventListener('mouseup', handleMouseUp);
      menu.removeEventListener('click', handleMenuClick);
    };
  });
}
