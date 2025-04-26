import { useEffect, useState } from "react";
import { getPosts } from "../api/posts";

const usePosts = (sortValue = "created_at", order = "asc", search = "") => {
  const [posts, setPosts] = useState([]);
  const [postsLoading, setPostsLoading] = useState(true);
  const [error, setError] = useState(null);

  const queries = new URLSearchParams({
    sortValue,
    order,
    search,
  }).toString();
  
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts(queries);
        setPosts(data);
      } catch (error) {
        setError(error);
        setPosts([])
      } finally {
        setPostsLoading(false);
      }
    };
    fetchPosts();
  }, [queries]);

  return { postsLoading, error, posts, setPosts };
};

export default usePosts;