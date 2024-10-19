import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksRepository } from 'src/tasks/tasks.repository';
import { Task } from 'src/tasks/task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task,TasksRepository])],
  providers: [
    TasksService,TasksRepository
    // {
    //   provide: 'TasksRepository',
    //   useClass: TasksRepository,
    // },
  ],
  controllers: [TasksController],
})
export class TasksModule {}
