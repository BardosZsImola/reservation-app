import { Alignment, AnchorButton, Navbar, NavbarGroup, NavbarHeading, NavbarDivider } from '@blueprintjs/core';
import React from 'react';
import styled from 'styled-components';

const Brand = styled(NavbarHeading)`
  color: #9c27b0;
  font-size: 30px;
  font-weight: bold;
`;

const MyNavbar = styled(Navbar)`
  background-color: #30404d;
  height: 70px;
  padding-top: 10px;
`;

const RestaurantIcon = styled.img`
  width: 45px;
  height: 45px;
`;

const MyAnchorButton = styled(AnchorButton)`
  outline: none;
  font-size: 18px;
  &:hover > * {
    color: #f2c37e;
  }
`;

const TopBar: React.FC = () => {
  return (
    <MyNavbar>
      <NavbarGroup align={Alignment.LEFT}>
        <MyAnchorButton href="/reservations" minimal={true} style={{ backgroundColor: 'transparent' }}>
          <RestaurantIcon src={`${process.env.PUBLIC_URL}/logo.png`} alt="Logo" />
        </MyAnchorButton>
        <Brand>Gleblu</Brand>
        <NavbarDivider />
        <MyAnchorButton
          href="/reservations"
          text="Reservations"
          minimal={true}
          style={{ backgroundColor: 'transparent', color: 'white', opacity: '0.8' }}
        />
        <MyAnchorButton
          href="/reservations/create"
          text="Add reservation"
          minimal={true}
          style={{ backgroundColor: 'transparent', color: 'white', opacity: '0.8' }}
        />
      </NavbarGroup>
    </MyNavbar>
  );
};

export default TopBar;
