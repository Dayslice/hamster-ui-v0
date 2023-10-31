<script>
  import { Edge } from 'svelvet';
</script>

<Edge let:path edgeClick={() => alert('Edge clicked')} step straight cornerRadius={30} animate={false} width={3} color={'#475569'} />

<style>
  :global(path) {
    shape-rendering: 'geometricPrecision';
  }
</style>
