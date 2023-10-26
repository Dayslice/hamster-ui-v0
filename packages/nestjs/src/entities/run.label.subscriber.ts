// run.subscriber.ts
import { EntitySubscriberInterface, EventSubscriber, InsertEvent } from 'typeorm';
import { Run } from './run.entity';
import { Workflow } from './workflow.entity';

@EventSubscriber()
export class RunLabelSubscriber implements EntitySubscriberInterface<Run> {
  listenTo() {
    return Run;
  }

  async afterInsert(event: InsertEvent<Run>) {
    const run = event.entity;

    // If the workflow relationship isn't loaded, fetch it
    if (!run.workflow) {
      run.workflow = await event.manager.findOne(Workflow, { where: { id: run.workflow_id } });
      if (!run.workflow) {
        return;
      }
    }

    const workflowLabel = run.workflow.label;
    const runIdLast4Chars = run.id.slice(-4);

    run.label = `${runIdLast4Chars} ${workflowLabel}`;

    await event.manager.save(Run, run); // This will save the updated label back to the database
  }
}
