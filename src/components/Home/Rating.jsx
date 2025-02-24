import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const Rating = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(<Star key={i} icon={faStar} isActive />);
    } else if (i - 0.5 === rating) {
      stars.push(<Star key={i} icon={faStarHalfAlt} isActive />);
    } else {
      stars.push(<Star key={i} icon={faStar} />);
    }
  }

  return <StarContainer>{stars}</StarContainer>;
};

// 📌 Styled Components
const StarContainer = styled.span`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Star = styled(FontAwesomeIcon)`
  color: ${(props) => (props.isActive ? "#FFD700" : "#ccc")};
  font-size: 16px;
`;

export default Rating;
