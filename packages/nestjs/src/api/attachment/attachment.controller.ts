/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { Attachment, AttachmentEntityService } from 'src/entities/attachment.entity';
import { AttachmentService } from './attachment.service';

@Crud({
  model: {
    type: Attachment,
  },
  params: {
    id: {
      type: 'uuid',
      primary: true,
      field: 'id',
    },
  },
  routes: {
    only: ['getOneBase', 'getManyBase', 'updateOneBase', 'createOneBase'],
  },
})
@Controller('attachment')
export class AttachmentController {
  constructor(public service: AttachmentEntityService, private logic: AttachmentService) {}
}
