export class CreateTodoDto {
    readonly title: string;
    readonly description: string;
    readonly completed: boolean;
    readonly createAt: Date;
}
