import Login from './Login';

import { Row, Col, Card, Navbar, NavbarBrand, Container, NavLink} from 'react-bootstrap';
import NavbarToggle from 'react-bootstrap/esm/NavbarToggle';

const Header = ({ auth, handleSignIn, handleSignOut }) => {
    return (
        <Navbar bg="dark" expand="lg" style={{"marginBottom": "10px"}}>
            <Container>
                <NavbarBrand style={{"color": "white"}}>
                    Google Calendar Data Visualization
                </NavbarBrand>
                <NavLink>
                    <Login 
                        auth={auth} 
                        handleSignIn={handleSignIn} 
                        handleSignOut={handleSignOut}
                        style={{"justifyContent": "end"}}
                    />
                </NavLink>
            </Container>
        </Navbar>
    )
}

export default Header;