import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "../../../components/ui/table";
  import convertTimestamp from "../../../utils/convertTimestamp";
  import { Switch } from "../../../components/ui/switch";
  import { Loader2, SquarePen, Trash2 } from "lucide-react";
  import { Button } from "../../../components/ui/button";
  import { useToast } from "../../../hooks/useToast";
  import { useState } from "react";
  import PropTypes from "prop-types";
  // import posts api for fetching stuff
  import { deletePost, editPost } from "@/api/posts.js";
  
  function PostsTable({ posts, setPosts, author, setSelectedPost, switchTab }) {
    const { toast } = useToast();
    const [selectedPostId, setSelectedPostId] = useState(null);
    const [loading, setLoading] = useState(false);
  
    async function handleDelete(e) {
      try {
        setLoading(true);
        const { id } = e.target;
  
        setPosts(posts.filter((post) => post.id !== id));
        setSelectedPostId(id);
  
        const data = await deletePost(id);
  
        toast({
          title: "Successfully deleted post!",
          description: `Title: ${data.title}`,
        });
      } catch (error) {
        console.error("Error deleting post", error);
        toast({
          title: "Post deletion failed!",
          description: error.message,
        });
      } finally {
        setLoading(false);
        setSelectedPostId(null);
      }
    }
  
    async function handleSwitch(post) {
      try {
        const data = await editPost({ ...post, isPublished: !post.isPublished });
        const postIndex = posts.findIndex((post) => post.id === data.id);
        const postCopy = [...posts];
  
        postCopy[postIndex] = data;
        setPosts(postCopy);
  
        if (data.isPublished) {
          toast({
            title: "Successfully published post!",
            description: `Title: ${post.title}`,
          });
        } else {
          toast({
            title: "Successfully unpublished post!",
            description: `Title: ${post.title}`,
          });
        }
      } catch (err) {
        console.error("Error: ", err.message);
      }
    }
  
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Image</TableHead>
            <TableHead className="min-w-[200px]">Title</TableHead>
            <TableHead className="w-max">Author</TableHead>
            <TableHead className="min-w-[130px]">Created</TableHead>
            <TableHead className="min-w-[130px]">Updated</TableHead>
            <TableHead className="w-max">Published</TableHead>
            <TableHead colSpan={2}></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts &&
            posts.map((post) => (
              <TableRow key={post.id}>
                <TableCell>
                  <img
                    className="rounded-sm"
                    src={post.imageUrl}
                    alt="image"
                    width={30}
                  />
                </TableCell>
                <TableCell>{post.title}</TableCell>
                <TableCell className="font-semibold">{author}</TableCell>
                <TableCell>{convertTimestamp(post.createdAt)}</TableCell>
                <TableCell>{convertTimestamp(post.updatedAt)}</TableCell>
                <TableCell className="">
                  <Switch
                    checked={post.isPublished}
                    onClick={() => handleSwitch(post)}
                  />
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="link"
                    onClick={() => {
                      setSelectedPost(post);
                      switchTab("edit");
                    }}
                  >
                    Edit
                    <SquarePen width={14} />
                  </Button>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    className="align-middle rounded-md h-min px-1 py-1"
                    variant={"destructive"}
                    id={post.id}
                    onClick={handleDelete}
                  >
                    {loading && selectedPostId === post.id ? (
                      <Loader2 className="animate-spin" width={20} height={20} />
                    ) : (
                      <Trash2 />
                    )}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={7}>Total Posts</TableCell>
            <TableCell className="text-right">{posts && posts.length}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    );
  }
  
  PostsTable.propTypes = {
    posts: PropTypes.array,
    setPosts: PropTypes.func,
    author: PropTypes.string,
    setSelectedPost: PropTypes.func,
    switchTab: PropTypes.func,
  };
  
  export default PostsTable;