import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

// 🎨 Styled Components
const Container = styled.div`
  text-align: center;
  padding: 20px;
`;

const AvatarContainer = styled.div`
  position: relative;
  display: inline-block;
  margin-bottom: 10px;
`;

const AvatarImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #ddd;
`;

const EditIcon = styled(FontAwesomeIcon)`
  position: absolute;
  bottom: 5px;
  right: 5px;
  background-color: #fff;
  border-radius: 50%;
  padding: 5px;
  cursor: pointer;
  border: 1px solid #ddd;
`;

const WelcomeMessage = styled.h3`
  color: #28a745;
  font-size: 22px;
  margin-top: 15px;
`;

const Button = styled.button`
  background-color: ${(props) => (props.primary ? "#EA6659" : "#28a745")};
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 15px;

  &:hover {
    background-color: ${(props) => (props.primary ? "#d6544f" : "#218838")};
  }
`;

const DashboardPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isVenueManager, setIsVenueManager] = useState(false);
  const [showRegisterButton, setShowRegisterButton] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      navigate("/login");
    } else {
      setUser(storedUser);
      setIsVenueManager(storedUser.venueManager);
    }
  }, [navigate]);

  const becomeVenueManager = () => {
    if (!user) return;

    const updatedUser = { ...user, venueManager: true };
    setUser(updatedUser);
    setIsVenueManager(true);
    localStorage.setItem("user", JSON.stringify(updatedUser));

    // Kullanıcıyı hemen yönlendirme, önce "Welcome" mesajını göster
    setShowRegisterButton(true);
  };

  const goToAvatarPage = () => {
    navigate("/avatar");
  };

  return (
    <Container>
      <h1>Dashboard</h1>

      {/* Avatar ve düzenleme ikonu */}
      <AvatarContainer>
        {user?.avatar?.url ? (
          <AvatarImage
            src={user.avatar.url}
            alt="Avatar"
            onError={(e) => {
              e.target.src =
                "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png";
            }}
          />
        ) : (
          <p>No Avatar Available</p>
        )}
        {/* Kalem simgesi */}
        <EditIcon
          icon={faPencilAlt}
          onClick={goToAvatarPage}
          title="Edit Avatar"
        />
      </AvatarContainer>

      <p>
        <strong>Username:</strong> {user?.name}
      </p>
      <p>
        <strong>Email:</strong> {user?.email}
      </p>
      <p>
        <strong>Venue Manager:</strong> {isVenueManager ? "Yes" : "No"}
      </p>

      {/* Venue Manager Butonları */}
      {!isVenueManager ? (
        <Button primary onClick={becomeVenueManager}>
          Become a Venue Manager
        </Button>
      ) : (
        <>
          <WelcomeMessage>🎉 Welcome, Venue Manager!</WelcomeMessage>
          {showRegisterButton && (
            <Button onClick={() => navigate("/registervenue")}>
              Register New Venue
            </Button>
          )}
        </>
      )}
    </Container>
  );
};

export default DashboardPage;
