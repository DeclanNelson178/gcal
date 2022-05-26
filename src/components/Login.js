import { Container } from "react-bootstrap";
import { Button } from "react-bootstrap";

const Login = ({ auth, handleSignIn, handleSignOut }) => {
    return (
        <Container>
            {auth ? <Button onClick={(e) => handleSignOut(e)} variant='secondary'>Sign Out</Button> :
            <Button onClick={(e) => handleSignIn(e)} variant='primary'>Sign In With Google</Button>
            }
        </Container>

    )
}

export default Login