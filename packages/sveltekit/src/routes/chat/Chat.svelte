<script lang="ts">
  import ChatArea from './ChatArea.svelte';
  import Sidebar from './Sidebar.svelte';
  import { writable } from 'svelte/store';
  // Dark mode store
  export const darkMode = writable<boolean>(false);
</script>

<div class="bg-white h-screen flex dark:bg-gray-800">
  <Sidebar {darkMode} />
  <ChatArea />
</div>
