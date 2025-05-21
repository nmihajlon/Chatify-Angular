import { Message } from "./message.model";
import { User } from "./user.model";

export interface Chat {
  _id: string;
  name?: string;
  isGroupChat: boolean;
  users: User[];
  latestMessage?: Message;
  groupAdmin?: User;
  typingUsers?: User[];
  createdAt: string;
  updatedAt: string;
}
