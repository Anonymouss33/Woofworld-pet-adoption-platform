import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <h1>Welcome to Pet Adoption</h1>
            <div>
                <Link to="/login">
                    <button>I Want to Adopt</button>
                </Link>
                <Link to="/owner/login">
                    <button>I Have for Adoption</button>
                </Link>
            </div>
        </div>
    );
};

export default Home;
