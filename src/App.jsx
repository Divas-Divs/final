import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Art from './components/Art';
import Science from './components/Science';
import Collection from './components/Collection';
import './stylesheet.css';
import { useEffect, useState } from "react";
import { supabase } from "./supabase/supabase";

function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        let mounted = true;

        const init = async () => {
            const { data } = await supabase.auth.getUser();
            if (mounted) setUser(data.user ?? null);
        };

        init();

        const { data: listener } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                setUser(session?.user ?? null);
            }
        );

        return () => {
            mounted = false;
            listener.subscription.unsubscribe();
        };
    }, []);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home user={user} />} />
                <Route path="/art" element={<Art user={user} />} />
                <Route path="/science" element={<Science user={user} />} />
                <Route path="/collection" element={<Collection user={user} />} />
            </Routes>
        </Router>
    );
}

export default App;
