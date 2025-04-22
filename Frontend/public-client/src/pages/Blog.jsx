import Footer from "../components/Footer";
import MainContent from "../components/MainContent";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import AppAppBar from "../components/AppAppBar";
import Latest from "../components/Latest";
import AppTheme from "../shared-theme/AppTheme";

export default function Blog() {
  
  return (
    <AppTheme>
      <CssBaseline enableColorScheme />
      <AppAppBar/>
      <Container
        maxWidth="lg"
        component="main"
        sx={{ display: "flex", flexDirection: "column", my: 16, gap: 4 }}
      >
        <MainContent />
        <Latest />
      </Container>
      <Footer />
    </AppTheme>
  );
}
