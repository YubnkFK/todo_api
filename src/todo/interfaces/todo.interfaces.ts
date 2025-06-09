import { Document } from 'mongoose'

export interface Todo extends Document {
    readonly title: string;
    readonly description: string;
    readonly completed: boolean;
    readonly createdAt: Date;
}
