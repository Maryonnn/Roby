import React from 'react';
import { Table, Container, Button } from 'react-bootstrap';
import DealerNavbar from "./DealerNavbar.js";
import supabase from './SupabaseClient.js';
import { useState, useEffect, useCallback } from 'react';

function UserPurchase() {
    const [purchaseHistory, setPurchaseHistory] = useState([]);
    const [topCars, setTopCars] = useState([]);
    const dealer_name = localStorage.getItem('dealer_name');

    const fetchPurchaseHistory = useCallback(async () => {
        try {
            const { data, error } = await supabase
                .from('Dealer_Sales')
                .select('*')
                .eq('dealer_name', dealer_name);

            if (error) {
                throw error;
            }
            setPurchaseHistory(data);
        } catch (error) {
            console.error('Error during fetching purchase history:', error.message);
        }
    }, [dealer_name]);

    const handleShowTopCars = () => {
        // Declare carCountMap here
        const carCountMap = {};
        purchaseHistory.forEach((purchase) => {
            carCountMap[purchase.car_name] = (carCountMap[purchase.car_name] || 0) + 1;
        });

        const sortedCars = Object.keys(carCountMap).sort((a, b) => carCountMap[b] - carCountMap[a]).slice(0, 3);

        const topCarsData = sortedCars.map((carName) => ({
            carName,
            count: carCountMap[carName],
        }));
        setTopCars(topCarsData);
    };

    useEffect(() => {
        fetchPurchaseHistory();
    }, [fetchPurchaseHistory]);

    return (
        <>
          <div style={{ display: 'flex', height: 'auto', overflow: 'scroll initial', backgroundColor: '#CCB3A3' }}>
    <DealerNavbar />

    {/* Main Content */}
    <div style={{ flex: 1, padding: '20px' }}>
        <Container className='mt-4'>
        
            <Table responsive="sm">
                <thead>
                    <tr>
                        <th>CUSTOMER</th>
                        <th>CAR</th>
                        <th>STYLE</th>
                        <th>COLOR</th>
                        <th>ENGINE</th>
                        <th>PRICE</th>
                        <th>TRANSMISSION</th>
                        <th>VIN</th>
                    </tr>
                </thead>
                <tbody>
                    {purchaseHistory.map((purchase) => (
                        <tr key={purchase.VIN}>
                            <td>{purchase.user_name}</td>
                            <td>{purchase.car_name}</td>
                            <td>{purchase.car_style}</td>
                            <td>{purchase.car_color}</td>
                            <td>{purchase.car_engine}</td>
                            <td>{purchase.car_price}</td>
                            <td>{purchase.transmission_type}</td>
                            <td>{purchase.VIN}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
         <Button
      onClick={handleShowTopCars}
      className="mb-3"
      style={{
        backgroundColor: '#A67B5B',
        borderColor: '#CCB3A3',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Add shadow
      }}
    >
      Show Top 3 Cars
    </Button>

        {/* Side table for top 3 cars */}
        <Container className='mt-4'>
            <h5>Top 3 Sales</h5>
            <Table responsive="sm">
                <thead>
                    <tr>
                        <th>CAR</th>
                        <th>SALES</th>
                    </tr>
                </thead>
                <tbody>
                    {topCars.map((car) => (
                        <tr key={car.carName}>
                            <td>{car.carName}</td>
                            <td>{car.count}</td>
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
