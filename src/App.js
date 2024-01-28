import { Routes, Route } from 'react-router-dom';
import Login from './Login.js';
import UserPurchase from './UserPurchase.js';
import UserProducts from './UserProducts.js';
import DealerHome from './DealerHome.js';
import DealerInventory from './DealerInventory.js';
import DealerSales from './DealerSales.js';
import DealerConfirm from './DealerConfirm.js';
import UserConfirm from './UserConfirm.js'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/userpurchase" element={<UserPurchase />} />
      <Route path="/userproducts" element={<UserProducts />} />
      <Route path="/dealerhome" element={<DealerHome />} />
      <Route path="/dealerinventory" element={<DealerInventory />} />
      <Route path="/dealersales" element={<DealerSales />} />
      <Route path="/dealerconfirm" element={<DealerConfirm />} />
      <Route path="/userconfirm" element={<UserConfirm />} />
    </Routes>
  );
}

export default App;
