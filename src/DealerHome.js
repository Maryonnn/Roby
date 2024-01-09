import './app.css';
import DealerNavbar from "./DealerNavbar.js";
import { Col, Row, Card, Container, Button, Form } from "react-bootstrap";
import supabase from './SupabaseClient.js';
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

function CompanyVehicles(){
    const [carData, setCarData] = useState(null);
    const [error] = useState(null);
    const dealerName = localStorage.getItem('dealer_name');
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();;

    const handleLogin = useCallback(async () => {
        try {
            const { data } = await supabase
            .from('cars')
            .select('*') 
            .eq('dealer_name', dealerName);
            setCarData(data);
        } 
        catch (error) {
            console.error('Error during login:', error.message);
        }
    }, [dealerName]); 

    useEffect(() => {
        handleLogin();
    }, [handleLogin]);

    const onClickBuyNow = (car) => {
        const { dealer_name, car_name, car_style, price, VIN, image_path, stocks } = car;
        localStorage.setItem('dealer_name', dealer_name);
        localStorage.setItem('car_name', car_name);
        localStorage.setItem('car_style', car_style);
        localStorage.setItem('price', price);
        localStorage.setItem('VIN', VIN);
        localStorage.setItem('image_path', image_path);
        localStorage.setItem('stocks', stocks);
        navigate('/dealerconfirm');
    };
    
    return (
        <>
            <DealerNavbar />
            <Container>
                <Form className="d-flex justify-content-end mt-5 me-5">
                    <Form.Control
                        type="search"
                        placeholder="Search here. . ."
                        className="me-2 w-25"
                        aria-label="Search"
                        onChange={event => setSearchTerm(event.target.value)}
                    />
                </Form>
            </Container>
            {error && <p>{error}</p>}
            {carData && (
                <Container className='flexcon mt-4'>
                    {carData.filter(car => car.car_name.toLowerCase().includes(searchTerm.toLowerCase())).map((car) => (
                        <CarCard key={car.vin} car={car} onClickBuyNow={onClickBuyNow} />
                    ))}
                </Container>
            )}
        </>
    );
};
    
function CarCard({ car, onClickBuyNow }) {
    const {car_name, price, image_path, stocks} = car;
    const handleBuyNowClick = () => {
        onClickBuyNow(car);
    };
    
    return (
        <>
        <Container>
            <Card style={{ 
                maxWidth: '540px', 
                boxShadow: 'rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px',
                padding: '20px 10px'
            }}>
                <Row>
                    <Col sm={7}>
                        <Card.Img src={image_path} className="card-image" />
                    </Col>
                    <Col sm={5}>
                        <Card.Title className="mt-2">{car_name}</Card.Title>
                        <Card.Text>Price: {price}<br/>Stocks: {stocks}</Card.Text>
                        <Button 
                            variant="dark" 
                            className="check-out" 
                            onClick={handleBuyNowClick}
                        >
                            Buy Now
                        </Button>
                    </Col>
                </Row>
            </Card>
        </Container>
        <div className="footer1 d-flex">
            <div style={{fontSize: "10px"}} className='mt-2'>
                © 2024 Copyright: ITE 19 - Appraisal
            </div>
        </div>
        </>
      );
}

export default CompanyVehicles;