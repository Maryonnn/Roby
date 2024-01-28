import React, { useState, useEffect, useCallback } from 'react';
import { Table, Container, Button, Spinner, Alert } from 'react-bootstrap';
import DealerNavbar from "./DealerNavbar.js";
import supabase from './SupabaseClient.js';

function UserPurchase() {
    const [purchaseHistory, setPurchaseHistory] = useState([]);
    const [sortedPurchaseHistory, setSortedPurchaseHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const dealer_name = localStorage.getItem('dealer_name');

    const [displayTopSales, setDisplayTopSales] = useState(false);

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
                        <Button
                            onClick={handleSortByTopSales}
                            className="mb-3"
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
                                    <th>VIN</th>
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
                                        <td>{purchase.VIN}</td>
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
                                        <td>{purchase.VIN}</td>
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
