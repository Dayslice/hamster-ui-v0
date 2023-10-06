import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User, UserEntityService } from './user.entity';
import { Attachment, AttachmentEntityService } from './attachment.entity';
import { Agent, AgentEntityService } from './agent.entity';
import { Company, CompanyEntityService } from './company.entity';
import { Log, LogEntityService } from './log.entity';
import { Run, RunEntityService } from './run.entity';
import { Step, StepEntityService } from './step.entity';
import { Style, StyleEntityService } from './style.entity';
import { Tool, ToolEntityService } from './tool.entity';
import { Workflow, WorkflowEntityService } from './workflow.entity';
import { StepTool, StepToolEntityService } from './step_tool.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Agent, Attachment, Company, Log, Run, Step, StepTool, Style, Tool, User, Workflow])],
  providers: [
    AgentEntityService,
    AttachmentEntityService,
    CompanyEntityService,
    LogEntityService,
    RunEntityService,
    StepEntityService,
    StepToolEntityService,
    StyleEntityService,
    ToolEntityService,
    UserEntityService,
    WorkflowEntityService,
  ],
  exports: [
    AgentEntityService,
    AttachmentEntityService,
    CompanyEntityService,
    LogEntityService,
    RunEntityService,
    StepEntityService,
    StepToolEntityService,
    StyleEntityService,
    ToolEntityService,
    UserEntityService,
    WorkflowEntityService,
  ],
})
export class EntitiesModule {}
