import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
    
	async getTaskById(id: string): Promise<Task>{
		const found = await this.tasksRepository.findOne({ where: { id } });

		if (!found) {
			throw new NotFoundException(`The task with id: ${id}, not found! `)
		}

		return found
	}

    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
		
			const { title,description} = createTaskDto
			const task = this.tasksRepository.create({
				title: title,
				description: description,
				status:TaskStatus.OPEN
			})
	
			await this.tasksRepository.save(task)
			return task
		
	}
	
	async deleteTaskById(id: string): Promise<void>{
		const result = await this.tasksRepository.delete(id)
		if (result.affected === 0) {
			throw new NotFoundException(`The task with id: ${id}, not found! `)
		}
	}

	async updateTaskStatus(id: string, taskStatus: TaskStatus):Promise<Task> {
		const task = await this.getTaskById(id)
		task.status = taskStatus
		await this.tasksRepository.save(task)
		return task
	}
}
