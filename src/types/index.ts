export interface PollOption {
  _id: string;
  choice: string;
  votes: number;
}

export interface Reactions {
  fire: number;
  like: number;
}
export interface Comment {
  text: string;
}

export interface Poll {
  _id: string;
  question: string;
  options: PollOption[];
  reactions: Reactions;
  expiresAt: string;
  hideResults: boolean;
  comments: Comment[] | [];
  createdAt: string;
  updatedAt: string;
  __v: number;
}
