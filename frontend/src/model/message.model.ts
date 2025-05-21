import { User } from './user.model';
import { Chat } from './chat.model';

export interface Message {
  _id: string;
  sender: User;
  content: string;
  chat: Chat;
  readBy: User[];
  createdAt: string;
  updatedAt: string;
}
