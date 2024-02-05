import React, { useState, useEffect, useCallback } from 'react';
import { Table, Container, Button, Spinner, Alert, Card, Row, Col, ListGroup } from 'react-bootstrap';
import DealerNavbar from "./DealerNavbar.js";
import supabase from './SupabaseClient.js';

function UserPurchase() {
    const [purchaseHistory, setPurchaseHistory] = useState([]);
    const [sortedPurchaseHistory, setSortedPurchaseHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const dealer_name = localStorage.getItem('dealer_name');
    const carName = localStorage.getItem('carName');
    const [topCars, setTopCars] = useState([]);
    const [image, setImage] = useState();
    const [carname, setCarname] = useState();
    const [price, setPrice] = useState();
    const [count, setCount] = useState();


    const [displayTopSales, setDisplayTopSales] = useState(false);

    const formatDate = (dateTimeString) => {
        const options = {
          year: "numeric",
          month: "long",
          day: "numeric",
        };
        return new Date(dateTimeString).toLocaleString(undefined, options);
    };

    const fetchPurchaseHistory = useCallback(async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('Dealer_Sales')
                .select('*')
                .eq('dealer_name', dealer_name);

            if (error) {
                throw error;
            }
            setPurchaseHistory(data);
            setError(null);
        } catch (error) {
            console.error('Error during fetching purchase history:', error.message);
            setError('Error fetching purchase history. Please try again.');
        } finally {
            setLoading(false);
        }
    }, [dealer_name]);

    const TopSales = useCallback(async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('Dealer_Inventory')
                .select('*')
                .eq('car_name', carName);

            if (error) {
                throw error;
            }
          console.log(data);
setImage(data[0].image_path);
setCarname(data[0].car_name);
setPrice(data[0].price);

        } catch (error) {
            console.error('Error during fetching purchase history:', error.message);
            setError('Error fetching purchase history. Please try again.');
        } finally {
            setLoading(false);
        }
    }, [dealer_name]);

    const handleSortByTopSales = () => {
        const carCountMap = {};
        purchaseHistory.forEach((purchase) => {
            carCountMap[purchase.car_name] = (carCountMap[purchase.car_name] || 0) + 1;
        });
        const sortedCars = Object.keys(carCountMap).sort((a, b) => carCountMap[b] - carCountMap[a]);
        const sortedHistory = purchaseHistory.sort((a, b) =>
            sortedCars.indexOf(a.car_name) - sortedCars.indexOf(b.car_name)
        );
        setSortedPurchaseHistory(sortedHistory);
        setDisplayTopSales(true);
    };

    const handleShowTopCars = () => {
        const carCountMap = {};
        purchaseHistory.forEach((purchase) => {
            carCountMap[purchase.car_name] = (carCountMap[purchase.car_name] || 0) + 1;
        });
        const sortedCars = Object.keys(carCountMap).sort((a, b) => carCountMap[b] - carCountMap[a]).slice(0, 1);
        const topCarsData = sortedCars.map((carName) => ({
            carName,
            count: carCountMap[carName],
        }));
    

        setTopCars(topCarsData);
        console.log(topCarsData[0].carName);
        const carName = topCarsData[0].carName;
        localStorage.setItem('carName', carName);
        setCount(topCarsData[0].count);

        TopSales();
    };

    useEffect(() => {
        fetchPurchaseHistory();
    }, [fetchPurchaseHistory]);

    return (
        <>
            <div style={{ display: 'flex', height: 'auto', overflow: 'scroll initial', backgroundColor: '#CCB3A3' }}>
                <DealerNavbar />
                <div style={{ flex: 1, padding: '20px', height: 'auto' }}>
                    <Container>
                        <Button
                            onClick={handleShowTopCars}
                            style={{
                                backgroundColor: '#A67B5B',
                                borderColor: '#CCB3A3',
                                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Add shadow
                            }}
                        >
                            Show top car sale
                        </Button>
                        <div className='mt-1'>
                            <Card style={{ width: '50rem' }}>
                                <Card.Header>Top Car Sale</Card.Header>
                                <Row>
                                    <Col><Card.Img variant="top" src={image} /></Col>
                                    <Col>
                                        <Card.Body>
                                            <Card.Title>{carname}</Card.Title>
                                        </Card.Body>
                                        <ListGroup className="list-group-flush">
                                            <ListGroup.Item>{price}</ListGroup.Item>
                                            <ListGroup.Item>Number of Sales: {count}</ListGroup.Item>
                                        </ListGroup>
                                    </Col>
                                </Row>
                            </Card>
                        </div>

                        <Button
                            onClick={handleSortByTopSales}
                            className="mb-2 mt-3"
                            style={{
                                backgroundColor: '#A67B5B',
                                borderColor: '#CCB3A3',
                                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                            }}
                        >
                            Sort by Top Sales
                        </Button>
                        <Table responsive="sm" striped bordered hover>
                            <thead>
                                <tr>
                                    <th>CUSTOMER</th>
                                    <th>CAR</th>
                                    <th>STYLE</th>
                                    <th>COLOR</th>
                                    <th>ENGINE</th>
                                    <th>PRICE</th>
                                    <th>TRANSMISSION</th>
                                    <th>DATE PURCHASED</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading && (
                                    <tr>
                                        <td colSpan="8" className="text-center">
                                            <Spinner animation="border" variant="dark" />
                                        </td>
                                    </tr>
                                )}
                                {error && (
                                    <tr>
                                        <td colSpan="8">
                                            <Alert variant="danger">{error}</Alert>
                                        </td>
                                    </tr>
                                )}
                                {!loading && !error && !displayTopSales && purchaseHistory.map((purchase) => (
                                    <tr key={purchase.VIN}>
                                        <td>{purchase.user_name}</td>
                                        <td>{purchase.car_name}</td>
                                        <td>{purchase.car_style}</td>
                                        <td>{purchase.car_color}</td>
                                        <td>{purchase.car_engine}</td>
                                        <td>{purchase.car_price}</td>
                                        <td>{purchase.transmission_type}</td>
                                        <td>{formatDate(purchase.created_at)}</td>
                                    </tr>
                                ))}
                                {!loading && !error && displayTopSales && sortedPurchaseHistory.map((purchase) => (
                                    <tr key={purchase.VIN}>
                                        <td>{purchase.user_name}</td>
                                        <td>{purchase.car_name}</td>
                                        <td>{purchase.car_style}</td>
                                        <td>{purchase.car_color}</td>
                                        <td>{purchase.car_engine}</td>
                                        <td>{purchase.car_price}</td>
                                        <td>{purchase.transmission_type}</td>
                                        <td>{formatDate(purchase.created_at)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Container>
                </div>
            </div>
        </>
    );
}

export default UserPurchase;
