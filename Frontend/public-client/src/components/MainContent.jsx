// RENDER POSTS COMPONENT
import DOMPurify from "dompurify";
import { format } from "date-fns";
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
import { useEffect, useState } from "react";
import usePosts from "../hooks/usePosts";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@mui/material";
//ISOLATE STYLINGS OF COMPONENTS
const StyledLink = styled(Link)({
  textDecoration: "none",
  color: "inherit",
  "&:hover": {
    textDecoration: "none"
  }
});
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

function Author({ author,date }) {
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
        <Typography variant="caption">{author}</Typography>
      </Box>
      <Typography variant="caption">{format(new Date(date), 'dd MMMM yyyy')}</Typography>
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

export function Search({ handleSearch, searchTitles }) {
  return (
    <FormControl sx={{ width: { xs: "100%", md: "25ch" } }} variant="outlined">
      <OutlinedInput
        size="small"
        id="search"
        placeholder="Search…"
        sx={{ flexGrow: 1 }}
        onChange={handleSearch}
        value={searchTitles}
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
Search.prototype = {
  searchTitles: PropTypes.string.isRequired,
  handleSearch: PropTypes.func.isRequired,
};
//posts per page
const POSTS_PER_PAGE = 6;
//MAIN COMPONENT
export default function MainContent() {
  const [focusedCardIndex, setFocusedCardIndex] = useState(null);
  //posts test section
  const { postsLoading, error, posts, setPosts, tags } = usePosts();
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  //read tag from searchParams on initial load
  const [activeTag, setActiveTag] = useState(
    searchParams.get("tag") || "All categories"
  );
  //read search from searchParam
  const [searchTitles, setSearchTitles] = useState(
    searchParams.get("search") || ""
  );
  //rendering when page changes
  useEffect(() => {
    const pageParam = searchParams.get("page");
    //get tag from url
    const tagParam = searchParams.get("tag");
    //get search from url
    const searchTitleParam = searchParams.get("search");

    if (pageParam) {
      const parsedPage = parseInt(pageParam, 10);
      if (!isNaN(parsedPage) && parsedPage > 0) {
        setCurrentPage(parsedPage);
      } else {
        setCurrentPage(1);
        //clean-up invalid params
        searchParams.delete("page");
        setSearchParams(searchParams);
      }
    } else {
      setCurrentPage(1);
    }
    //update active tag based on search-params
    if (
      tagParam &&
      (tagParam === "All categories" || (tags && tags.includes(tagParam)))
    ) {
      setActiveTag(tagParam);
    } else if (tagParam) {
      //if tag in invalid
      setActiveTag("All categories");
      searchParams.delete("tag");
      setSearchParams(searchParams);
    } else {
      //set default to all tags
      setActiveTag("All categories");
    }

    //update search state based on searchPrams-url
    if (
      searchTitleParam &&
      posts.some((post) => post.title === searchTitleParam)
    ) {
      setSearchTitles(searchTitleParam);
    } else if (searchTitleParam) {
      setSearchTitles("");
      searchParams.delete("search");
      setSearchParams(searchParams);
    } else {
      setSearchTitles("");
    }
  }, [searchParams, tags, setSearchParams, setSearchTitles]);

  //filter posts based on tag
  const tagFilteredPosts = (posts || []).filter((post) => {
    if (activeTag === "All categories") {
      return true;
    }
    return post.tag && post.tag.tag === activeTag;
  });
  //filter posts based on search
  const filteredPosts = tagFilteredPosts.filter((post) => {
    if (!searchTitles.trim()) {
      return true;
    }
    return post.title.toLowerCase().includes(searchTitles.toLowerCase());
  });
  //CALCULATE POSTS PER PAGE
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  //use filterPost for desplaying posts
  let displayedPosts = filteredPosts
    ? filteredPosts.slice(startIndex, endIndex)
    : [];
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  //alwats page 1 is accessible
  const trueTotalPage = totalPages > 0 ? totalPages : 1;

  const hadnlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
    searchParams.set("page", newPage.toString());
    setSearchParams(searchParams);
  };
  //if filteredPosts is empty
  if (!postsLoading && !error && filteredPosts.length === 0) {
    return (
      <Typography color="primary" variant="h4">
        {activeTag === "All categories"
          ? "No posts found with that data."
          : `No posts found with the tag "${activeTag}"`}
        <Link to="/" reloadDocument>
          <Button>ALL POSTS</Button>
        </Link>
      </Typography>
    );
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
  const handleSearch = (event) => {
    let searchTerm = event.target.value;
    setSearchTitles(searchTerm);
    setCurrentPage(1);

    if (searchTerm.trim() === "") {
      searchParams.delete("search");
    } else {
      searchParams.set("search", searchTerm);
    }

    searchParams.delete("search");
    setSearchParams(searchParams);
  };
  const handleClick = (clickedTag) => {
    setActiveTag(clickedTag);
    setCurrentPage(1);

    //update search params
    if (clickedTag === "All categories") {
      searchParams.delete("tag");
    } else {
      searchParams.set("tag", clickedTag);
    }
    //reset page
    searchParams.delete("page");
    setSearchParams(searchParams);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <div>
        <Typography variant="h1" gutterBottom>
          Blog
        </Typography>
        <Typography>personal place for my life</Typography>
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
        <Search handleSearch={handleSearch} searchTitles={searchTitles} />
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
        {/* TAG-BOX */}
        <Box
          sx={{
            display: "inline-flex",
            flexDirection: "row",
            gap: 3,
            overflow: "auto",
          }}
        >
          {/* EACH SINGLE TAG */}
          <Chip
            onClick={() => handleClick("All categories")}
            size="medium"
            label="All categories"
            color={activeTag === "All categories" ? "primary" : "default"}
            variant={activeTag === "All categories" ? "filled" : "outlined"}
          />
          {/* render specific tag */}
          {tags && tags.length > 0
            ? tags.map((tag, i) => (
                <Chip
                  key={i}
                  onClick={() => handleClick(tag)}
                  size="medium"
                  label={tag}
                  color={activeTag === tag ? "primary" : "default"}
                  variant={activeTag === tag ? "filled" : "outlined"}
                  // sx={{
                  //   backgroundColor: "transparent",
                  //   border: "none",
                  // }}
                />
              ))
            : null}
        </Box>
        {/* SEARCH-SECTION */}
        <Box
          sx={{
            display: { xs: "none", sm: "flex" },
            flexDirection: "row",
            gap: 1,
            width: { xs: "100%", md: "fit-content" },
            overflow: "auto",
          }}
        >
          <Search handleSearch={handleSearch} searchTitles={searchTitles} />
        </Box>
      </Box>

      {/* POSTS GRID */}
      {/* POSTS GRID - Rendering maximum 6 posts with fixed layout */}
      <Grid container spacing={2} columns={12}>
        {/* Post 0 (Top Left) - md={6} */}
        {displayedPosts[0] && (
          <Grid item size={{ xs: 12, md: 6 }} key={displayedPosts[0].post_id}>
            {/* navigate to specific post*/}
            <StyledLink to={`/post/${displayedPosts[0].post_id}`}>
              <SyledCard
                variant="outlined"
                onFocus={() => handleFocus(0)} // Index 0
                onBlur={handleBlur}
                tabIndex={0}
                className={focusedCardIndex === 0 ? "Mui-focused" : ""}
              >
                {displayedPosts[0].url && (
                  <CardMedia
                    component="img"
                    alt={displayedPosts[0].title}
                    image={displayedPosts[0].url}
                    sx={{
                      aspectRatio: "16 / 9",
                      borderBottom: "1px solid",
                      borderColor: "divider",
                    }}
                  />
                )}
                <SyledCardContent>
                  {displayedPosts[0].tag && displayedPosts[0].tag.tag && (
                    <Typography gutterBottom variant="caption" component="div">
                      {displayedPosts[0].tag.tag}
                    </Typography>
                  )}
                  <Typography gutterBottom variant="h6" component="div">
                    {displayedPosts[0].title}
                  </Typography>
                  <StyledTypography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(displayedPosts[0].content)
                    }}
                  />
                </SyledCardContent>
                {displayedPosts[0].author && (
                  <Author author={displayedPosts[0].author.username} date={displayedPosts[0].created_at}/>
                )}
              </SyledCard>
            </StyledLink>
          </Grid>
        )}

        {/* Post 1 (Top Right) - md={6} */}
        {displayedPosts[1] && (
          <Grid item size={{ xs: 12, md: 6 }} key={displayedPosts[1].post_id}>
            <StyledLink to={`/post/${displayedPosts[1].post_id}`}>
            <SyledCard
              variant="outlined"
              onFocus={() => handleFocus(1)} // Index 1
              onBlur={handleBlur}
              tabIndex={0}
              className={focusedCardIndex === 1 ? "Mui-focused" : ""}
            >
              {displayedPosts[1].url && (
                <CardMedia
                  component="img"
                  alt={displayedPosts[1].title}
                  image={displayedPosts[1].url}
                  aspect-ratio="16 / 9"
                  sx={{
                    borderBottom: "1px solid",
                    borderColor: "divider",
                  }}
                />
              )}
              <SyledCardContent>
                {displayedPosts[1].tag && displayedPosts[1].tag.tag && (
                  <Typography gutterBottom variant="caption" component="div">
                    {displayedPosts[1].tag.tag}
                  </Typography>
                )}
                <Typography gutterBottom variant="h6" component="div">
                  {displayedPosts[1].title}
                </Typography>
                <StyledTypography
                  variant="body2"
                  color="text.secondary"
                  gutterBottom
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(displayedPosts[1].content)
                  }}
                />
              </SyledCardContent>
              {displayedPosts[1].author && (
                <Author author={displayedPosts[1].author.username} date={displayedPosts[1].created_at}/>
              )}
            </SyledCard>
            </StyledLink>
          </Grid>
        )}

        {/* Post 2 (Middle Left) - md={4} */}
        {displayedPosts[2] && (
          <Grid item size={{ xs: 12, md: 4 }} key={displayedPosts[2].post_id}>
            <StyledLink to={`/post/${displayedPosts[2].post_id}`}>
            <SyledCard
              variant="outlined"
              onFocus={() => handleFocus(2)} // Index 2
              onBlur={handleBlur}
              tabIndex={0}
              className={focusedCardIndex === 2 ? "Mui-focused" : ""}
              sx={{ height: "100%" }}
            >
              {displayedPosts[2].url && (
                <CardMedia
                  component="img"
                  alt={displayedPosts[2].title}
                  image={displayedPosts[2].url}
                  sx={{
                    height: { sm: "auto", md: "50%" },
                    aspectRatio: { sm: "16 / 9", md: "" },
                  }}
                />
              )}
              <SyledCardContent>
                {displayedPosts[2].tag && displayedPosts[2].tag.tag && (
                  <Typography gutterBottom variant="caption" component="div">
                    {displayedPosts[2].tag.tag}
                  </Typography>
                )}
                <Typography gutterBottom variant="h6" component="div">
                  {displayedPosts[2].title}
                </Typography>
                <StyledTypography
                  variant="body2"
                  color="text.secondary"
                  gutterBottom
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(displayedPosts[2].content)
                  }}
                />
              </SyledCardContent>
              {displayedPosts[2].author && (
                <Author author={displayedPosts[2].author.username} date={displayedPosts[2].created_at}/>
              )}
            </SyledCard>
            </StyledLink>
          </Grid>
        )}

        {/* Posts 3 and 4 (Middle Stacked) - md={4} - Render as ONE Grid Item */}
        {/* Check if BOTH post 3 and post 4 exist before rendering this combined block */}
        {displayedPosts[3] && displayedPosts[4] && (
          <Grid item size={{ xs: 12, md: 4 }} key={`posts-3-4-stacked`}>
            {" "}
            {/* Unique key for the combined item */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                height: "100%",
              }}
            >
              {/* Card for Post 3 (Above) - No Image */}
              <StyledLink to={`/post/${displayedPosts[3].post_id}`}>
              <SyledCard
                variant="outlined"
                onFocus={() => handleFocus(3)} // Index 3
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
                    {displayedPosts[3].tag && displayedPosts[3].tag.tag && (
                      <Typography
                        gutterBottom
                        variant="caption"
                        component="div"
                      >
                        {displayedPosts[3].tag.tag}
                      </Typography>
                    )}
                    <Typography gutterBottom variant="h6" component="div">
                      {displayedPosts[3].title}
                    </Typography>
                    <StyledTypography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(displayedPosts[3].content)
                      }}
                    />
                  </div>
                </SyledCardContent>
                {displayedPosts[3].author && (
                  <Author author={displayedPosts[3].author.username} date={displayedPosts[3].created_at}/>
                )}
              </SyledCard>
                </StyledLink>
              {/* Card for Post 4 (Below) - No Image */}
              <StyledLink to={`/post/${displayedPosts[4].post_id}`}>
              <SyledCard
                variant="outlined"
                onFocus={() => handleFocus(4)} // Index 4
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
                    {displayedPosts[4].tag && displayedPosts[4].tag.tag && (
                      <Typography
                        gutterBottom
                        variant="caption"
                        component="div"
                      >
                        {displayedPosts[4].tag.tag}
                      </Typography>
                    )}
                    <Typography gutterBottom variant="h6" component="div">
                      {displayedPosts[4].title}
                    </Typography>
                    <StyledTypography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(displayedPosts[4].content)
                      }}
                    />
                  </div>
                </SyledCardContent>
                {displayedPosts[4].author && (
                  <Author author={displayedPosts[4].author.username} date={displayedPosts[4].created_at}/>
                )}
              </SyledCard>
              </StyledLink>
            </Box>
          </Grid>
        )}

        {/* Post 5 (Middle Right / Bottom Left) - md={4} */}
        {displayedPosts[5] && (
          <Grid item size={{ xs: 12, md: 4 }} key={displayedPosts[5].post_id}>
            <StyledLink to={`/post/${displayedPosts[5].post_id}`}>
            <SyledCard
              variant="outlined"
              onFocus={() => handleFocus(5)} // Index 5
              onBlur={handleBlur}
              tabIndex={0}
              className={focusedCardIndex === 5 ? "Mui-focused" : ""}
              sx={{ height: "100%" }}
            >
              {displayedPosts[5].url && (
                <CardMedia
                  component="img"
                  alt={displayedPosts[5].title}
                  image={displayedPosts[5].url}
                  sx={{
                    height: { sm: "auto", md: "50%" },
                    aspectRatio: { sm: "16 / 9", md: "" },
                  }}
                />
              )}
              <SyledCardContent>
                {displayedPosts[5].tag && displayedPosts[5].tag.tag && (
                  <Typography gutterBottom variant="caption" component="div">
                    {displayedPosts[5].tag.tag}
                  </Typography>
                )}
                <Typography gutterBottom variant="h6" component="div">
                  {displayedPosts[5].title}
                </Typography>
                <StyledTypography
                  variant="body2"
                  color="text.secondary"
                  gutterBottom
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(displayedPosts[5].content)
                  }}
                />
              </SyledCardContent>
              {displayedPosts[5].author && (
                <Author author={displayedPosts[5].author.username} date={displayedPosts[5].created_at}/>
              )}
            </SyledCard>
            </StyledLink>
          </Grid>
        )}
      </Grid>

      {/* PAGINATION SECTION */}
      <Box sx={{ display: "flex", flexDirection: "row", pt: 4 }}>
        <Pagination
          hidePrevButton
          hideNextButton
          count={trueTotalPage}
          page={currentPage}
          onChange={hadnlePageChange}
          boundaryCount={2}
          siblingCount={1}
        />
      </Box>
    </Box>
  );
}
