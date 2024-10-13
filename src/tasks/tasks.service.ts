import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from 'src/tasks/dto/create-task.dto';
import { Task, TaskStatus } from 'src/tasks/task.model';
import {v4 as uuid} from "uuid"

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  	getAllTasks(): Task[] {
		return this.tasks;
	}
    
	getTaskById(id:string) :Task {
		const found = this.tasks.find(task => task.id === id)
		if (!found) {
			throw new NotFoundException(`The task with id: ${id}, not found! `) 
		}
		return found
	}

    createTask(createTaskDto: CreateTaskDto): Task {
        const { title,description} = createTaskDto
        const task = {
            id: uuid(),
            title: title,
            description: description,
            status:TaskStatus.OPEN
        }

        this.tasks.push(task)
        return task
	}
	
	deleteTaskById(id: string): void{
		const found = this.getTaskById(id)
		this.tasks = this.tasks.filter(task=>task.id !== found.id)
	}

	updateTaskStatus(id: string, taskStatus: TaskStatus):Task {
		const task = this.getTaskById(id)
		task.status = taskStatus
		return task
	}
}
