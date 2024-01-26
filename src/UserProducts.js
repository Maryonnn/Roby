import { useState, useEffect } from "react";
import UserNavbar from "./UserNavbar.js";
import { Col, Row, Card, Container, Button, Form, FloatingLabel } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import supabase from './SupabaseClient.js';
import './app.css';

function UserProducts(){
    const [carData, setCarData] = useState(null);
    const [error] = useState(null);
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
        const { dealer_name, car_name, car_style, price, VIN,image_path } = car;
        localStorage.setItem('dealer_name', dealer_name);
        localStorage.setItem('car_name', car_name);
        localStorage.setItem('car_style', car_style);
        localStorage.setItem('price', price);
        localStorage.setItem('VIN', VIN);
        localStorage.setItem('image_path', image_path);
        navigate('/userconfirm');
    };

    return(
        <>
            <UserNavbar />
            <div style={{backgroundColor:'#CCB3A3'}}>
            {error && <p>{error}</p>}
            <Container style={{ display: 'flex',  }}>
                <Form className="d-flex justify-content-end mt-5 me-2" style={{ width: '70%' }}>
                    <Form.Control
                        type="search"
                        placeholder="Search here. . ."
                        className="me-2 w-25"
                        aria-label="Search"
                        onChange={event => setSearchTerm(event.target.value)}
                    />
                </Form>
                <div className="d-flex justify-content-start mt-5" style={{ width: '30%' }}>
                    <FloatingLabel controlId="floatingSelect" label="Select Brand" className="me-3">
                        <Form.Select aria-label="Floating label select example" onChange={e => handleLogin(e.target.value)}>
                            <option onClick={all}>All</option>
                            <option value='Jeep'>Jeep</option>
                            <option value='Maserati'>Maserati</option>
                            <option value='Mitsubishi'>Mitsubishi</option>
                            <option value='Bentley'>Bentley</option>
                            <option value='Cadillac'>Cadillac</option>
                        </Form.Select>
                    </FloatingLabel>
                </div>
            </Container>
            {carData && (
                <Container className='flexcon mt-4'>
                    {carData.filter(car => car.car_name.toLowerCase().includes(searchTerm.toLowerCase())).map((car) => (
                        <CarCard key={car.vin} car={car} onClickBuyNow={onClickBuyNow} />
                    ))}
                </Container>
                
            )}
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
                    <div className="mb-4">
                        <Card style={{ maxWidth: '540px', 
                            boxShadow: 'rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px',
                            padding: '20px 20px'
                        }}>
                            <Row>
                                <Col sm={7}>
                                    <Card.Img src={image_path} className="card-image" />
                                </Col>
                                <Col sm={5}>
                                    <Card.Title className="mt-2">{car_name}</Card.Title>
                                    <Card.Text>Price: {price}<br/>Stocks: {stocks}</Card.Text>
                                    <Button 
                                     style={{backgroundColor:'#A67B5B', borderColor:'white'}}
                                        className="check-out" 
                                        onClick={handleBuyNowClick}
                                    >
                                        Check Out
                                    </Button>
                                </Col>
                            </Row>
                        </Card>
                    </div>
                </Container>

            </>
        );
    }
}
export default UserProducts;