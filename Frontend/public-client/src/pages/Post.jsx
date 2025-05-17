//Single Post component
import test from "../assets/test.jpg";
import Box from "@mui/material/Box";
import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
  Typography,
} from "@mui/material";

export default function Post({post}) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <Chip
        size="medium"
        label={post.tag.tag}
        color="primary"
        variant="outlined"
        sx={{ width: { xs: "100%", md: "fit-content", overflow: "auto" } }}
      />

      <Typography variant="h1">
        {post.title}
      </Typography>
      <CardContent>
        <Typography variant="body2" color="primary">
          By {post.author.username}
        </Typography>
        <Typography variant="caption" color="warning">
          {post.created_at}
        </Typography>
      </CardContent>
      <CardMedia
        component="img"
        alt="Aroan Showarts"
        image={post.url}
        aspect-ratio="16 / 9"
        sx={{ maxWidth: "90%", maxHeight: "90%",borderRadius: "10px" }}
      />
      <Typography variant="h4">
        {post.content}
      </Typography>
    </Box>
  );
}
