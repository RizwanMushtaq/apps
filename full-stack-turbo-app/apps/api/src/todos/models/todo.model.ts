import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Todo {
  id: number;
  title: string;
  description: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}
