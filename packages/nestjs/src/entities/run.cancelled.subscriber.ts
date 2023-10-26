// run.subscriber.ts
import { EntitySubscriberInterface, EventSubscriber, UpdateEvent } from 'typeorm';
import { Run } from './run.entity';

@EventSubscriber()
export class RunCancelledSubscriber implements EntitySubscriberInterface<Run> {
  listenTo() {
    return Run;
  }

  beforeUpdate(event: UpdateEvent<Run>) {
    if (event.entity.status !== event.databaseEntity.status && event.entity.status === 'cancelled') {
      event.entity.cancelled_at = new Date();
    }
  }
}
