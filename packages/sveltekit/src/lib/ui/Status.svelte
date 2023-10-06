<script lang="ts">
  export let status: string;
</script>

<span
  class:text-emerald-200={status == 'done'}
  class:bg-emerald-600={status == 'done'}
  class:bg-amber-200={status == 'running'}
  class:text-amber-600={status == 'running'}
  class:bg-red-200={status == 'failed'}
  class:text-red-600={status == 'failed'}
  class:bg-slate-200={status == 'cancelled'}
  class:text-slate-600={status == 'cancelled'}
  class="text-xs px-2 py-0.5 rounded-xl font-semibold">{status}</span
>
