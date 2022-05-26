import { Container, CardGroup, Row, Stack} from 'react-bootstrap';
import DisplayTimePeriod from './DisplayTimePeriod';

const Body = () => {
    const timePeriods = [1, 7, 30, 365]
    
    const createTimePeriods = () => {
        return timePeriods.map((timePeriod, idx) => {
            return (
                <Row key={idx}>
                    <DisplayTimePeriod key={idx} timePeriod={timePeriod}/>
                </Row>
            )
        });
    }

    return (
        <>
            {createTimePeriods()}
        </>
    )
}

export default Body;