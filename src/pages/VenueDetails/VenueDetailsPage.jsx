import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate, useParams } from "react-router-dom";

const VenueDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [numberOfGuests, setNumberOfGuests] = useState(1);

  useEffect(() => {
    const fetchVenueDetails = async () => {
      try {
        const response = await fetch(
          `https://v2.api.noroff.dev/holidaze/venues/${id}?_media=true&_meta=true`
        );
        const responseData = await response.json();

        console.log("📌 API'den gelen venue verisi:", responseData);

        if (!response.ok) {
          throw new Error("Failed to fetch venue details.");
        }

        setVenue(responseData.data);
      } catch (error) {
        console.error("❌ Venue detayları alınamadı:", error);
        setError(true);
      }
      setLoading(false);
    };

    fetchVenueDetails();
  }, [id]);

  if (loading) return <p>Loading venue details...</p>;
  if (error || !venue) return <p>Failed to load venue details.</p>;

  const {
    name = "Venue Name Not Available",
    description = "Description not available.",
    price = "Not Available",
    maxGuests = "Not Specified",
    rating = "No Rating",
    media = [],
  } = venue;

  const calculateTotalPrice = () => {
    if (!startDate || !endDate || price === "Not Available") return "N/A";
    const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
    return `$${days * price}`;
  };

  const handleConfirm = async () => {
    if (!startDate || !endDate) {
      alert("Please select both start and end dates!");
      return;
    }

    const token = localStorage.getItem("authToken");
    const apiKey = localStorage.getItem("apiKey");

    if (!token || !apiKey) {
      alert("⚠ Authorization required! Please log in.");
      navigate("/login");
      return;
    }

    try {
      const response = await fetch("https://v2.api.noroff.dev/holidaze/bookings", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "X-Noroff-API-Key": apiKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          venueId: id,
          dateFrom: startDate.toISOString(),
          dateTo: endDate.toISOString(),
          guests: numberOfGuests,
        }),
      });

      const data = await response.json();
      console.log("📌 API Booking Response:", data);

      if (!response.ok) {
        throw new Error(data.message || "Booking failed.");
      }

      alert("✅ Booking confirmed!");

      navigate("/confirm", { 
        state: { 
          id: data.data.id, 
          venueName: name, 
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
          guests: numberOfGuests 
        }
      });

    } catch (error) {
      console.error("❌ Booking Error:", error.message);
      alert("Booking failed: " + error.message);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
        padding: "30px",
        maxWidth: "700px",
        margin: "auto",
        borderRadius: "12px",
        boxShadow: "0 6px 15px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#f9f9f9",
        marginTop: "6rem",
        marginBottom: "6rem",
      }}
    >
      <h1 style={{ fontSize: "26px", fontWeight: "bold", color: "#003366" }}>{name}</h1>
      {media.length > 0 ? (
        <img
          src={media[0].url}
          alt="Venue"
          style={{
            width: "100%",
            maxHeight: "320px",
            objectFit: "cover",
            borderRadius: "12px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          }}
        />
      ) : (
        <p>No Image Available</p>
      )}
      <p style={{ textAlign: "center", color: "#555", fontSize: "16px", lineHeight: "1.5" }}>
        {description}
      </p>
      <p>
        <strong>💰 Price per night:</strong> <span style={{ color: "#0066cc", fontWeight: "bold" }}>${price}</span>
      </p>
      <p>
        <strong>🛏 Max Guests:</strong> {maxGuests}
      </p>
      <p style={{ display: "flex", alignItems: "center", gap: "5px" }}>
        <FontAwesomeIcon icon={faStar} style={{ color: "gold" }} />
        {rating}
      </p>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          width: "100%",
        }}
      >
        <label>
          <strong>Select Start Date:</strong>
        </label>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          className="datepicker-input"
        />
        <label>
          <strong>Select End Date:</strong>
        </label>
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          className="datepicker-input"
        />
        <label>
          <strong>Number of Guests:</strong>
        </label>
        <input
  type="number"
  value={numberOfGuests}
  min="1"
  max={maxGuests}
  onChange={(e) => {
    const guests = Number(e.target.value); // String değil, sayı olarak al
    if (guests >= 1 && guests <= maxGuests) {
      setNumberOfGuests(guests);
    }
  }}
  className="input-field"
/>

      </div>
      <button
        onClick={handleConfirm}
        style={{
          backgroundColor: "#EA6659",
          color: "white",
          padding: "12px 24px",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontWeight: "bold",
          transition: "background 0.3s ease",
        }}
      >
        BOOK NOW
      </button>
      <p style={{ fontSize: "18px", fontWeight: "bold" }}>
        <strong>Total Price:</strong> {calculateTotalPrice()}
      </p>
    </div>
  );
};

export default VenueDetailsPage;
