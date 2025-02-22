import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

// 🎨 Kart ve İçerik Tasarımı
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px;
  max-width: 450px;
  margin: 80px auto;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  background-color: #fff;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 26px;
  font-weight: bold;
  color: #003366;
  margin-bottom: 10px;
`;

const Subtitle = styled.h3`
  font-size: 18px;
  color: #444;
  margin-bottom: 15px;
`;

const InfoText = styled.p`
  font-size: 16px;
  color: #555;
  margin: 8px 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 20px;
`;

// 🎨 Buton Tasarımı
const Button = styled.button`
  background: ${(props) => props.bgColor || "#ccc"};
  color: ${(props) => (props.bgColor === "#dc3545" ? "#fff" : "#000")};
  padding: 12px 18px;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    opacity: 0.85;
    transform: translateY(-2px);
  }
`;

const ConfirmPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingDetails = location.state || {}; 

  const { id, venueName, startDate, endDate, guests } = bookingDetails;

  if (!bookingDetails || Object.keys(bookingDetails).length === 0) {
    return (
      <Container>
        <Title>No Booking Found</Title>
        <InfoText>Please make a booking first.</InfoText>
      </Container>
    );
  }

  const handleDelete = async () => {
    const token = localStorage.getItem("authToken");
    if (!id || id === "undefined") {
      alert("❌ Error: Invalid Booking ID!");
      return;
    }

    try {
      const response = await fetch(
        `https://v2.api.noroff.dev/holidaze/bookings/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(
          `❌ API Error: ${
            responseData.message || "Failed to delete booking"
          } (Status: ${response.status})`
        );
      }

      alert("✅ Booking deleted successfully!");
      navigate("/dashboard");
    } catch (error) {
      alert("Error deleting booking: " + error.message);
    }
  };

  const handleEdit = () => {
    console.log("🟢 Edit butonuna basıldı, yönlendiriliyor...");
    if (!bookingDetails.id) {
      alert("❌ Error: Invalid Booking ID!");
      return;
    }
    navigate(`/bookings/${bookingDetails.id}/edit`, { state: { booking: bookingDetails } });
  };

  return (
    <Container>
      <Title>✅ Booking Confirmed!</Title>
      <Subtitle>Booking Details</Subtitle>
      <InfoText>
        <strong>🏨 Venue:</strong> {venueName}
      </InfoText>
      <InfoText>
        <strong>📅 Start Date:</strong> {new Date(startDate).toLocaleDateString()}
      </InfoText>
      <InfoText>
        <strong>📆 End Date:</strong> {new Date(endDate).toLocaleDateString()}
      </InfoText>
      <InfoText>
        <strong>👤 Guests:</strong> {guests}
      </InfoText>

    
    </Container>
  );
};

export default ConfirmPage;
