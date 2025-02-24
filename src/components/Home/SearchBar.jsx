import React, { useState } from "react";
import styled from "styled-components";

const SearchBar = ({ onSearch }) => {
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [guests, setGuests] = useState(1);

  const handleSearch = () => {
    onSearch({ destination, startDate, endDate, guests }); // HomePage'e gönder
  };

  return (
    <SearchContainer>
    
      <InputGroup>
        <Label>Search Destination</Label>
        <Input
          type="text"
          placeholder="Enter destination..."
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
      </InputGroup>

      <InputGroup>
        <Label>Start Date</Label>
        <Input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </InputGroup>

      {/* Bitiş Tarihi */}
      <InputGroup>
        <Label>End Date</Label>
        <Input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </InputGroup>

      {/* Misafir Sayısı */}
      <InputGroup>
        <Label>Guests</Label>
        <Input
          type="number"
          min="1"
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
        />
      </InputGroup>

     
      <ButtonContainer>
        <SearchButton onClick={handleSearch}>🔍 Search</SearchButton>
      </ButtonContainer>
    </SearchContainer>
  );
};


const SearchContainer = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 15px;
  padding: 15px;
  background-color: #f8f8f8;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 160px;
  font-size: 14px;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100%; /* Butonun inputlarla aynı hizada olmasını sağlar */
`;

const SearchButton = styled.button`
  background-color: #e57373;
  color: white;
  border: none;
  padding: 12px 30px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: background 0.3s;

  &:hover {
    background-color: #d64d4d;
  }
`;

export default SearchBar;
