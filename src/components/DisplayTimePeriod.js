import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import CardHeader from 'react-bootstrap/esm/CardHeader';

import ApiCalendar from 'react-google-calendar-api';

import DisplayData from './DisplayData';

const DisplayTimePeriod = ({ timePeriod }) => {
    const [data, setData] = useState([]);
    const [dataLoaded, setDataLoaded] = useState(false);

    const timePeriodStringConversion = {
        1: 'Day',
        7: 'Week',
        30: 'Month',
        365: 'Year'
    }

    const fetchEvents = async () => {
        try {
            const endDate = new Date();
            endDate.setHours(0);
            endDate.setMinutes(0);
            endDate.setSeconds(0);

            const startDate = new Date();
            startDate.setDate(endDate.getDate() - timePeriod);

            const { result } = await ApiCalendar.listEvents({
                timeMin: startDate.toISOString(),
                timeMax: endDate.toISOString(),
                showDeleted: false,
                maxResults: 10000,
                orderBy: 'startTime',
                singleEvents: true
            });

            result['success'] = true
            return result;
        } catch (error) {
            console.log(error);
            return { 'success': false };
        }
    }

    useEffect(() => {
        (async () => {
          setDataLoaded(false);
          const res = await fetchEvents();
          if (res.success) {
            setData(res.items);
            setDataLoaded(true);
          }
        })();
    }, []);

    return (
        <>
            {dataLoaded ? (
                <>
                    <DisplayData data={data} timePeriodString={timePeriodStringConversion[timePeriod]}/>
                </>
            ): <p>No data loaded</p>
            }
        </>
    )

}

export default DisplayTimePeriod;