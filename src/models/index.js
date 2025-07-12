// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const Choice = {
  "YES": "YES",
  "NO": "NO"
};

const { Event, Vote, User } = initSchema(schema);

export {
  Event,
  Vote,
  User,
  Choice
};