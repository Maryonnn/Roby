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
            <UserNavbar />
            <Container className='mt-5'>
                <Table responsive="sm">
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
        </>
    );
}

export default UserPurchase;