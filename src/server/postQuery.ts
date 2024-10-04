import {
  QueryFunctionContext,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import { NewPostData } from "../types/post";

const URL = "http://localhost:3000";
const POSTS = "posts";

export const fetchInfinitePosts = async ({
  pageParam,
}: QueryFunctionContext) => {
  const result = await axios.get(
    `${URL}/${POSTS}?_sort=-createdAt&_page=${pageParam}&_per_page=10`,
  );
  return result.data;
};

export const useInfinitePosts = () => {
  return useInfiniteQuery({
    queryKey: [POSTS],
    queryFn: fetchInfinitePosts,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.next,
  });
};

export const savePost = async (post: NewPostData) =>
  axios.post(`${URL}/${POSTS}`, post);

export const useAddPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: savePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [POSTS] });
    },
  });
};

export const fetchNewestPost = async () => {
  const result = await axios.get(`${URL}/${POSTS}?_sort=-createdAt`);
  return result.data[0];
};

export const useNewestPost = () => {
  return useQuery({
    queryKey: [POSTS, "newest"],
    queryFn: () => fetchNewestPost(),
    enabled: false,
  });
};
