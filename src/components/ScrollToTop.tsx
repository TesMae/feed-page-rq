import React, { RefObject } from "react";

type ToTopBtnProps = {
  elemRef: RefObject<HTMLElement>;
};
export default function ScrollToTop({ elemRef }: ToTopBtnProps) {
  return (
    <button
      onClick={() => {
        elemRef.current?.scrollTo(0, 0);
      }}
    >
      Back to top
    </button>
  );
}
