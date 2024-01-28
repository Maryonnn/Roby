import { useState } from 'react';
import supabase from './SupabaseClient.js';
import UserNavbar from './UserNavbar.js';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button, FloatingLabel } from 'react-bootstrap';

function BuyNow(){
    const [error, setError] = useState(null);
    const [carColor, setCarColor] = useState('Red');
    const [carEngine, setCarEngine] = useState('v4');
    const [transmissionType, setTransmissionType] = useState('Automatic');
    const navigate = useNavigate();

    const user_name = localStorage.getItem('user_name');
    const car_name = localStorage.getItem('car_name');
    const car_style = localStorage.getItem('car_style');
    const car_price = localStorage.getItem('price');
    const image_path = localStorage.getItem('image_path');
    const VIN = localStorage.getItem('VIN');
    const dealer_name = localStorage.getItem('dealer_name');

    const deduct = async () => {
        const car_name = localStorage.getItem('car_name');
        const { data } = await supabase
        .from('Dealer_Inventory')
        .select('*')
        .eq('car_name', car_name)
        .single();

        console.log(data);
        const newstocks = data.stocks;
        localStorage.setItem('newstocks', newstocks);

        try {
          const deductedstocks = localStorage.getItem('newstocks')
          let newStocks = parseInt(deductedstocks) - 1;
            const { data } = await supabase
            .from('Dealer_Inventory')
            .update({ 'stocks': newStocks })    
            .eq('car_name', car_name);
            console.log(data);
            buyconfirm();
        } 
        catch(error) {
            console.error('Error during login:', error.message); 
        }
    }

    const buyconfirm = async () => {
        try {
            const { data } = await supabase
            .from('User_Purchase')
            .insert([
                {
                    user_name,
                    car_name,
                    car_style,
                    car_price,
                    image_path,
                    car_color: carColor,
                    car_engine: carEngine,
                    transmission_type: transmissionType,
                    VIN,
                },
            ])
            .select();
    
            console.log(data);
            alert('Order Successful');
            dealersales();
            navigate('/userpurchase');
        } 
        catch (error) {
          console.error('Error during login:', error.message);
          setError(error.message);
        }
    };

    const dealersales = async () => {
        try {
            const { data } = await supabase
            .from('Dealer_Sales')
            .insert([
                {
                    dealer_name,
                    user_name,
                    car_name,
                    car_style,
                    car_price,
                    image_path,
                    car_color: carColor,
                    car_engine: carEngine,
                    transmission_type: transmissionType,
                    VIN,
                },
            ])
            .select();
    
            console.log(data);
        } 
        catch (error) {
          console.error('Error during login:', error.message);
          setError(error.message);
        }
    };

    return (
        <>
          <div
            style={{
              height: '100vh',
              backgroundColor: '#CCB3A3',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Container className='mt-3'>
              <Card
                className=''
                style={{
                  boxShadow:
                    'rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px',
                  padding: '20px 20px',
                }}
              >
                <Row>
                  <Col>
                    <Card.Img src={image_path} />
                  </Col>
                  <Col>
                    <div>
                      <Card.Title className="mt-3">{car_name}</Card.Title>
                      <Card.Title className="mt-1">{car_price}</Card.Title><br/>
                      <Card.Text>
                        <Row>
                          <Col>
                            <FloatingLabel
                              controlId="floatingSelectGrid"
                              label="Choose car color : "
                            >
                              <Form.Select value={carColor} onChange={(e) => setCarColor(e.target.value)} aria-label="Floating label select example">
                                <option value="C1">C1</option>
                                <option value="C2">C2</option>
                                <option value="C3">C3</option>
                              </Form.Select>
                            </FloatingLabel>
                          </Col>
                          <Col>
                            <FloatingLabel
                              controlId="floatingSelectGrid"
                              label="Transmission type : "
                            >
                              <Form.Select value={carEngine} onChange={(e) => setCarEngine(e.target.value)} aria-label="Floating label select example">
                                <option value="Automatic">Automatic</option>
                                <option value="Manual">Manual</option>
                              </Form.Select>
                            </FloatingLabel>
                          </Col>
                          <Row>
                            <Col>
                              <FloatingLabel
                                className="mt-3"
                                controlId="floatingSelectGrid"
                                label="Car Engine : "
                              >
                                <Form.Select value={transmissionType} onChange={(e) => setTransmissionType(e.target.value)} aria-label="Floating label select example">
                                  <option value="v4">v4</option>
                                  <option value="v6">v6</option>
                                  <option value="v8">v8</option>
                                </Form.Select>
                              </FloatingLabel>
                            </Col>
                          </Row>
                        </Row>
                      </Card.Text>
                      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Button
                          variant="dark"
                          className="check-out w-50"
                          onClick={deduct}
                          style={{ height: "55px" }}
                        >
                          Buy Now
                        </Button>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Card>
            </Container>
          </div>
        </>
      );
      
}

export default BuyNow;