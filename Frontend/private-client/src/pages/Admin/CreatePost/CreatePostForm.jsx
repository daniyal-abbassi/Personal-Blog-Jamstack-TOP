//CREATE POST FORM COMPONENT (api call from here)
import TinyEditor from "../Editor";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "../../../hooks/useToast";
import { Loader2 } from "lucide-react";
import { postSchema } from "../../../utils/zodSchemas";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Checkbox } from "../../../components/ui/checkbox";
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
import { createPost } from "../../../api/posts";
import { useState } from "react";


function CreatePostForm({ posts,setPosts, switchTab }) {
  const [open, setOpen] = useState(false);
  const [selectedTag, setselectedTag] = useState(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  //useForm custonHook
  const form = useForm({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      content: "",
      tag: "",
      isPublished: false,
    },
  });

  //submit form function for creating the post
  async function onSubmit(values) {
    try {
      setLoading(true);
      //api call for creating post
      console.log("onSubmit values are: ", values);
      const post = await createPost(values);
      //handle front-end posts array, add new created post to it
      setPosts((posts) => [post, ...posts]);

      toast({
        title: "Successfully created post!",
        description: `Title: ${post.title}`,
      });
    } catch (error) {
      console.error("Form submission error", error);
      toast({
        title: "Post creation failed!",
        description: error.message,
      });
    } finally {
      setLoading(false);
      switchTab();
    }
  }

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
                          <>{selectedTag.label}</>
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
                            {posts.map((post) => (
                              <CommandItem
                                key={post.tag}
                                value={post.tag}
                                onSelect={(value) => {
                                  setselectedTag(post.tag);
                                  form.setValue("tag", value);
                                  setOpen(false);
                                }}
                              >
                                {post.tag}
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
              <FormControl>
                <Input
                  type="file"
                  onChange={(e) => form.setValue("file", e.target.files)}
                />
              </FormControl>
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
        <Button type="submit">
          {loading ? <Loader2 className="animate-spin" /> : "Submit"}
        </Button>
      </form>
    </Form>
  );
}

CreatePostForm.propTypes = {
  setPosts: PropTypes.func,
  switchTab: PropTypes.func,
};

export default CreatePostForm;
