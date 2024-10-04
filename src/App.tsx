import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PostFeedWrapper from "./components/PostFeedWrapper";
import NewPostForm from "./components/NewPostForm";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 2 * (60 * 1000),
      gcTime: 3 * (60 * 1000),
      retryDelay: 1000,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <h1>List of Posts</h1>
      <NewPostForm />
      <PostFeedWrapper />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
