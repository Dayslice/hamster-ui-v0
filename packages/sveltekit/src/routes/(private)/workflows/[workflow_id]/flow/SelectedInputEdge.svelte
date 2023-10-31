<script>
  import { Edge } from 'svelvet';
</script>

<Edge let:path edgeClick={() => alert('Edge clicked')} step>
  <path d={path} class="stroke-emerald-500 opacity-40" />
</Edge>

<style>
  path {
    stroke-width: 2px;
  }
</style>
