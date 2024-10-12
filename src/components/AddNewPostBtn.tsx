import { useAddPost } from "../server/postQuery";
import { postTitles, postBodies } from "../../db/postOptions";

export default function AddNewPostBtn() {
  const mutation = useAddPost();

  return (
    <div>
      <button
        className="fixed bottom-10 right-10 z-10 rounded-full bg-gray-900 w-12 h-12 shadow-md"
        title="Add a new post"
        onClick={() => {
          const index = Math.floor(Math.random() * postTitles.length);
          mutation.mutate({
            title: postTitles[index],
            body: postBodies[index],
            userId: Math.floor(Math.random() * 100).toString(),
            createdAt: new Date().getTime(),
          });
        }}
      >
        <p className="text-gray-100 text-2xl">+</p>
      </button>
    </div>
  );
}
