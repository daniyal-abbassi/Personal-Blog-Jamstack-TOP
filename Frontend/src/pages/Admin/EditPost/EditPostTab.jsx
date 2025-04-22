import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "../../../components/ui/card";
  import { TabsContent } from "../../../components/ui/tabs";
  import PropTypes from "prop-types";
  
  function EditPostTab({ selectedPost, children }) {
    return (
      <TabsContent value="edit">
        <Card>
          <CardHeader>
            <CardTitle>Edit Post</CardTitle>
            <CardDescription>Edit a post here.</CardDescription>
          </CardHeader>
          <CardContent>{selectedPost && children}</CardContent>
        </Card>
      </TabsContent>
    );
  }
  
  EditPostTab.propTypes = {
    children: PropTypes.node,
    selectedPost: PropTypes.object,
  };
  
  export default EditPostTab;