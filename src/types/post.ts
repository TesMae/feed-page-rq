export type NewPostData = {
  userId?: string;
  title: string;
  body: string;
  createdAt?: number;
};

export type DisplayedPost = {
  id: string;
  userId: string;
  title: string;
  body: string;
  createdAt: number;
};
