import { TabsContent } from "@/components/ui/tabs.jsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.jsx";
import PropTypes from "prop-types";

function CreatePostTab({ children }) {
  return (
    <TabsContent value="create">
      <Card>
        <CardHeader>
          <CardTitle>Create Post</CardTitle>
          <CardDescription>Create a new post here.</CardDescription>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </TabsContent>
  );
}

CreatePostTab.propTypes = {
  children: PropTypes.node,
};

export default CreatePostTab;