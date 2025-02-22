import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp, faCalendar, faUser, faEnvelope, faMoneyBillWave } from "@fortawesome/free-solid-svg-icons";

// 📌 Stil Ayarları
const BookingContainer = styled.div`
  background-color: #f4f8ff;
  border-radius: 12px;
  padding: 15px;
  width: 100%;
  max-width: 750px;
  transition: all 0.3s ease-in-out;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
`;

const BookingHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
  font-weight: bold;
  color: #004b8d;
  padding: 10px;
  cursor: pointer;
  border-bottom: 1px solid #ddd;
`;

const DetailsContainer = styled.div`
  background-color: white;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  margin-top: 10px;
  animation: fadeIn 0.3s ease-in-out;
`;

const DetailRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  padding: 6px 0;
  color: #333;
  strong {
    color: #004b8d;
  }
`;

const ToggleButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: #004b8d;
  font-size: 18px;
`;

const BookingListItem = ({ booking }) => {
  const [isOpen, setIsOpen] = useState(false);

  console.log("📌 Booking Data:", booking); // 🟢 Gelen veriyi görmek için

  // 📌 API'den fiyatın doğru yerden alındığını kontrol edelim
  const pricePerNight = booking.venue?.price ?? 0; // Eğer `booking.venue.price` yoksa varsayılan 0 yap
  const guests = booking.guests ?? 1; // Eğer `booking.guests` undefined ise 1 yap
  const totalPrice = ((pricePerNight * guests) || 0).toFixed(2); // Hesaplama hatasını önleyelim

  return (
    <BookingContainer>
      {/* 📌 Üst Satır */}
      <BookingHeader onClick={() => setIsOpen(!isOpen)}>
        <span>{booking.venue?.name || "Unknown Venue"}</span>
        <span>
          <FontAwesomeIcon icon={faCalendar} />{" "}
          {new Date(booking.dateFrom).toLocaleDateString()} -{" "}
          {new Date(booking.dateTo).toLocaleDateString()}
        </span>
        <ToggleButton>
          <FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown} />
        </ToggleButton>
      </BookingHeader>

      {/* 📌 Açılınca Gözükecek Detaylar */}
      {isOpen && (
        <DetailsContainer>
          <h3>📖 Booking Details</h3>
          <DetailRow>
            <FontAwesomeIcon icon={faCalendar} />
            <strong>Created:</strong> {new Date(booking.created).toLocaleDateString()}
          </DetailRow>
          <DetailRow>
            <FontAwesomeIcon icon={faMoneyBillWave} />
            <strong>💰 Booking Value:</strong> €{totalPrice}
          </DetailRow>
          <DetailRow>
            <FontAwesomeIcon icon={faMoneyBillWave} />
            <strong>💵 Price per Night:</strong> €{pricePerNight.toFixed(2)}
          </DetailRow>

          <h3>👤 Guest Details</h3>
          <DetailRow>
            <FontAwesomeIcon icon={faUser} />
            <strong>Number of Guests:</strong> {guests}
          </DetailRow>
          <DetailRow>
            <FontAwesomeIcon icon={faUser} />
            <strong>Contact Person:</strong> {booking.customer?.name || "Unknown"}
          </DetailRow>
          <DetailRow>
            <FontAwesomeIcon icon={faEnvelope} />
            <strong>📧 Contact Email:</strong> {booking.customer?.email || "No email"}
          </DetailRow>
        </DetailsContainer>
      )}
    </BookingContainer>
  );
};

export default BookingListItem;
