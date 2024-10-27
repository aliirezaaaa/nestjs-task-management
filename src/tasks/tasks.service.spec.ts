import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { getRepositoryToken } from '@nestjs/typeorm'; // Import here
import { TasksRepository } from './tasks.repository';
import { NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.entity';
import { User } from '../auth/user.entity';

const mockTasksRepository = () => ({
  findOne: jest.fn(),
});

const mockUser: User = {
  id: 'someUserId',
  username: 'testUser',
  password: 'somePassword',
  tasks: [],
};

describe('TasksService', () => {
  let tasksService: TasksService;
  let tasksRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: getRepositoryToken(TasksRepository), useFactory: mockTasksRepository },
      ],
    }).compile();

    tasksService = module.get<TasksService>(TasksService);
    tasksRepository = module.get(getRepositoryToken(TasksRepository)); // Retrieve with the token
  });

  describe('getTaskById', () => {
    it('calls TasksRepository.findOne and returns the task', async () => {
      const mockTask = {
        title: 'Test task',
        description: 'Test description',
        id: 'someTaskId',
        status: TaskStatus.OPEN,
      };

      tasksRepository.findOne.mockResolvedValue(mockTask);

      const result = await tasksService.getTaskById('someTaskId', mockUser);
      expect(result).toEqual(mockTask);
    });

    it('calls TasksRepository.findOne and handles an error', async () => {
      tasksRepository.findOne.mockResolvedValue(null);

      await expect(tasksService.getTaskById('someTaskId', mockUser)).rejects.toThrow(NotFoundException);
    });
  });
});
