import React, { RefObject } from "react";

type ToTopBtnProps = {
  elemRef: RefObject<HTMLElement>;
};
export default function ToTopBtn({ elemRef }: ToTopBtnProps) {
  return (
    <div className="relative">
      <button
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-bounce rounded-full bg-gray-900 w-24 h-10 shadow-md"
        onClick={() => {
          elemRef.current?.scrollTo({top: 0, behavior: 'smooth'});
        }}
      >
        <p className="text-gray-100"> ↑ New Post</p>
      </button>
    </div>
  );
}
