import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { CreateTaskDto } from 'src/tasks/dto/create-task.dto';
import { TaskStatus } from 'src/tasks/task-status.entity';
import { Task } from 'src/tasks/task.entity';
import { TasksRepository } from 'src/tasks/tasks.repository';

@Injectable()
export class TasksService {

	constructor(
		@InjectRepository(Task)
		private tasksRepository: TasksRepository
	) { }
    
	async getTaskById(id: string,user:User): Promise<Task>{
		const found = await this.tasksRepository.findOne({ where: { id,user } });

		if (!found) {
			throw new NotFoundException(`The task with id: ${id}, not found! `)
		}

		return found
	}

    async createTask(createTaskDto: CreateTaskDto,user:User): Promise<Task> {
		
			const { title,description} = createTaskDto
			const task = this.tasksRepository.create({
				title: title,
				description: description,
				status: TaskStatus.OPEN,
				user
			})
	
			await this.tasksRepository.save(task)
			return task
		
	}
	
	async deleteTaskById(id: string,user:User): Promise<void>{
		const result = await this.tasksRepository.delete({id,user})
		if (result.affected === 0) {
			throw new NotFoundException(`The task with id: ${id}, not found! `)
		}
	}

	async updateTaskStatus(id: string, taskStatus: TaskStatus,user:User):Promise<Task> {
		const task = await this.getTaskById(id,user)
		task.status = taskStatus
		await this.tasksRepository.save(task)
		return task
	}
}
