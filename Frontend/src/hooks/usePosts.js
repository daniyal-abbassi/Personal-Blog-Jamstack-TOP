import { useEffect, useState } from "react";
//should create an api for fetching posts(send post requests to back-end)
import { getPosts } from "../api/posts";

const usePosts = (sortValue = "created_at", order = "asc", search = "") => {
  //change posts from null to array 
  const [posts, setPosts] = useState([]);
  const [postsLoading, setPostsLoading] = useState(true);
  const [error, setError] = useState(null);

  const queries = new URLSearchParams({
    sortValue,
    order,
    search,
  }).toString();

  console.log('this is from usePosts hook, posts are: ',posts)
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts(queries);
        console.log('this is from fetchposts: ',data)
        setPosts(data);
      } catch (error) {
        setError(error);
        //added for fixing posts is not aa function
        setPosts([])
      } finally {
        setPostsLoading(false);
      }
    };
    fetchPosts();
    console.log('this is from usePosts hook in useEffect, posts are: ',posts)

  }, [queries]);

  return { postsLoading, error, posts, setPosts };
};

export default usePosts;