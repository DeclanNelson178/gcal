import React, { useState } from 'react';

import ApiCalendar from 'react-google-calendar-api';
import Container from 'react-bootstrap/Container';
import { CardGroup, Stack } from 'react-bootstrap';

import Header from './components/Header';
import Body from './components/Body';

const App = () => {

  const [auth, setAuth] = useState(false);

  const handleSignIn = (e) => {
    ApiCalendar.handleAuthClick();
    if (ApiCalendar.sign) {
      setAuth(true);
    }
  }
  
  const handleSignOut = (e) => {
    ApiCalendar.handleSignoutClick();
    setAuth(false);
  }

  return (
    <Container className="p-3">
      <Header handleSignIn={handleSignIn} handleSignOut={handleSignOut} auth={auth}/>
      <CardGroup>
        <Stack>
          {!auth ? <></> : <Body/>}
        </Stack>
      </CardGroup>
    </Container>
  );
}

export default App;