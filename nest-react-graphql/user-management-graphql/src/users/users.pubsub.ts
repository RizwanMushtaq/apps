import { PubSub } from 'graphql-subscriptions/dist/pubsub';
import type { User } from './entities/user.entity';

export const PUB_SUB = 'PUB_SUB';

export type UsersSubscriptionEvents = {
  userCreated: { userCreated: User };
};

export function createUsersPubSub() {
  return new PubSub<UsersSubscriptionEvents>();
}
