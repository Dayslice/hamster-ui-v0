<script lang="ts">
  import type { Run } from '$entities/run.entity';
  import runService from '$lib/utils/api/runService';
  import SvelteMarkdown from 'svelte-markdown';

  export let run: Run; // To uniquely identify which run's notes you're editing
  export let initialNotes: string = '';

  enum NotesStates {
    VIEWING = 'viewing',
    EDITING = 'editing',
  }

  let textarea: HTMLTextAreaElement;

  $: if (notesState === NotesStates.EDITING && textarea) {
    textarea.focus();
  }

  let notesState: NotesStates = NotesStates.VIEWING;
  let notes: string = initialNotes;

  const saveNotes = async () => {
    notes = notes.trim();
    if (notes.length > 0 && run.notes != notes) {
      run = await runService.update(run.id, { notes: notes });
    }
    notesState = NotesStates.VIEWING;
  };

  const handleViewingKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.stopImmediatePropagation();
      e.preventDefault();
      notesState = NotesStates.EDITING;
    }
  };

  const handleEditingKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && !e.ctrlKey) {
      e.preventDefault();
      saveNotes();
    }
  };
</script>

<div class="mt-2 pt-2 border-t border-slate-100 f text-sm">
  <span class="font-semibold text-sm">Notes:</span>

  {#if notesState === NotesStates.VIEWING}
    <div
      role="button"
      tabindex="0"
      class="text-slate-700 cursor-pointer whitespace-break-spaces markdown-body text-sm leading-relaxed"
      aria-roledescription="edit button"
      aria-label="Edit the notes of the run"
      on:keydown={handleViewingKeyDown}
      on:click={() => (notesState = NotesStates.EDITING)}
    >
      <SvelteMarkdown source={notes && notes != '' ? notes : 'Click to add notes'} />
    </div>
  {:else if notesState === NotesStates.EDITING}
    <textarea
      bind:this={textarea}
      class="w-full mt-2 border rounded-md p-2 text-slate-700"
      on:keydown={handleEditingKeyDown}
      bind:value={notes}
      on:blur={saveNotes}
    />
  {/if}
</div>
