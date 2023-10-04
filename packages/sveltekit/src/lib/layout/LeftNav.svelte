<script lang="ts">
  import logo from '$lib/assets/logo.png';
</script>

<div class="w-64 bg-gray-800 text-white fixed h-screen">
  <div class="flex items-center justify-start h-16 shadow-md px-4">
    <h2 class="text-lg font-semibold flex flex-row gap-1 items-center">
      <img src={logo} alt="Product Logo" class="h-10" /><span class="font-semibold text-amber-400">hive</span><span class="font-bold"
        >AI</span
      >
    </h2>
  </div>
  <ul class="mt-8 space-y-3">
    <li class="px-6 py-2 hover:bg-gray-700">
      <a href="#">Runs</a>
    </li>
    <li class="px-6 py-2 hover:bg-gray-700">
      <a href="#">Workflows</a>
    </li>
    <li class="px-6 py-2 hover:bg-gray-700">
      <a href="#">Agent Directory</a>
    </li>
    <!-- Add more items as needed -->
  </ul>
</div>
