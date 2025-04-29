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
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import PropTypes from "prop-types";
//should adjust the api for reletad stuff
import { editPost } from "../../../api/posts";
// comments api and hook
// import { deleteComment } from "../../../api/comments";
// import useComments from "../../../hooks/useComments";

function EditPost({ posts, post, setPosts, setActiveTab, setSelectedPost }) {
  const [open, setOpen] = useState(false);
  const [selectedTag, setselectedTag] = useState(post.tag.tag);
  const [loading, setLoading] = useState(false);
  // const { comments, setComments } = useComments(post.id);
  const [thumbnailUrl, setThumbnailUrl] = useState(post.url);
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: post.title,
      tag: post.tag.tag,
      content: post.content,
      isPublished: post.isPublished,
    },
  });

  async function onSubmit(values) {
    try {
      setLoading(true);
      const data = await editPost({ post_id: post.post_id, ...values });
      setPosts((posts) => [
        data,
        ...posts.filter((p) => p.post_id !== data.post_id),
      ]);

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
//unique tags array
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

  // console.log(selectedTag)
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
        <FormField
          control={form.control}
          name="tag"
          render={({ field }) => (
            <FormItem className="flex flex-row space-x-4 rounded-md border p-2">
              <FormControl>
                <div className="flex items-center space-x-4">
                  <p className="text-sm text-muted-foreground">Tag</p>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-[150px] justify-start"
                      >
                        {selectedTag ? (
                          <>{selectedTag}</>
                        ) : (
                          <>+ Select a Tag</>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="p-0" side="right" align="start">
                      <Command>
                        <CommandInput placeholder="Search Tag..." />
                        {selectedTag && (
                          <CommandItem
                            onSelect={() => {
                              setselectedTag(null);
                              form.setValue("tag", ""); // Clear the form value as well
                              setOpen(false);
                            }}
                          >
                            Clear Tag
                          </CommandItem>
                        )}
                        <CommandList>
                          <CommandEmpty>No results found.</CommandEmpty>
                          <CommandGroup>
                            {tags.map((tag) => (
                              <CommandItem
                                key={tag}
                                value={tag}
                                onSelect={(value) => {
                                  setselectedTag(tag);
                                  form.setValue("tag", value);
                                  setOpen(false);
                                }}
                              >
                                {tag}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>
              </FormControl>
              <FormControl>
                <Input
                  placeholder="Create a new tag..."
                  type=""
                  className="w-50"
                  disabled={!!selectedTag}
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
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
          name="file"
          render={() => (
            <FormItem>
              <FormLabel>Thumbnail</FormLabel>
              <div className="flex items-center">
                <ThumbnailPreview file={thumbnailUrl} />
                <FormControl>
                  <Input
                    type="file"
                    onChange={async (e) => {
                      const files = e.target.files;
                      form.setValue("file", files);

                      const file = await fileToBase64(files[0]);
                      setThumbnailUrl(file);
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
