<script lang="ts">
  import { fetchLogs } from '$lib/utils/fetchLogs';
  import { onMount } from 'svelte';
  import SvelteMarkdown from 'svelte-markdown';
  import { DateTime } from 'luxon';
  import { highlightMenu, type HighlightType } from '$lib/utils/actions/highlightMenu.action';
  let activeChannel = 'SEO Research';
  let messages: any = [];

  onMount(async () => {
    messages = await fetchLogs();
  });
  let chatThread: HTMLElement;

  function scrollToBottom() {
    chatThread.scrollTop = chatThread.scrollHeight;
  }

  // Handle the action click
  function handleAction(callback: () => void) {
    callback();
  }

  function formatDateZuluToLocal(zuluTimestamp: string): string {
    const inputDate = DateTime.fromISO(zuluTimestamp);
    const today = DateTime.local();

    if (inputDate.hasSame(today, 'day')) {
      // If it's today, format as time only
      return inputDate.toLocaleString(DateTime.TIME_SIMPLE);
    } else {
      // If it's not today, format as "M/D, h:mm a"
      return inputDate.toLocaleString({ month: 'numeric', day: 'numeric' }) + ', ' + inputDate.toLocaleString(DateTime.TIME_SIMPLE);
    }
  }

  function extractFilename(path: string): string {
    const parts = path.split('/');
    return parts[parts.length - 1];
  }

  const highlightTypes: Array<HighlightType> = [
    { name: 'Ignore', action: 'ignore', color: 'red', icon: 'fa-solid fa-triangle-exclamation' },
    { name: 'Focus', action: 'focus', color: 'green', icon: 'fa-solid fa-star' },
    { name: 'Bookmark', action: 'bookmark', color: 'blue', icon: 'fa-solid fa-bookmark' },
  ];

  let theme = 'monday'; // can be "notion", "medium", or "slack"

  function handleHighlight(event: Event) {
    // Handle the highlight action and selected text
    const { action, selection } = (<CustomEvent>event).detail;
    console.log(`Action: ${action}, Selection: ${selection}`);
  }
</script>

<div class="flex-1 flex flex-col">
  <!-- Chat Header -->
  <div class="bg-white border-b p-4 dark:bg-gray-700 bg-gradient-to-l from-slate-200 to-slate-100">
    <div class="font-bold text-lg">#{activeChannel}</div>
  </div>

  <!-- Chat Thread -->
  <div bind:this={chatThread} class="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
    {#each messages as message}
      <div class="mb-4 flex items-start">
        <img
          src="https://api.dicebear.com/7.x/personas/svg?seed={'' + message.speaker || '' + 'Colleen'}"
          alt="{message.speaker || 'System'} Avatar"
          class="rounded-full mr-3 w-10 h-10"
        />
        <div>
          <div class="font-semibold">
            {message.speaker || 'Colleen'} <span class="text-gray-500 text-xs">{formatDateZuluToLocal(message.timestamp)}</span>
          </div>
          <div class="markdown-body text-sm" use:highlightMenu={{ types: highlightTypes }} on:highlight={handleHighlight}>
            <SvelteMarkdown options={{ breaks: true }} source={message.content} />
          </div>
          {#each message.attachments as attachment}
            <a
              href="file:/{attachment.filename}"
              target="_blank"
              class="block ml-4 mt-4 p-2 text-sm rounded-md shadow-md bg-slate-50 border border-slate-200 hover:shadow-lg hover:bg-gray-50 transition-all duration-200 flex items-center space-x-2"
            >
              <img src="paper-clip.png" class="opacity-60 w-6" />
              <span class="font-medium text-indigo-500 hover:underline"
                >{attachment.label} <span class="text-slate-400 text-sm">{extractFilename(attachment.filename)}</span></span
              >
            </a>
          {/each}
          {#if message.actions}
            <div class="mt-3 flex flex-row gap-1 items-center justify-start text-left p-3 transition-all duration-200 space-x-2">
              <div class="space-x-2">
                {#each message.actions as action}
                  <button
                    class="py-1 px-3 bg-gray- text-indigo-400 border border-indigo-500 rounded-full bg-white hover:bg-indigo-600 hover:text-white"
                    on:click={() => handleAction(action.callback)}
                  >
                    {action.label}
                  </button>
                {/each}
              </div>
            </div>
          {/if}
        </div>
      </div>
    {/each}
  </div>
  <button on:click={scrollToBottom} class=" hidden p-2 rounded bg-blue-500 text-white">Scroll to Bottom</button>
  <!-- Input Area -->
  <div class="border-t p-4">
    <input type="text" placeholder="Type a message..." class="w-full p-2 border rounded-lg shadow-md dark:bg-gray-600 dark:text-white" />
  </div>
</div>

<style>
</style>
