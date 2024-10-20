import { Body, Controller, Delete, Get, Logger, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { TasksService } from 'src/tasks/tasks.service';
import { CreateTaskDto } from 'src/tasks/dto/create-task.dto';
import { UpdateTaskStatusDto } from 'src/tasks/dto/update-task-status.dto';
import { Task } from 'src/tasks/task.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  private logger = new Logger('TasksController')

  constructor(private tasksService: TasksService) { }

  @Get('/:id')
  getTaskById(@Param('id') id: string, @GetUser() user: User): Promise<Task> {
    return this.tasksService.getTaskById(id, user)
  }

  @Post()
  createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User
  ): Promise<Task> {
    this.logger.verbose(`User "${user.username}" created a task: ${JSON.stringify(createTaskDto)}`)
    return this.tasksService.createTask(createTaskDto, user)
  }

  @Delete("/:id")
  deleteTaskById(@Param('id') id: string, @GetUser() user: User): Promise<void> {
    return this.tasksService.deleteTaskById(id,user)
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string, @Body() updateTaskStatusDto: UpdateTaskStatusDto,
    @GetUser() user: User
  ): Promise<Task> {
    const { status } = updateTaskStatusDto
    return this.tasksService.updateTaskStatus(id, status, user)
  }
}
