import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/esm/Container';
import { Card, Tabs, Tab } from 'react-bootstrap';


import { aggregateEvents, aggregateColors } from '../helpers/dataAggregator';
import BarChart from './BarChart';

const colorMap = {
    Sage: '#7AE7BF',
    Flamingo: '#FF887C',
    Blueberry: '#5484ED',
    Banana: '#FBD75B',
    Graphite: '#E1E1E1',
    Basil: '#51B749',
    Default: '#46D6DB'
}

const DisplayData = ({ data, timePeriodString }) => {

    const displayAggregations = () => {
        const [eMap, eSet] = aggregateEvents(data);
        var listItems = [];
        for (const key in eMap) {
            listItems.push(`${key}: ${eMap[key]} mins`)
        }

        listItems.sort((a, b) => {
            const aTime = parseInt(a.split(': ')[1]);
            const bTime = parseInt(b.split(': ')[1]);
            return aTime > bTime;
        });
        
        listItems = listItems.map((item, idx) => 
            <li key={idx}>{item}</li>
        );

        const colorCounter = aggregateColors(data);
        var colors = Array.from(Object.keys(colorCounter));
        colors = colors.map(color => colorMap[color]);

        return (
            <Card style={{"marginBottom": "10px"}}>
                <Card.Header>Prior {timePeriodString}</Card.Header>
                <Tabs>
                    <Tab eventKey="category" title="By Category">
                        <BarChart data={colorCounter} title={'Minutes Per Category'} colors={colors}/>
                    </Tab>
                    <Tab eventKey="events" title="By Events">
                        <BarChart data={eMap} title={'Minutes Per Event'} />
                    </Tab>
                    <Tab eventKey="eventsList" title="Daily Events">
                        <ul>{listItems}</ul> 
                    </Tab>
                </Tabs>
            </Card>
        );
    }
    
    return (
        <Container>
            {displayAggregations()}
        </Container>
    );
}

export default DisplayData;

