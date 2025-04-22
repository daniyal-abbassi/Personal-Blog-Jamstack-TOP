import { useEffect, useState } from "react";
import { getComments } from "../api/comments";

function useComments(postId) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    async function fetchComments() {
      try {
        setComments(await getComments(postId));
      } catch (error) {
        console.error(error);
      }
    }
    fetchComments();
  }, [postId]);

  return { comments, setComments };
}

export default useComments;