import React, { useState, useEffect } from "react";
import UserNavbar from "./UserNavbar.js";
import { Col, Row, Card, Container, Button, Form, FloatingLabel } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import supabase from './SupabaseClient.js';
import './app.css';

function UserProducts() {
    const [carData, setCarData] = useState(null);
    const [error] = useState(null);
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");

    const all = async () => {
        try {
            const { data } = await supabase
                .from('Dealer_Inventory')
                .select('*')

            console.log(data);
            setCarData(data);
        } catch (error) {
            console.error('Error during login:', error.message);
        }
    };

    useEffect(() => {
        all();
    }, []); 

    const handleLogin = async (dealer_name) => {
        try {
            if (dealer_name === 'All') {
                all();
            } else {
                const { data } = await supabase
                    .from('Dealer_Inventory')
                    .select('*')
                    .eq('dealer_name', dealer_name)
                setCarData(data);
            }
        } catch (error) {
            console.error('Error during login:', error.message);
        }
    };

    const onClickBuyNow = (car) => {
        const { dealer_name, car_name, car_style, price, VIN, image_path } = car;
        localStorage.setItem('dealer_name', dealer_name);
        localStorage.setItem('car_name', car_name);
        localStorage.setItem('car_style', car_style);
        localStorage.setItem('price', price);
        localStorage.setItem('VIN', VIN);
        localStorage.setItem('image_path', image_path);
        navigate('/userconfirm');
    };

    return (
        <>
            <div style={{ display: 'flex', height: 'auto', overflow: 'scroll initial', backgroundColor: '#CCB3A3' }}>
                <UserNavbar />
                <div style={{ flex: 1, padding: '20px' }}>
                    <Container className="d-flex justify-content-end">
                        <FloatingLabel 
                            controlId="floatingSelect" 
                            label="Select Brand" 
                            className="mt-3 me-3"
                        >
                            <Form.Select aria-label="Floating label select example" onChange={e => handleLogin(e.target.value)}>
                                <option onClick={all}>All</option>
                                <option value='GMC'>GMC</option>
                                <option value='Cadillac'>Cadillac</option>
                                <option value='Buick'>Buick</option>
                                <option value='Chevrolet'>Chevrolet</option>
                            </Form.Select>
                        </FloatingLabel>
                        <div className="d-flex justify-content-end">
                            <Form.Control
                                type="search"
                                placeholder="Search here. . ."
                                className="me-2 w-100"
                                aria-label="Search"
                                onChange={event => setSearchTerm(event.target.value)}
                            />
                            <Form.Control
                                type="number"
                                placeholder="Min Price"
                                className="me-2 w-100"
                                value={minPrice}
                                onChange={(event) => setMinPrice(event.target.value)}
                            />
                            <Form.Control
                                type="number"
                                placeholder="Max Price"
                                className="me-2 w-100"
                                value={maxPrice}
                                onChange={(event) => setMaxPrice(event.target.value)}
                            />
                        </div>
                    </Container>
                    {error && <p>{error}</p>}
                    {carData && (
                        <Container className='flexcon mt-4'>
                            {carData
                                .filter(car => 
                                    car.car_name.toLowerCase().includes(searchTerm.toLowerCase()) &&
                                    (!minPrice || parseInt(car.price.replace(/[^\d]/g, '')) >= parseInt(minPrice)) &&
                                    (!maxPrice || parseInt(car.price.replace(/[^\d]/g, '')) <= parseInt(maxPrice))
                                )
                                .map((car) => (
                                    <CarCard key={car.vin} car={car} onClickBuyNow={onClickBuyNow} />
                                ))}
                        </Container>
                        
                    )}
                </div>
            </div>
        </>
    );

    function CarCard({ car, onClickBuyNow }) {
        const { car_name, price, image_path, stocks } = car;
        
        const handleBuyNowClick = () => {
            onClickBuyNow(car);
        };
        return (
            <>
                <Container>
                    <Card className="card-box">
                        <Row>
                            <Col sm={7}>
                                <Card.Img src={image_path} className="card-image" />
                            </Col>
                            <Col sm={5}>
                                <Card.Title className="mt-2">{car_name}</Card.Title>
                                <Card.Text>Price:₱{price}<br/>Stocks: {stocks}</Card.Text>
                                
                                {stocks > 0 ? (
                                    <Button 
                                        style={{backgroundColor:'#A67B5B', borderColor:'white'}}
                                        className="check-out" 
                                        onClick={handleBuyNowClick}
                                    >
                                        Check Out
                                    </Button>
                                ) : (
                                    <div>Sold Out</div>
                                )}
                            </Col>
                        </Row>
                    </Card>
                </Container>
            </>
        );
    }
}

export default UserProducts;
