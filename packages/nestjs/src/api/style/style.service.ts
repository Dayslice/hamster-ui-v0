/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { StyleEntityService } from 'src/entities/style.entity';

@Injectable()
export class StyleService {
  constructor(protected entity: StyleEntityService) {}
}
