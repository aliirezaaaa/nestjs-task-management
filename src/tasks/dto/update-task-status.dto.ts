import { IsEnum } from "class-validator";
import { TaskStatus } from "src/tasks/task-status.entity";

export class UpdateTaskStatusDto{
    @IsEnum(TaskStatus)
    status:TaskStatus
}