import { Injectable } from '@nestjs/common'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { Todo } from './interfaces/todo.interfaces'
import { CreateTodoDto } from './dto/todo.dto'

@Injectable()
export class TodoService {
  constructor(@InjectModel('Todo') private readonly todoModel: Model<Todo>) {}

  async getAllTodos(): Promise<Todo[]> {
    const todos = await this.todoModel.find()
    return todos
  }

  async getTodoById(todoId: string): Promise<Todo | null> {
    const todo = await this.todoModel.findById(todoId)
    return todo
  }

  async createTodo(createTodoDto: CreateTodoDto): Promise<Todo> {
    const todo = new this.todoModel(createTodoDto)
    return await todo.save()
  }

  async updateTodo(
    todoId: string,
    createTodoDto: CreateTodoDto
  ): Promise<Todo | null> {
    const updatedTodo = await this.todoModel.findByIdAndUpdate(
      todoId,
      createTodoDto,
      { new: true }
    )
    return updatedTodo
  }

  async deleteTodo(todoId: string): Promise<any> {
    const deleteTodo = await this.todoModel.findByIdAndDelete(todoId)
    return deleteTodo
  }
}
