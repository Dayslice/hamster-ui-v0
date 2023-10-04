/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { AttachmentEntityService } from 'src/entities/attachment.entity';

@Injectable()
export class AttachmentService {
  constructor(protected entity: AttachmentEntityService) {}
}
