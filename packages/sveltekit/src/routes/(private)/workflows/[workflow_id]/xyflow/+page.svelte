<script lang="ts">
  import { writable } from 'svelte/store';
  import { SvelteFlow, Controls, Background, BackgroundVariant, MiniMap } from '@xyflow/svelte';

  // you need to import the styles for Svelte Flow to work
  // if you just want to load the basic styleds, you can import '@xyflow/svelte/dist/base.css'
  import '@xyflow/svelte/dist/style.css';

  // We are using writables for the nodes and edges to sync them easily. When a user drags a node for example, Svelte Flow updates its position.
  // This also makes it easier to update nodes in user land.
  const nodes = writable([
    {
      id: '1',
      type: 'input',
      data: { label: 'Input Node' },
      position: { x: 0, y: 0 },
    },
    {
      id: '2',
      type: 'custom',
      data: { label: 'Node' },
      position: { x: 0, y: 150 },
    },
  ]);

  // same for edges
  const edges = writable([
    {
      id: '1-2',
      type: 'default',
      source: '1',
      target: '2',
      label: 'Edge Text',
    },
  ]);
</script>

<SvelteFlow {nodes} {edges} fitView on:nodeclick={(event) => console.log('on node click', event)}>
  <Controls />
  <Background variant={BackgroundVariant.Dots} />
  <MiniMap />
</SvelteFlow>
