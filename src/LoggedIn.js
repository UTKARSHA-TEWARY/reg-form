import React, { useEffect, useState } from "react";
import './LoggedIn.css';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from './components/Firebase';

const LoggedIn = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    return (
        <div className="logged-in-wrapper">
            <h1>Welcome!</h1>
            {loading ? (
                <p>Loading user information...</p>
            ) : user ? (
                <p>You have successfully logged in with the email: {user.email}</p>
            ) : (
                <p>No user information available.</p>
            )}
        </div>
    );
};

export default LoggedIn;



