import { useState, useEffect } from "react";
import { Typography, Box } from "@mui/material";
import { useParams } from "react-router-dom";

import { fetchFromAPI } from "../utils/fetchFromAPI";
import { Videos } from "./";

const SearchFeed = () => {
  const [videos, setVideos] = useState(null);
  const [error, setError] = useState("");
  const { searchTerm } = useParams();

  useEffect(() => {
    setVideos(null);
    setError("");

    const loadVideos = async () => {
      try {
        const data = await fetchFromAPI(`search?part=snippet&q=${searchTerm}`);
        setVideos(data.items || []);
      } catch (requestError) {
        setVideos([]);
        setError("Search results could not be loaded. Check your RapidAPI key, quota, or service status.");
      }
    };

    loadVideos();
  }, [searchTerm]);

  return (
    <Box p={2} minHeight="95vh">
      <Typography variant="h4" fontWeight={900}  color="white" mb={3} ml={{ sm: "100px"}}>
        Search Results for <span style={{ color: "#FC1503" }}>{searchTerm}</span> videos
      </Typography>
      <Box display="flex">
        <Box sx={{ mr: { sm: '100px' } }}/>
        <Videos videos={videos} error={error} />
      </Box>
    </Box>
  );
};

export default SearchFeed;
