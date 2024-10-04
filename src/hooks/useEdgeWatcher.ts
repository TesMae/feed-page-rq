import { RefObject, useCallback, useEffect, useState } from "react";
import { useInfinitePosts } from "../server/postQuery";

export function useEdgeWatcher(elemRef: RefObject<HTMLElement>): {
  isNearTop: boolean;
  isNearBottom: boolean;
} {
  const { hasNextPage } = useInfinitePosts();
  const [isNearTop, setIsNearTop] = useState(true);
  const [isNearBottom, setIsNearBottom] = useState(false);

  const onScroll = useCallback(() => {
    if (elemRef.current && hasNextPage) {
      const { scrollTop, scrollHeight, clientHeight } = elemRef.current;
      setIsNearBottom(scrollTop + clientHeight >= scrollHeight);
      setIsNearTop(scrollTop <= 20);
    }
  }, [hasNextPage]);

  useEffect(() => {
    const innerElement = elemRef.current;

    if (innerElement) {
      innerElement.addEventListener("scroll", onScroll);

      return () => {
        innerElement.removeEventListener("scroll", onScroll);
      };
    }
  }, [onScroll]);

  return { isNearTop, isNearBottom };
}
