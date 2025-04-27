// RENDER POSTS COMPONENT
import PropTypes from "prop-types";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import { styled } from "@mui/material/styles";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import RssFeedRoundedIcon from "@mui/icons-material/RssFeedRounded";
import { use, useEffect, useState } from "react";
import usePosts from "../hooks/usePosts";
import {useParams, useSearchParams} from "react-router-dom";
//ISOLATE STYLINGS OF COMPONENTS
const SyledCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  padding: 0,
  height: "100%",
  backgroundColor: (theme.vars || theme).palette.background.paper,
  "&:hover": {
    backgroundColor: "transparent",
    cursor: "pointer",
  },
  "&:focus-visible": {
    outline: "3px solid",
    outlineColor: "hsla(210, 98%, 48%, 0.5)",
    outlineOffset: "2px",
  },
}));

const SyledCardContent = styled(CardContent)({
  display: "flex",
  flexDirection: "column",
  gap: 4,
  padding: 16,
  flexGrow: 1,
  "&:last-child": {
    paddingBottom: 16,
  },
});

const StyledTypography = styled(Typography)({
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 2,
  overflow: "hidden",
  textOverflow: "ellipsis",
});

function Author({ authors }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: 2,
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 1,
          alignItems: "center",
        }}
      >
        <AvatarGroup max={3}>
          <Avatar alt="lain" src="lain" sx={{ width: 24, height: 24 }} />
        </AvatarGroup>
        <Typography variant="caption">Lain</Typography>
      </Box>
      <Typography variant="caption">July 14, 2021</Typography>
    </Box>
  );
}

Author.propTypes = {
  authors: PropTypes.arrayOf(
    PropTypes.shape({
      avatar: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export function Search() {
  return (
    <FormControl sx={{ width: { xs: "100%", md: "25ch" } }} variant="outlined">
      <OutlinedInput
        size="small"
        id="search"
        placeholder="Search…"
        sx={{ flexGrow: 1 }}
        startAdornment={
          <InputAdornment position="start" sx={{ color: "text.primary" }}>
            <SearchRoundedIcon fontSize="small" />
          </InputAdornment>
        }
        inputProps={{
          "aria-label": "search",
        }}
      />
    </FormControl>
  );
}
//posts per page
const POSTS_PER_PAGE = 6;
//MAIN COMPONENT
export default function MainContent() {
  const [focusedCardIndex, setFocusedCardIndex] = useState(null);
  //posts test section
  const { postsLoading, error, posts, setPosts } = usePosts();
  const [searchParams,setSearchParams] = useSearchParams();
  const [currentPage,setCurrentPage ] = useState(1);

  //useEffent for rendering when page changes
  useEffect(()=>{
    const pageParam = searchParams.get('page');
    if(pageParam) {
      const parsedPage = parseInt(pageParam,10);
      if(!isNaN(parsedPage) && parsedPage > 0) {
        setCurrentPage(parsedPage)
      } else {
        setCurrentPage(1)
      }
    } else {
      setCurrentPage(1)
    }
  },[searchParams])

  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const displayedPosts = posts ? posts.slice(startIndex,endIndex) : [];
  const totalPages = posts ? Math.ceil(posts.length / POSTS_PER_PAGE) : 1;
  // console.log('didplaedposts : ',displayedPosts)
  const hadnlePageChange = (event,newPage) => {
    setCurrentPage(newPage);
    searchParams.set('page',newPage.toString());
    setSearchParams(searchParams)
  }
  if (postsLoading) {
    return (
      <Typography variant="h1" color="warning">
        Loading Posts...
      </Typography>
    );
  }
  if (error) {
    return (
      <Typography color="error" variant="h2">
        Error while trying to read posts.
      </Typography>
    );
  }
  if (!posts && posts.length === 0) {
    return (
      <Typography color="primary" variant="h4">
        There is no post availble at the moment.
      </Typography>
    );
  }

  const handleFocus = (index) => {
    setFocusedCardIndex(index);
  };

  const handleBlur = () => {
    setFocusedCardIndex(null);
  };

  const handleClick = () => {
    console.info("You clicked the filter chip.");
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <div>
        <Typography variant="h1" gutterBottom>
          Blog
        </Typography>
        <Typography>
          Stay in the loop with the latest about our products
        </Typography>
      </div>
      {/* SEARCH BOX */}
      <Box
        sx={{
          display: { xs: "flex", sm: "none" },
          flexDirection: "row",
          gap: 1,
          width: { xs: "100%", md: "fit-content" },
          overflow: "auto",
        }}
      >
        <Search />
        <IconButton size="small" aria-label="RSS feed">
          <RssFeedRoundedIcon />
        </IconButton>
      </Box>

      {/* TAGS BOX */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column-reverse", md: "row" },
          width: "100%",
          justifyContent: "space-between",
          alignItems: { xs: "start", md: "center" },
          gap: 4,
          overflow: "auto",
        }}
      >
        <Box
          sx={{
            display: "inline-flex",
            flexDirection: "row",
            gap: 3,
            overflow: "auto",
          }}
        >
          <Chip onClick={handleClick} size="medium" label="All categories" />
          <Chip
            onClick={handleClick}
            size="medium"
            label="Company"
            sx={{
              backgroundColor: "transparent",
              border: "none",
            }}
          />
          <Chip
            onClick={handleClick}
            size="medium"
            label="Product"
            sx={{
              backgroundColor: "transparent",
              border: "none",
            }}
          />
          <Chip
            onClick={handleClick}
            size="medium"
            label="Design"
            sx={{
              backgroundColor: "transparent",
              border: "none",
            }}
          />
          <Chip
            onClick={handleClick}
            size="medium"
            label="Engineering"
            sx={{
              backgroundColor: "transparent",
              border: "none",
            }}
          />
        </Box>
        <Box
          sx={{
            display: { xs: "none", sm: "flex" },
            flexDirection: "row",
            gap: 1,
            width: { xs: "100%", md: "fit-content" },
            overflow: "auto",
          }}
        >
          <Search />
          <IconButton size="small" aria-label="RSS feed">
            <RssFeedRoundedIcon />
          </IconButton>
        </Box>
      </Box>

      {/* POSTS GRID */}
      <Grid container spacing={2} columns={12}>
        {/* TOP-LEFT POST */}
        <Grid size={{ xs: 12, md: 6 }}>
          {/* A SINGLE POST-CARD */}
          {displayedPosts[0] && (
            <SyledCard
              variant="outlined"
              onFocus={() => handleFocus(0)}
              onBlur={handleBlur}
              tabIndex={0}
              className={focusedCardIndex === 0 ? "Mui-focused" : ""}
            >
              {/* POST-IMAGE */}
              <CardMedia
                component="img"
                alt="green iguana"
                image={displayedPosts[0].url}
                sx={{
                  aspectRatio: "16 / 9",
                  borderBottom: "1px solid",
                  borderColor: "divider",
                }}
              />
              {/* POST-TEXTS */}
              <SyledCardContent>
                <Typography gutterBottom variant="caption" component="div">
                  {displayedPosts[0].title}
                </Typography>
                <Typography gutterBottom variant="h6" component="div">
                  {displayedPosts[0].title}
                </Typography>
                <StyledTypography
                  variant="body2"
                  color="text.secondary"
                  gutterBottom
                >
                  {displayedPosts[0].content}
                </StyledTypography>
              </SyledCardContent>
              <Author authors={displayedPosts[0].author.username} />
            </SyledCard>
          )}
        </Grid>

        {/* TOP-RIGHT POST */}
        <Grid size={{ xs: 12, md: 6 }}>
          {displayedPosts[1] && (
            <SyledCard
              variant="outlined"
              onFocus={() => handleFocus(1)}
              onBlur={handleBlur}
              tabIndex={0}
              className={focusedCardIndex === 1 ? "Mui-focused" : ""}
            >
              <CardMedia
                component="img"
                alt="green iguana"
                image={displayedPosts[1].url}
                aspect-ratio="16 / 9"
                sx={{
                  borderBottom: "1px solid",
                  borderColor: "divider",
                }}
              />
              <SyledCardContent>
                <Typography gutterBottom variant="caption" component="div">
                  {displayedPosts[1].title}
                </Typography>
                <Typography gutterBottom variant="h6" component="div">
                  {displayedPosts[1].title}
                </Typography>
                <StyledTypography
                  variant="body2"
                  color="text.secondary"
                  gutterBottom
                >
                  {displayedPosts[1].content}
                </StyledTypography>
              </SyledCardContent>
              <Author authors={displayedPosts[1].author.username} />
            </SyledCard>
          )}
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          {displayedPosts[2] && (
            <SyledCard
              variant="outlined"
              onFocus={() => handleFocus(2)}
              onBlur={handleBlur}
              tabIndex={0}
              className={focusedCardIndex === 2 ? "Mui-focused" : ""}
              sx={{ height: "100%" }}
            >
              <CardMedia
                component="img"
                alt="green iguana"
                image={displayedPosts[2].url}
                sx={{
                  height: { sm: "auto", md: "50%" },
                  aspectRatio: { sm: "16 / 9", md: "" },
                }}
              />
              <SyledCardContent>
                <Typography gutterBottom variant="caption" component="div">
                  {displayedPosts[2].title}
                </Typography>
                <Typography gutterBottom variant="h6" component="div">
                  {displayedPosts[2].title}
                </Typography>
                <StyledTypography
                  variant="body2"
                  color="text.secondary"
                  gutterBottom
                >
                  {displayedPosts[2].content}
                </StyledTypography>
              </SyledCardContent>
              <Author authors={displayedPosts[2].author.username} />
            </SyledCard>
          )}
        </Grid>

        {/* TWO-POSTS-MIDDLE-WITHOUT-IMAGE */}
        <Grid size={{ xs: 12, md: 4 }}>
          {displayedPosts[3] && displayedPosts[4] && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                height: "100%",
              }}
            >
              {/* ABOVE-POST */}
              <SyledCard
                variant="outlined"
                onFocus={() => handleFocus(3)}
                onBlur={handleBlur}
                tabIndex={0}
                className={focusedCardIndex === 3 ? "Mui-focused" : ""}
                sx={{ height: "100%" }}
              >
                <SyledCardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    height: "100%",
                  }}
                >
                  <div>
                    <Typography gutterBottom variant="caption" component="div">
                      {displayedPosts[3].title}
                    </Typography>
                    <Typography gutterBottom variant="h6" component="div">
                      {displayedPosts[3].title}
                    </Typography>
                    <StyledTypography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                    >
                      {displayedPosts[3].content}
                    </StyledTypography>
                  </div>
                </SyledCardContent>
                <Author authors={displayedPosts[3].author.username} />
              </SyledCard>

              {/* BELOW-POST */}
              <SyledCard
                variant="outlined"
                onFocus={() => handleFocus(4)}
                onBlur={handleBlur}
                tabIndex={0}
                className={focusedCardIndex === 4 ? "Mui-focused" : ""}
                sx={{ height: "100%" }}
              >
                <SyledCardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    height: "100%",
                  }}
                >
                  <div>
                    <Typography gutterBottom variant="caption" component="div">
                      {displayedPosts[4].title}
                    </Typography>
                    <Typography gutterBottom variant="h6" component="div">
                      {displayedPosts[4].title}
                    </Typography>
                    <StyledTypography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                    >
                      {displayedPosts[4].content}
                    </StyledTypography>
                  </div>
                </SyledCardContent>
                <Author authors={displayedPosts[4].author.username} />
              </SyledCard>
            </Box>
          )}
        </Grid>

        {/* LAST-POST */}
        <Grid size={{ xs: 12, md: 4 }}>
          {displayedPosts[5] && (
            <SyledCard
              variant="outlined"
              onFocus={() => handleFocus(5)}
              onBlur={handleBlur}
              tabIndex={0}
              className={focusedCardIndex === 5 ? "Mui-focused" : ""}
              sx={{ height: "100%" }}
            >
              <CardMedia
                component="img"
                alt="green iguana"
                image={displayedPosts[5].url}
                sx={{
                  height: { sm: "auto", md: "50%" },
                  aspectRatio: { sm: "16 / 9", md: "" },
                }}
              />
              <SyledCardContent>
                <Typography gutterBottom variant="caption" component="div">
                  {displayedPosts[5].title}
                </Typography>
                <Typography gutterBottom variant="h6" component="div">
                  {displayedPosts[5].title}
                </Typography>
                <StyledTypography
                  variant="body2"
                  color="text.secondary"
                  gutterBottom
                >
                  {displayedPosts[5].content}
                </StyledTypography>
              </SyledCardContent>
              <Author authors={displayedPosts[5].author.username} />
            </SyledCard>
          )}
        </Grid>
      </Grid>

      {/* PAGINATION SECTION */}
      <Box sx={{ display: "flex", flexDirection: "row", pt: 4 }}>
        <Pagination
          hidePrevButton
          hideNextButton
          count={totalPages}
          page={currentPage}
          onChange={hadnlePageChange}
          boundaryCount={2}
          siblingCount={1}
        />
      </Box>
    </Box>
  );
}
