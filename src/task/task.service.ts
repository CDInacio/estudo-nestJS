import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import type { TaskDto } from './task.dto';

@Injectable()
export class TaskService {
  private tasks: TaskDto[] = [];

  create(task: TaskDto) {
    this.tasks.push(task);
    console.log(this.tasks);
  }

  findById(id: string): TaskDto {
    const foundTask = this.tasks.filter((task) => task.id === id);
    if (foundTask.length) {
      return foundTask[0];
    }

    throw new HttpException(
      `Task with id ${id} not found.`,
      HttpStatus.NOT_FOUND,
    );
    // throw new NotFoundException(`Task with id ${id} not found.`);
  }

  update(task: TaskDto) {
    let taskIndex = this.tasks.findIndex((taskItem) => taskItem.id === task.id);

    if (taskIndex >= 0) {
      this.tasks[taskIndex] = task;
    }

    throw new HttpException(
      `Task with id ${task.id} not found.`,
      HttpStatus.BAD_REQUEST,
    );
  }
}
