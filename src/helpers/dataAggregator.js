const aggregateEvents = (events) => {
    const eventMap = {};
    const allDayEvents = new Set();
    events.forEach(event => {
        const eventName = event.summary;
        if ('dateTime' in event.end) {
            const end = new Date(event.end.dateTime);
            const start = new Date(event.start.dateTime);
            const msTime = end.getTime() - start.getTime();
            const minTime = msTime / 1000 / 60;

            if (eventName in eventMap) { 
                eventMap[eventName] += minTime;
            } else {
                eventMap[eventName] = minTime;
            }
        } else {
            allDayEvents.add(eventName);
        }
    });

    return [eventMap, allDayEvents];
}

const colorMap = {
    0: 'Default Calendar Color (Light Blue)',
    1: 'Lavendar',
    2: 'Sage',
    3: 'Grape',
    4: 'Flamingo',
    5: 'Banana',
    6: 'Tangerine',
    7: 'Peacock',
    8: 'Graphite',
    9: 'Blueberry',
    10: 'Basil'
}

const aggregateColors = (events) => {
    const colorCounter = {};
    events.forEach(event => {
        var color = colorMap[event.colorId] ? colorMap[event.colorId] : 'Default'
        
        if ('dateTime' in event.end) {
            const end = new Date(event.end.dateTime);
            const start = new Date(event.start.dateTime);
            const msTime = end.getTime() - start.getTime();
            const minTime = msTime / 1000 / 60;

            if (color in colorCounter) { 
                colorCounter[color] += minTime;
            } else {
                colorCounter[color] = minTime;
            }
        } 
    });

    return colorCounter;
}

export {aggregateEvents, aggregateColors};