import { Alignment, AnchorButton, Button, Icon, Navbar, NavbarDivider, NavbarGroup, NavbarHeading } from "@blueprintjs/core";
import React from "react";
import styled from "styled-components";
import logo from '../logo.png';

const MyNavbar = styled(Navbar)`
  background: rgba(0,0,0,0.5);
`

const RestaurantIcon = styled.img`
  width: 35px;
  height: 35px;
`;

const MyAnchorButton = styled(AnchorButton)`
  outline: none;
`

const TopBar: React.FC = () => {

  return (
    <div>
      <MyNavbar>
        <NavbarGroup align={Alignment.LEFT}>
          <MyAnchorButton href="/reservations" minimal={true} style={{ backgroundColor: 'transparent' }}>
            <RestaurantIcon src={process.env.PUBLIC_URL + '/logo.png'} alt="Logo"/>
          </MyAnchorButton>
          <NavbarHeading>Gleblu</NavbarHeading>
          <MyAnchorButton href="/reservations" text="Reservations" minimal={true} style={{ backgroundColor: 'transparent' }}/>
          <MyAnchorButton href="/reservations/create" text="Add reservation" minimal={true} style={{ backgroundColor: 'transparent' }}/>
        </NavbarGroup>
      </MyNavbar>
    </div>
  );
};

export default TopBar;
