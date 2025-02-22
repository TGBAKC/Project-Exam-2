import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";


const Container = styled.div`
  text-align: center;
  padding: 40px 20px;
  background-color: #f8f9fa;
  min-height: 100vh;
`;


const VenueCard = styled.div`
  background: #ffffff;
  padding: 25px;
  border-radius: 12px;
  margin: 20px auto;
  max-width: 600px;
  text-align: left;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.15);
  }
`;


const Button = styled.button`
  background: linear-gradient(135deg, #003366, #0055aa);
  color: #ffffff;
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  margin: 10px;
  font-weight: 500;
  transition: background 0.3s ease, transform 0.2s ease;

  &:hover {
    background: linear-gradient(135deg, #0055aa, #0077cc);
    transform: scale(1.05);
  }
`;



const MyVenues = () => {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("authToken");
    const apiKey = localStorage.getItem("apiKey");

    if (!user || !token || !apiKey) {
      alert("⚠ Yetkilendirme bilgisi eksik! Lütfen tekrar giriş yapın.");
      navigate("/login");
      return;
    }

    const fetchVenues = async () => {
      try {
        const response = await fetch(
          `https://v2.api.noroff.dev/holidaze/profiles/${user.name}/venues`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "X-Noroff-API-Key": apiKey,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch venues.");
        }

        const data = await response.json();
        setVenues(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVenues();
  }, [navigate]);

  if (loading) return <p>Loading your venues...</p>;
  if (error) return <p style={{ color: "red" }}>❌ {error}</p>;

  return (
    <Container>
      <h1 style={{ marginBottom: "20px", color: "#003366" }}>My Venues</h1>
      {venues.length === 0 ? (
        <p>You haven't created any venues yet.</p>
      ) : (
        venues.map((venue) => (
          <VenueCard key={venue.id}>
            <h2 style={{ color: "#0055aa" }}>{venue.name}</h2>
            <p>
              <strong>📍 Address:</strong> {venue.location?.address}, {venue.location?.city},{" "}
              {venue.location?.zip}, {venue.location?.country}
            </p>
            <p>
              <strong>⭐ Rating:</strong> {venue.rating || "Not Rated"}
            </p>
            <p>
              <strong>🛏 Sleeps:</strong> {venue.maxGuests}
            </p>
            <p>
              <strong>📶 WiFi:</strong> {venue.wifi ? "Available" : "Not Available"}
            </p>
            <p>
              <strong>🚗 Parking:</strong> {venue.parking ? "Available" : "Not Available"}
            </p>
            <p>
              <strong>🍽 Breakfast:</strong> {venue.breakfast ? "Included" : "Not Included"}
            </p>
            <p>
              <strong>🐾 Pets:</strong> {venue.pets ? "Allowed" : "Not Allowed"}
            </p>
            <p>
              <strong>💰 Rate (€):</strong> {venue.price}
            </p>
            <p>
              <strong>📝 Description:</strong> {venue.description}
            </p>
            <p>
              <strong>📅 Venue Created:</strong> {new Date(venue.created).toLocaleDateString()}
            </p>

            <Button onClick={() => navigate(`/venues/${venue.id}/edit`)}>✏️ Update Venue</Button>
            <Button onClick={() => navigate(`/venues/${venue.id}`)}>🔍 View Venue</Button>
          </VenueCard>
        ))
      )}
      <Button onClick={() => navigate("/dashboard")}>🏠 Back to Dashboard</Button>
    </Container>
  );
};

export default MyVenues;
