<script lang="ts">
  import type { Attachment } from '$entities/attachment.entity';
  import { extractFilename } from '$lib/utils/tools';

  export let attachment: Attachment;
</script>

<a
  href="file:/{attachment.url}"
  target="_blank"
  class="w-fit mt-4 mb-2 p-2 text-sm rounded-md bg-slate-50 border border-slate-300 hover:shadow-md hover:bg-gray-50 transition-all duration-200 flex items-center space-x-2"
>
  <i class="text-xs text-slate-700 fa-regular fa-paperclip" />
  <span class="font-medium text-slate-700"
    >{attachment.label} <span class="text-slate-400 text-sm">{extractFilename(attachment.url)}</span></span
  >
</a>
