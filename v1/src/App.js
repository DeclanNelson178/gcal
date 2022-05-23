import React, { useState } from 'react';

import ApiCalendar from 'react-google-calendar-api';
import DatePicker from 'react-date-picker';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import DisplayData from './components/DisplayData';

const App = () => {

  const [auth, setAuth] = useState(false);
  const [processed, setProcessed] = useState(false);
  const [includeDeleted, setIncludeDeleted] = useState(false);
  const [data, setData] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleSignIn = (e) => {
    ApiCalendar.handleAuthClick();
    if (ApiCalendar.sign) {
      setAuth(true);
    }
  }
  
  const handleSignOut = (e) => {
    ApiCalendar.handleSignoutClick();
    setAuth(false);
    setProcessed(false);
  }

  const getEvents = async () => {
    while (!ApiCalendar.sign) {
      console.log('waiting to sign in');
    }

    const adjustedEndDate = new Date(endDate);
    adjustedEndDate.setDate(adjustedEndDate.getDate() + 1);

    const { result } = await ApiCalendar.listEvents({
      timeMin: startDate.toISOString(),
      timeMax: adjustedEndDate.toISOString(),
      showDeleted: includeDeleted,
      maxResults: 10000,
      orderBy: 'startTime',
      singleEvents: true
    });

    setData(result.items);
    setProcessed(true);
  }

  return (
    <Container className='p-3'>
      <h1>Google Calendar Visualization Tool</h1>
      <Container className="p-5 bg-light rounded-3">
        {!auth ? 
          <Row>
            <h2>You are not currently signed in.</h2>
            <Button onClick={(e) => handleSignIn(e)} variant='primary'>Sign In With Google</Button>
          </Row>
          : 
          <>
            <Row>
              <label>Start Date:</label>
              <DatePicker onChange={setStartDate} value={startDate}/>
            </Row>
            <Row>
              <label>End Date (Inclusive): </label>
              <DatePicker onChange={setEndDate} value={endDate}/>
            </Row>
            <Row>
              <Col>
                <label>
                  <input type="checkbox" checked={includeDeleted} onChange={() => setIncludeDeleted(!includeDeleted)} style={{"margin-right": "3px"}}/>
                  Include Deleted
                </label>
              </Col>
            </Row>
            <Row>
              <Col>
                <Button onClick={(e) => getEvents()} variant='primary'>Process Calendar Data</Button>
              </Col>
            </Row>
            <Row style={{"margin-top": "5px"}}>
              <Col>
                <Button onClick={(e) => handleSignOut(e)} variant='secondary'>Sign Out</Button>
              </Col>
            </Row>
          </>
        }
      </Container>
      {processed ? <DisplayData data={data}/>: <p></p>}
    </Container>
  );
}

export default App;