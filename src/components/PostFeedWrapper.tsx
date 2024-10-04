import React, { useEffect, useRef, useState } from "react";
import { useInfinitePosts, useNewestPost } from "../server/postQuery";
import ScrollToTop from "./ScrollToTop";
import { useEdgeWatcher } from "../hooks/useEdgeWatcher";
import PostList from "./PostList";

export default function PostFeedWrapper() {
  const listRef = useRef<HTMLDivElement>(null);
  const { data, fetchNextPage } = useInfinitePosts();

  const { isNearTop, isNearBottom } = useEdgeWatcher(listRef);

  useEffect(() => {
    if (isNearBottom) {
      fetchNextPage();
    }
  }, [isNearBottom]);

  const { data: newestPost, refetch } = useNewestPost();
  useEffect(() => {
    if (isNearTop) {
      refetch();
    }
  }, [isNearTop]);

  const [isShowButton, setIsShowButton] = useState(false);
  useEffect(() => {
    if (!isNearTop) {
      setIsShowButton(data?.pages[0].data[0].id !== newestPost?.id);
    } else {
      setIsShowButton(false);
      refetch();
    }
  }, [data, newestPost]);

  return (
    <>
      {isShowButton && <ScrollToTop elemRef={listRef} />}

      <div
        ref={listRef}
        style={{ width: "80%", height: "220px", overflow: "scroll" }}
      >
        {data?.pages.map((page, index) => (
          <PostList
            key={index}
            data={page.data}
            render={(post) => (
              <div>
                <h2>{post.title}</h2>
                <p>{post.body}</p>
              </div>
            )}
          />
        ))}
      </div>
    </>
  );
}
