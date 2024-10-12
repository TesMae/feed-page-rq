import React, { useEffect, useRef, useState } from "react";
import { useInfinitePosts, useNewestPost } from "../server/postQuery";
import ToTopBtn from "./ToTopBtn";
import { useEdgeWatcher } from "../hooks/useEdgeWatcher";
import PostList from "./PostList";
import PostItem from "./PostItem";

export default function PostFeedWrapper() {
  const listRef = useRef<HTMLDivElement>(null);
  const { data: postLists, fetchNextPage, isError, error } = useInfinitePosts();

  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  const { isNearTop, isNearBottom } = useEdgeWatcher(listRef);

  useEffect(() => {
    if (isNearBottom) {
      fetchNextPage();
    }
  }, [isNearBottom]);

  const { data: prevNewestPost, refetch } = useNewestPost();
  useEffect(() => {
    if (isNearTop) {
      refetch();
    }
  }, [isNearTop]);

  const [isShowButton, setIsShowButton] = useState(false);
  useEffect(() => {
    if (!isNearTop) {
      setIsShowButton(postLists?.pages[0].data[0].id !== prevNewestPost?.id);
    } else {
      setIsShowButton(false);
      refetch();
    }
  }, [postLists, prevNewestPost]);

  return (
    <div className="pt-8">
      {isShowButton && <ToTopBtn elemRef={listRef} />}

      <div
        ref={listRef}
        className="pt-8 w-full h-11/12 overflow-scroll"
        style={{ height: window.innerHeight * 0.9 }}
      >
        <div className="max-w-lg mx-auto">
          <h1 className="text-3xl font-bold mb-4">Feed Posts</h1>
          {postLists?.pages.map((page, index) => (
            <PostList
              key={index}
              data={page.data}
              render={(post) => <PostItem post={post} />}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
