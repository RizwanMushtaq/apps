import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => Number, { description: 'The unique identifier of the user' })
  id!: number;

  @Field(() => String, { description: 'The name of the user' })
  name!: string;

  @Field(() => String, { description: 'The email of the user' })
  email!: string;
}
