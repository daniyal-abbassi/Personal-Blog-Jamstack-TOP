import { useEffect, useState } from "react";
import { getPosts } from "../api/posts";

const usePosts = (sortValue = "created_at", order = "asc", search = "",isPublished="true") => {
  const [posts, setPosts] = useState([]);
  const [postsLoading, setPostsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tags,setTags] = useState([]);
  const queries = new URLSearchParams({
    sortValue,
    order,
    search,
    isPublished,
  }).toString();
  const getTags = (posts) => {
    let tags = [];
    if(posts&&posts.length>0) {
      posts.map((post)=>{
      if(post.tag&&post.tag.tag) {
        tags.push(post.tag.tag)
      }
    })
    tags = new Set(tags);
    tags = [...tags]
  }
  return tags;
}
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts(queries);
        const tags = getTags(data);
        setTags(tags);
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

  return { postsLoading, error, posts, setPosts,tags };
};

export default usePosts;