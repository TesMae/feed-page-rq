import { formatDate } from "../utils/date";
import { DisplayedPost } from "../types/post";

type PostItemProps = {
  post: DisplayedPost;
};
export default function PostItem({ post }: PostItemProps) {
  return (
    <div className="bg-white rounded-lg shadow-md border p-4">
      <div className="flex items-center mb-4">
        <img
          className="w-12 h-12 rounded-full mr-3"
          src={`https://randomuser.me/api/portraits/men/${post.userId}.jpg`}
          alt="Profile Image"
        />
        <div>
          <h2 className="text-lg font-semibold">{post.title}</h2>
          <p className="text-gray-500 text-sm">
            Published on {formatDate(post.createdAt)}
          </p>
        </div>
      </div>
      <p className="text-gray-700 mb-4">{post.body}</p>
    </div>
  );
}
