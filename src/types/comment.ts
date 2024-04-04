export type CommentInfo = {
  id: number;
  body: string;
  user: {
    login: string;
    id: number;
    avatar_url: string;
  }
  created_at: string;
  updated_at: string;
}