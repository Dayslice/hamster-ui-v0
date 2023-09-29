<script lang="ts">
  import { onMount } from 'svelte';
  import LogEntry from './LogEntry.svelte';
  import type { LogData } from './logger.types';
  import type { Writable } from 'svelte/store';
  import { fetchLogs } from '$lib/utils/fetchLogs';
  export let data: LogData[] = [];
  export let store: Writable<{ count: number }>;
  let isLoading: boolean = true;
  let error: string | null = null;
  let isRefreshing: boolean = true;
  let refreshInterval: NodeJS.Timer;
  let countdownInterval: NodeJS.Timer;
  let refreshTime: number = 15;
  let countdown = refreshTime;

  async function loadLogs() {
    try {
      let logs = await fetchLogs();
      countdown = refreshTime; // Reset the countdown after fetching
      $store.count = logs.length;
      makeEmojiMap(logs);
      data = logs;
    } catch (e: any) {
      error = e.message;
    } finally {
      isLoading = false;
    }
  }

  onMount(() => {
    loadLogs(); // Initial load

    // Set up the interval
    refreshInterval = setInterval(() => {
      if (isRefreshing) {
        loadLogs();
      }
    }, refreshTime * 1000);

    // Set up the interval for countdown
    countdownInterval = setInterval(() => {
      if (isRefreshing && countdown > 0) {
        countdown--;
      }
    }, 1000);

    return () => {
      if (refreshInterval) {
        clearInterval(refreshInterval); // Cleanup
      }
      if (countdownInterval) {
        clearInterval(countdownInterval); // Cleanup
      }
    };
  });

  function toggleRefresh() {
    isRefreshing = !isRefreshing;
    if (!isRefreshing) {
      countdown = refreshTime; // Reset the countdown when stopped
    }
  }

  // Array of emojis for chat speakers.
  const chatEmojis: string[] = ['🙂', '😀', '😄', '😁', '😆'];
  let speakerEmojiMap = new Map<string, string>();

  const makeEmojiMap = (logs: LogData[]) => {
    let index = 0;
    for (const log of logs) {
      if (log.type === 'chat' && log.speaker && !speakerEmojiMap.has(log.speaker)) {
        speakerEmojiMap.set(log.speaker, chatEmojis[index % chatEmojis.length]);
        index++;
      }
    }
  };

  // Create a mapping of speaker to emoji based on the order they appear.
</script>

<div class="p-12 flex flex-col gap-1 text-center items-center">
  <h1 class="text-3xl font-semibold text-slate-700 dark:text-gray-200">Hamster Logger</h1>
  <div class="flex flex-col gap-1">
    <p class="text-slate-500 font-bold">{$store.count} logs in this run</p>

    <button type="button" class="text-gray-300 text-xs underline" on:click={toggleRefresh}>
      ({isRefreshing ? `refreshing in ${countdown} sec` : 'enable auto-refresh'})
    </button>
  </div>
</div>
{#if isLoading}
  <p>Loading...</p>
{:else if error}
  <p class="text-red-500">{error}</p>
{:else}
  {#each data as log}
    {#if log.type === 'task'}
      <LogEntry icon="📋" colorName="blue" title="Task" content={log.content} />
    {:else if log.type === 'internal_thought'}
      <LogEntry icon="💭" colorName="yellow" title="{log.speaker}: [INTERNAL THOUGHT]" content={`"${log.content}"`} />
    {:else if log.type === 'solution'}
      <LogEntry icon="✅" colorName="green" title="Solution" content={log.content} />
    {:else if log.type === 'chat'}
      <LogEntry
        icon={speakerEmojiMap.get(log.speaker ?? '') ?? null}
        colorName="red"
        title="{log.speaker}{log.receiver ? ` to ${log.receiver}` : ''}:"
        content={log.content}
      />
    {:else if log.type === 'tool'}
      <LogEntry icon="🛠️" colorName="gray" title="{log.speaker} used a tool:" content={log.content} />
    {/if}
  {/each}
{/if}
