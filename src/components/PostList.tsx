import React, { ReactElement } from "react";
import { DisplayedPost } from "../types/post";

type PostListProps = {
  data: DisplayedPost[];
  render: (item: DisplayedPost) => ReactElement;
};
export default function PostList({ data, render }: PostListProps) {
  if (!data || data.length === 0) {
    return <p>No post available.</p>;
  }

  return (
    <>
      {data.map((item) => (
        <div key={item.id}>{render(item)}</div>
      ))}
    </>
  );
}
