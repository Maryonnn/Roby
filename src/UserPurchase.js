import { Table, Container } from 'react-bootstrap';
import supabase from './SupabaseClient.js';
import UserNavbar from "./UserNavbar.js";
import { useState, useEffect, useCallback } from 'react';

function UserPurchase(){
    const [purchaseHistory, setPurchaseHistory] = useState([]);
    const user_name = localStorage.getItem('user_name');

    const fetchPurchaseHistory = useCallback(async () => {
        try {
          const { data, error } = await supabase
            .from('User_Purchase')
            .select('*')
            .eq('user_name', user_name);

            if (error) {
                throw error;
            } 
            setPurchaseHistory(data);
        } catch (error) {
          console.error('Error during fetching purchase history:', error.message);
        }
    }, [user_name]);
    
    useEffect(() => {
        fetchPurchaseHistory();
    }, [fetchPurchaseHistory]);

    return(
        <>
           <div style={{ display: 'flex', height: 'auto', overflow: 'scroll initial', backgroundColor: '#CCB3A3' }}>
            <UserNavbar />
            <div style={{ flex: 1, padding: '20px', height:'100vh' }}>
            <Container className='mt-5 '>
                <Table responsive="sm" striped bordered hover>
                    <thead>
                    <tr>
                        <th>CAR</th>
                        <th>COLOR</th>
                        <th>ENGINE</th>
                        <th>PRICE</th>
                        <th>STYLE</th>
                        <th>TRANSMISSION</th>
                        <th>VIN</th>
                        <th>TIME</th>
                    </tr>
                    </thead>
                    <tbody>
                        {purchaseHistory.map((purchase) => (
                            <tr>
                            <td>{purchase.car_name}</td>
                            <td>{purchase.car_color}</td>
                            <td>{purchase.car_engine}</td>
                            <td>{purchase.car_price}</td>
                            <td>{purchase.car_style}</td>
                            <td>{purchase.transmission_type}</td>
                            <td>{purchase.VIN}</td>
                            <td>{purchase.created_at}</td>
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