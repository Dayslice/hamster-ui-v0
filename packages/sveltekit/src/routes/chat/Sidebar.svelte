<script lang="ts">
  export let darkMode;
  let channels = ['SEO Research', 'Content Calendar'];
  let dms = ['User A', 'User B'];
  let activeChannel = 'SEO Research';
  let unreadMessages: Record<string, number> = { 'Content Calendar': 3, 'SEO Research': 2 }; // Dummy data for notifications
</script>

<div class="bg-white w-1/4 p-4 border-r dark:bg-gray-700 bg-gradient-to-r from-slate-200 to-slate-100">
  <div class="font-semibold text-xl mb-4 text-indigo-600">Hamster Marketing, Inc.</div>
  <div class="mb-4">
    <div class="font-semibold text-lg mb-2">Projects 📂</div>
    <ul>
      {#each channels as channel}
        <li
          class:bg-indigo-200={channel === activeChannel}
          class:font-semibold={channel === activeChannel}
          class="py-1 px-2 dark:hover:bg-gray-600 transition-transform transform hover:scale-105 hover:bg-indigo-100 rounded"
        >
          #{channel}
          {#if unreadMessages[channel]}
            <span class="bg-red-500 text-white text-xs rounded-full px-2 ml-2">{unreadMessages[channel]}</span>
          {/if}
        </li>
      {/each}
    </ul>
  </div>
</div>

<style>
  /* Specific styles for the sidebar can go here. */
</style>
