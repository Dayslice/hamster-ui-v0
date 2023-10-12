<script lang="ts">
  import type { Attachment } from '$entities/attachment.entity';
  import { extractFilename } from '$lib/utils/tools';

  export let attachment: Attachment;
</script>

<a
  href={attachment.url}
  target="_blank"
  class="w-fit mt-4 mb-2 p-2 px-4 text-sm rounded-md bg-emerald-500 border border-emerald-700 hover:shadow-md hover:bg-emerald-600 transition-all duration-200 flex items-center space-x-2"
>
  <i class="text-xs text-white fa-solid fa-download" />
  <span class="font-medium text-white">{attachment.label}</span>
</a>
