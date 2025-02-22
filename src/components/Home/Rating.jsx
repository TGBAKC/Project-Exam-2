import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Rating = ({ rating }: { rating: number }) => {
  const stars: any = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(
        <FontAwesomeIcon key={i} icon={faStar} style={{ color: "#FFD700" }} />
      );
    } else if (i - 0.5 === rating) {
      stars.push(
        <FontAwesomeIcon
          key={i}
          icon={faStarHalfAlt}
          style={{ color: "#FFD700" }}
        />
      );
    } else {
      stars.push(
        <FontAwesomeIcon key={i} icon={faStar} style={{ color: "#ccc" }} />
      );
    }
  }
  return <span>{stars}</span>;
};

export default Rating;
