/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { Company, CompanyEntityService } from 'src/entities/company.entity';
import { CompanyService } from './company.service';

@Crud({
  model: {
    type: Company,
  },
  params: {
    id: {
      type: 'uuid',
      primary: true,
      field: 'id',
    },
  },
  routes: {
    only: ['getOneBase', 'getManyBase', 'updateOneBase'],
  },
})
@Controller('company')
export class CompanyController {
  constructor(public service: CompanyEntityService, private logic: CompanyService) {}
}
