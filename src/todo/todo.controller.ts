import { Controller, Get, Post, Put, Delete, Res, HttpStatus, Body, Param , NotFoundException, Query} from '@nestjs/common';
import { Response } from 'express';
import { CreateTodoDto } from './dto/todo.dto';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {

    constructor(private readonly todoService: TodoService) { }
    @Post('/create')
    async createTodo(@Res() res: Response, @Body() createTodoDto: CreateTodoDto): Promise<Response> {
        const todo = await this.todoService.createTodo(createTodoDto);
        return res.status(HttpStatus.CREATED).json({
            message: 'Todo successfully created',
            todo
        });
    }

    @Get('/')
    async getAllTodos(@Res() res: Response): Promise<Response> {
        const todos = await this.todoService.getAllTodos();
        return res.status(HttpStatus.OK).json({
            todos
        });
    }

    @Get('/:todoId')
    async getTodoById(@Res() res: Response, @Param('todoId') todoId: string) {
        const todo = await this.todoService.getTodoById(todoId);
        if (!todo) throw new NotFoundException('Todo not found');
        return res.status(HttpStatus.OK).json(todo);
    }

    @Delete('/delete')
    async deleteTodo(@Res() res: Response, @Query('todoId') todoId: string): Promise<Response> {
        const todoDeleted = await this.todoService.deleteTodo(todoId);
        if (!todoDeleted) throw new NotFoundException('Todo not found');
        return res.status(HttpStatus.OK).json({
            message: 'Todo deleted successfully',
            todoDeleted
        });
    }

    @Put('/update')
    async updateTodo(
        @Res() res: Response,
        @Query('todoId') todoId: string,
        @Body() createTodoDto: CreateTodoDto
    ): Promise<Response> {
        const updatedTodo = await this.todoService.updateTodo(todoId, createTodoDto);
        if (!updatedTodo) throw new NotFoundException('Todo not found');
        return res.status(HttpStatus.OK).json({
            message: 'Todo updated successfully',
            updatedTodo
        });
    }
}
