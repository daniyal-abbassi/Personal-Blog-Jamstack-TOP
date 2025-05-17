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

export default function Post() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <Chip
        size="medium"
        label="Programming"
        color="primary"
        variant="outlined"
        sx={{ width: { xs: "100%", md: "fit-content", overflow: "auto" } }}
      />

      <Typography variant="h1">
        How We Can Render A Single Post ??? Full Tuturial By Slim Shady
      </Typography>
      <CardContent>
        <Typography variant="body2" color="primary">
          By Slim Shady
        </Typography>
        <Typography variant="caption" color="warning">
          5 May 2025
        </Typography>
      </CardContent>
      <CardMedia
        component="img"
        alt="Aroan Showarts"
        image={test}
        aspect-ratio="16 / 9"
        sx={{ maxWidth: "90%", maxHeight: "90%",borderRadius: "10px" }}
      />
      <Typography variant="h4">
        This is the main blog text that will show in the single blog page, and
        it is as follows so listen up.. hear we go again...
      </Typography>
    </Box>
  );
}
