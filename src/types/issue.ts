export type IssueInfo = {
  id: number;
  state: string;
  comments_url: string;
  title: string;
  body: string;
  user: {
    login: string;
    id: number;
  }
  comments: number;
  created_at: string;
  updated_at: string;
}