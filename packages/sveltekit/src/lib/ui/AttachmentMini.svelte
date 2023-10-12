<script lang="ts">
  import type { Attachment } from '$entities/attachment.entity';
  import { extractFilename } from '$lib/utils/tools';

  export let attachment: Attachment;
</script>

<a href={attachment.url} target="_blank" class="p-2 text-xs bg-white transition-all duration-200 flex items-center space-x-2">
  <i class="text-xs text-slate-700 fa-regular fa-paperclip" />
  <span class=" text-slate-700 hover:underline">{attachment.label}</span>
</a>
