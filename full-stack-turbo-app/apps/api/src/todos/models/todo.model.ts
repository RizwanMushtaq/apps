import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Todo {
    @Field(() => ID)
    id!: number;
    @Field()
    title!: string;
    @Field()
    description!: string;
    @Field()
    status!: string;
    @Field()
    createdAt!: Date;
    @Field()
    updatedAt!: Date;
}
