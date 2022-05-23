import React, { useState } from 'react';

import ApiCalendar from 'react-google-calendar-api';
import moment from 'moment';
import DatePicker from 'react-date-picker';

import aggregateEvents from './helpers/dataAggregator';
import DisplayData from './components/DisplayData';

function App() {

  const [auth, setAuth] = useState(false);
  const [processed, setProcessed] = useState(false);
  const [includeDeleted, setIncludeDeleted] = useState(false);
  const [data, setData] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [eventMap, setEventMap] = useState({});
  const [eventSet, setEventSet] = useState(new Set());

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
    <div className="App">
      {!auth ? 
        <button onClick={(e) => handleSignIn(e)}>Sign In</button> : 
        <>
          <button onClick={(e) => handleSignOut(e)}>Sign Out</button>
          <div>
            <p>Start Date:</p>
            <DatePicker onChange={setStartDate} value={startDate}/>
            <p>End Date (Inclusive): </p>
            <DatePicker onChange={setEndDate} value={endDate}/>
          </div>
          <div>
            <label>
              <input type="checkbox" checked={includeDeleted} onChange={() => setIncludeDeleted(!includeDeleted)}/>
              Include Deleted
            </label>
          </div>
          <button onClick={(e) => getEvents()}>Process Calendar Data</button>
        </>
      }

      {processed ? <DisplayData data={data}/>: <p></p>}
    </div>
  );
}

export default App;