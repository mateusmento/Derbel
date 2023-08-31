import type { User } from './user.type';

export interface IMeeting {
  id: number;
  attendees: IMeetingAttendee[];
}

export interface IMeetingAttendee {
  remoteId: string;
  user: User;
}
