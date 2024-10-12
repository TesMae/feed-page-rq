import { ReactElement } from "react";
import { DisplayedPost } from "../types/post";

type PostListProps = {
  data: DisplayedPost[];
  render: (item: DisplayedPost) => ReactElement;
};
export default function PostList({ data, render }: PostListProps) {
  return data.map((item) => <div key={item.id}>{render(item)}</div>);
}
