import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task, TaskStatus } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  public index(): Task[] {
    return this.tasksService.getAllTasks();
  }

  @Post()
  public create(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.createTask(createTaskDto);
  }

  @Get('/:id')
  public show(@Param('id') id: string): Task {
    return this.tasksService.showTask(id);
  }

  @Delete('/:id')
  public delete(@Param('id') id: string): string {
    this.tasksService.deleteTask(id);

    return 'task successfully deleted';
  }

  @Patch('/:id/status')
  public updateStatus(
    @Param('id') id: string,
    @Body('status') status: TaskStatus,
  ): Task {
    return this.tasksService.updateTask(id, status);
  }
}
