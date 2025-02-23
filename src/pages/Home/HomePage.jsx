import { useEffect, useState } from "react";

import {
  Container,
  Title,
  VenueGrid,
} from "../../styled-components/Home/HomePage.styles";

import SearchBar from "../../components/Home/SearchBar";
import VenueCardComponent from "../../components/Home/VenueCard";

const HomePage = () => {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchVenues = async (searchQuery = "") => {
    setLoading(true);
    setError(null);

    try {
      let url = `https://v2.api.noroff.dev/holidaze/venues?_media=true&_meta=true`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("API request failed");
      }

      const data = await response.json();
      console.log("API Raw Response:", data); 

      const venuesList = data.data || data; 

      const filteredData = venuesList
        .filter((venue) =>
          venue.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .map((venue) => ({
          ...venue,
          media: venue.media || [], 
        }));

      setVenues(filteredData);
    } catch (err) {
      setError("Failed to fetch venues. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVenues();
  }, []);

  return (
    <Container>
      <Title>Discover Amazing Holidays Venues</Title>
      <SearchBar onSearch={fetchVenues} />
      {loading && <p>Loading venues...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <VenueGrid>
        {venues.length > 0
          ? venues.map((venue) => (
              <VenueCardComponent key={venue.id} venue={venue} />
            ))
          : !loading && <p>No venues found.</p>}
      </VenueGrid>
    </Container>
  );
};

export default HomePage;
