import { Injectable } from '@nestjs/common';
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
		return this.tasks.find(task=> task.id===id)
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
		this.tasks = this.tasks.filter(task=>task.id !== id)
	}

	updateTaskStatus(id: string, taskStatus: TaskStatus):Task {
		const task = this.getTaskById(id)
		task.status = taskStatus
		return task
	}
}
