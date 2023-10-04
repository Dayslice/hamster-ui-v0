/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { CompanyEntityService } from 'src/entities/company.entity';

@Injectable()
export class CompanyService {
  constructor(protected entity: CompanyEntityService) {}
}
