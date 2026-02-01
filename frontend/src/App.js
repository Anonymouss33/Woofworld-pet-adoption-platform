import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import OwnerNavbar from './components/OwnerNavbar';
import CustomerNavbar from './components/CustomerNavbar';
import CustomerRegister from './pages/CustomerRegister';
import OwnerLogin from './pages/OwnerLogin';
import OwnerRegister from './pages/OwnerRegister';
import PetProfile from './pages/PetProfile';
import OwnerDashboard from './pages/OwnerDashboard';
import CustomerLogin from './pages/CustomerLogin';
import PetPage from './pages/PetPage';
import ViewPetProfile from './pages/ViewPetProfile';
import AddPet from './pages/AddPet'
import CustomerProfile from './pages/CustomerProfile';
import CustomerProfilePage from './pages/CustomerProfilePage';
import EditCustomerProfilePage from './pages/EditCustomerProfilePage';
import Recommendation from './pages/Recommendation';
; // Ensure this is imported // Import OwnerDashboard

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/customer-register" element={<CustomerRegister />} />
            <Route path="/owner-login" element={<OwnerLogin />} />
            <Route path="/owner-register" element={<OwnerRegister />} />
            <Route path="/customer-login" element={<CustomerLogin />} />
            <Route path="/view-pet/:petId" element={<ViewPetProfile />} />
            <Route path="/add-pet" element={<AddPet />} /> {/* Add this route */}   
            <Route path="/customer-profile" element={<CustomerProfile />} />
            <Route path="/" element={<CustomerProfile />} />
            <Route path="/edit-customer-profile" element={<EditCustomerProfilePage />} />

            
            <Route path="/customer-dashboard" element={<CustomerProfilePage />} />
            <Route path="/recommendations" element={<Recommendation />} />        
           
            <Route path="/pets" element={<PetPage />} />
            <Route path="/pet-profile" element={<PetProfile />} />
            <Route path="/owner-dashboard" element={<OwnerDashboard />} /> {/* Add OwnerDashboard route */}
        </Routes>
    );
};

export default App;
