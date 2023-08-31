import type { IMeeting } from './meeting.type';
import type { IMessage } from './message.type';
import type { User } from './user.type';

export interface IContact {
  id: number;
  speakingTo: User;
  meeting: IMeeting | null;
  lastMessage?: IMessage;
}
