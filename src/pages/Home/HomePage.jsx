import { useEffect, useState } from "react";
import styled from "styled-components";
import SearchBar from "../../components/Home/SearchBar";
import VenueCardComponent from "../../components/Home/VenueCard";

const HomePage = () => {
  const [venues, setVenues] = useState([]);
  const [filteredVenues, setFilteredVenues] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchVenues();
  }, []);

  const fetchVenues = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://v2.api.noroff.dev/holidaze/venues?_media=true&_meta=true`);
      if (!response.ok) {
        throw new Error("API request failed");
      }

      const data = await response.json();
      console.log("API Response:", data);

      const venuesList = data.data || data;
      setVenues(venuesList);
      setFilteredVenues(venuesList);
    } catch (err) {
      setError("Failed to fetch venues. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = ({ destination }) => {
    if (!destination) {
      setFilteredVenues(venues);
      return;
    }

    const filteredData = venues.filter((venue) =>
      venue.name.toLowerCase().includes(destination.toLowerCase())
    );

    setFilteredVenues(filteredData);
  };

  return (
    <Container>
      <Title>Discover Amazing Holiday Venues</Title>
      <SearchBar onSearch={handleSearch} />

      {loading && <p>Loading venues...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <VenueGrid>
        {filteredVenues.length > 0 ? (
          filteredVenues.map((venue) => (
            <VenueCardComponent key={venue.id} venue={venue} />
          ))
        ) : (
          !loading && <p>No venues found.</p>
        )}
      </VenueGrid>
    </Container>
  );
};

// 📌 Styled Components
const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const VenueGrid = styled.div`
  display: flex;
  flex-wrap: wrap; /* Kartların satırda daha az görünmesini sağlar */
  justify-content: center;
  gap: 20px;
  max-width: 1200px; /* Sayfanın çok geniş olmasını engeller */
`;

export default HomePage;
