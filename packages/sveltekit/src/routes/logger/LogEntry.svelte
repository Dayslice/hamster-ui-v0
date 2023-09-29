<script lang="ts">
  import type { LogEntryProps } from './logger.types';
  import SvelteMarkdown from 'svelte-markdown';

  export let icon: LogEntryProps['icon'];
  export let colorName: LogEntryProps['colorName'];
  export let title: LogEntryProps['title'];
  export let content: LogEntryProps['content'];
</script>

<div class={`bg-white dark:drop-shadow dark:bg-slate-800 dark:border-none p-6 border border-gray-200 rounded-lg flex items-center w-full`}>
  <div class="flex-grow flex flex-col items-start gap-3">
    <div class="flex flex-row gap-2 items-center">
      <div
        class={`rounded-full px-2 py-0.5 border-2 text-${colorName}-600 border-${colorName}-300 dark:border-none bg-${colorName}-100 dark:bg-${colorName}-400 dark:text-${colorName}-900 text-xxs uppercase  font-bold`}
      >
        {icon}
        {title}
      </div>
    </div>
    <div class=" text-gray-900 dark:text-gray-200 markdown-body">
      <SvelteMarkdown source={content} />
    </div>
  </div>
</div>
