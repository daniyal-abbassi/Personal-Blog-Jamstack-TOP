import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "../../../components/ui/card";
  import Sort from "../PostsTable/Sort";
  import { Input } from "../../../components/ui/input";
  import { Button } from "../../../components/ui/button";
  import Pages from "./Pages";
  import { TabsContent } from "../../../components/ui/tabs";
  import PropTypes from "prop-types";
  
  function PostsTableTab({
    setSortValue,
    setOrder,
    setSearch,
    metadata,
    children,
  }) {
    return (
      <TabsContent value="posts">
        <Card>
          <CardHeader className="flex-row flex-wrap justify-between gap-2 items-start">
            <div className="space-y-2">
              <CardTitle>Posts</CardTitle>
              <CardDescription>
                All your published & un-published posts here.
              </CardDescription>
            </div>
            <div className="flex gap-4 flex-wrap">
              <Sort setSortValue={setSortValue} setOrder={setOrder} />
              <div className="flex gap-2 min-w-200px">
                <Input type="search" placeholder="Search" />
                <Button
                  onClick={(e) => setSearch(e.target.previousSibling.value)}
                >
                  Search
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>{children}</CardContent>
          <CardFooter>
            <Pages {...metadata} />
          </CardFooter>
        </Card>
      </TabsContent>
    );
  }
  
  PostsTableTab.propTypes = {
    setSortValue: PropTypes.func,
    setOrder: PropTypes.func,
    setSearch: PropTypes.func,
    metadata: PropTypes.object,
    children: PropTypes.node,
  };
  
  export default PostsTableTab;