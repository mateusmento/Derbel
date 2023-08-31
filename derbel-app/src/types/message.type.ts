import type { IContact } from './contact.type';
import type { User } from './user.type';

export interface IMessage {
  id: number;
  text: string;
  sentAt: string;
  speakerId: number;
  speaker: User;
  contactId: number;
  contact: IContact;
}
