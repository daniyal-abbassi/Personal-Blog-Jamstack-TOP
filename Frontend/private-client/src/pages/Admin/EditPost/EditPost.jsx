// import CommentList from "./CommentList";
import ThumbnailPreview from "./ThumbnailPreview";
import TinyEditor from "../Editor";
import fileToBase64 from "../../../utils/fileToBase64";
import { postSchema } from "../../../utils/zodSchemas";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "../../../hooks/useToast";
import { Loader2 } from "lucide-react";
import { Input } from "../../../components/ui/input";
import { Checkbox } from "../../../components/ui/checkbox";
import { Button } from "../../../components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import PropTypes from "prop-types";
//should adjust the api for reletad stuff
import { editPost } from "../../../api/posts";
// comments api and hook
// import { deleteComment } from "../../../api/comments";
// import useComments from "../../../hooks/useComments";

function EditPost({ post, setPosts, setActiveTab, setSelectedPost }) {
  const [loading, setLoading] = useState(false);
  // const { comments, setComments } = useComments(post.id);
  const [thumbnailUrl, setThumbnailUrl] = useState(post.imageUrl);
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: post.title,
      content: post.content,
      isPublished: post.isPublished,
    },
  });

  async function onSubmit(values) {
    try {
      setLoading(true);
      const data = await editPost({ post_id: post.post_id, ...values });
      setPosts((posts) => [data, ...posts.filter((p) => p.post_id !== data.post_id)]);

      toast({
        title: "Successfully edited post!",
        description: `Title: ${post.title}`,
      });
    } catch (err) {
      console.error("Error editing post: ", err.message);
      toast({
        title: "Post edit failed!",
        description: err.message,
      });
    } finally {
      setLoading(false);
      setSelectedPost(null);
      setActiveTab("posts");
    }
  }

  // async function handleDeleteComment(id) {
  //   try {
  //     const data = await deleteComment(post.id, id);
  //     setComments(comments.filter((comment) => comment.id !== data.id));

  //     toast({
  //       title: "Comment successfully deleted!",
  //       description: `Username: ${data.username}`,
  //     });
  //   } catch (err) {
  //     console.error("Error deleting post: ", err.message);
  //   }
  // }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="..." type="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <TinyEditor value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="imageUrl"
          render={() => (
            <FormItem>
              <FormLabel>Thumbnail</FormLabel>
              <div className="flex items-center">
                <ThumbnailPreview imageUrl={thumbnailUrl} />
                <FormControl>
                  <Input
                    type="file"
                    onChange={async (e) => {
                      const files = e.target.files;
                      form.setValue("file", files);

                      const imageUrl = await fileToBase64(files[0]);
                      setThumbnailUrl(imageUrl);
                    }}
                  />
                </FormControl>
              </div>
              <FormDescription>Select an image to upload.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isPublished"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Publish post?</FormLabel>

                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        {/* {comments && (
          <CommentList
            comments={comments}
            handleDeleteComment={handleDeleteComment}
          />
        )} */}
        <div className="flex items-center space-x-3">
          <Button type="submit" className="flex-1">
            {loading ? <Loader2 className="animate-spin" /> : "Submit"}
          </Button>
          <Button
            className="flex-1"
            variant="secondary"
            onClick={(e) => {
              e.preventDefault();
              setActiveTab("posts");
              setSelectedPost(null);
            }}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}

EditPost.propTypes = {
  post: PropTypes.object,
  setPosts: PropTypes.func,
  setActiveTab: PropTypes.func,
  setSelectedPost: PropTypes.func,
};

export default EditPost;