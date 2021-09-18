import React from 'react';
import {
    Navbar,
    NavbarBrand,
} from 'reactstrap';

const Header = () => {
    return (
        <Navbar color="light" light>
            <NavbarBrand className="col-md-3 ms-3" >Youkraft Forms</NavbarBrand>
        </Navbar>
    );
};

export default Header;
