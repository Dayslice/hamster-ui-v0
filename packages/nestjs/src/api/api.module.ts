/* https://docs.nestjs.com/modules */
import { Module } from '@nestjs/common';
import { CompanyModule } from './company/company.module';
import { WorkflowModule } from './workflow/workflow.module';
import { AgentModule } from './agent/agent.module';
import { RunModule } from './run/run.module';
import { StepModule } from './step/step.module';
import { AttachmentModule } from './attachment/attachment.module';
import { LogModule } from './log/log.module';
import { StyleModule } from './style/style.module';
import { ToolModule } from './tool/tool.module';
import { UserModule } from './user/user.module';
@Module({
  imports: [
    AgentModule,
    AttachmentModule,
    CompanyModule,
    LogModule,
    RunModule,
    StepModule,
    StyleModule,
    ToolModule,
    UserModule,
    WorkflowModule,
  ],
  controllers: [],
  providers: [],
})
export class ApiModule {}
