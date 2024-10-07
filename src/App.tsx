import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PostFeedWrapper from "./components/PostFeedWrapper";
import AddNewPostBtn from "./components/AddNewPostBtn";

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
      <PostFeedWrapper />
      <AddNewPostBtn />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
