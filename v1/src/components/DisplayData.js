import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';

import { aggregateEvents, aggregateColors } from '../helpers/dataAggregator';
import BarChart from './BarChart';
import DoughnutChart from './DoughnutChart';

const colorMap = {
    Sage: '#7AE7BF',
    Flamingo: '#FF887C',
    Blueberry: '#5484ED',
    Banana: '#FBD75B',
    Graphite: '#E1E1E1',
    Basil: '#51B749',
    Default: '#46D6DB'
}

const DisplayData = (props) => {

    const displayAggregations = () => {
        const [eMap, eSet] = aggregateEvents(props.data);
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

        const colorCounter = aggregateColors(props.data);
        var colors = Array.from(Object.keys(colorCounter));
        colors = colors.map(color => colorMap[color]);

        return (
            <Container>
                {
                    listItems.length < 11 ? 
                    <Container>
                        <h3>Events</h3>
                        <ul>{listItems}</ul> 
                    </Container>
                    :
                    <></>
                }
                <Row>
                    <BarChart data={colorCounter} title={'Minutes Per Category'} colors={colors}/>
                </Row>
                <Row>
                    <BarChart data={eMap} title={'Minutes Per Event'} />
                </Row>
            </Container>
        );
    }
    
    return (
        <Container>
            <h2>Data Aggregation</h2>
            {displayAggregations()}
        </Container>
    );
}

export default DisplayData;

