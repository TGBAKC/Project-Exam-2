import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  AvailabilityText,
  VenueCard,
  VenueImage,
} from "../../styled-components/Home/HomePage.styles";
import Rating from "./Rating";

const VenueCardComponent = ({ venue }) => (
  <VenueCard to={`/venues/${venue.id}`} key={venue.id}>
    {venue.media?.length > 0 && (
      <VenueImage src={venue.media[0].url} alt={venue.name} />
    )}
    <p>
      <strong>
        {venue.name.length > 40
          ? `${venue.name.substring(0, 40)}...`
          : venue.name}
      </strong>
    </p>
    <p>
      <strong>Rating:</strong> <Rating rating={venue.rating || 0} />
    </p>
    <p>
      <FontAwesomeIcon
        icon={faMapMarkerAlt}
        style={{ color: "#EA6659", marginRight: "5px" }}
      />
      {venue.location?.address || "Address not available"}
    </p>
    <p>Price: ${venue.price}</p>
    <p>Max Guests: {venue.maxGuests}</p>
    <p>Rating: {venue.rating}</p>
    <AvailabilityText>CHECK AVAILABILITY</AvailabilityText>
  </VenueCard>
);

export default VenueCardComponent;
