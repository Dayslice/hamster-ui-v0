<script lang="ts">
  export let status: string;
</script>

<span
  class:text-emerald-600={status == 'done'}
  class:bg-emerald-100={status == 'done'}
  class:border-emerald-300={status == 'done'}
  class:bg-yellow-100={status == 'running'}
  class:text-yellow-600={status == 'running'}
  class:border-yellow-300={status == 'running'}
  class:bg-red-100={status == 'error'}
  class:text-red-600={status == 'error'}
  class:border-red-300={status == 'error'}
  class:bg-slate-100={status == 'cancelled'}
  class:text-slate-600={status == 'cancelled'}
  class:border-slate-300={status == 'cancelled'}
  class="text-xs px-2 py-0.5 rounded-xl font-semibold border">{status}</span
>
