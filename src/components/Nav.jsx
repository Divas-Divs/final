import { useState } from "react";
import { Link } from "react-router-dom";
import { signIn, signUp, signOut } from "../supabase/auth";

function Nav({ user }) {
    const [open, setOpen] = useState(false);
    const [mode, setMode] = useState("login");

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            if (mode === "login") {
                const { data, error } = await signIn(email, password);

                console.log("LOGIN RESPONSE:", data);
                console.log("LOGIN ERROR:", error);

                if (error) throw error;
            } else {
                const { data, error } = await signUp(email, password);

                console.log("SIGNUP RESPONSE:", data);
                console.log("SIGNUP ERROR:", error);

                if (error) throw error;
            }

            setOpen(false);
            setEmail("");
            setPassword("");
        } catch (err) {
            alert(err.message);
            console.error(err);
        }
    }

    async function handleSignOut() {
        try {
            await signOut();
        } catch (err) {
            alert(err.message);
            console.error(err);
        }
    }

    return (
        <nav>
            <Link to="/">Home</Link>
            <Link to="/art">Art</Link>
            <Link to="/science">Science</Link>
            <Link to="/collection">Collection</Link>

            {user ? (
                <div className="user-menu">
                    <span>Welcome, {user.email}</span>
                    <button onClick={handleSignOut}>Logout</button>
                </div>
            ) : (
                <button onClick={() => setOpen(!open)}>
                    {open ? "Close" : "Login"}
                </button>
            )}

            {open && (
                <div className="auth-dropdown">
                    <h4>{mode === "login" ? "Login" : "Sign Up"}</h4>

                    <form onSubmit={handleSubmit}>
                        <input
                            type="email"
                            placeholder="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <input
                            type="password"
                            placeholder="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <button type="submit">
                            {mode}
                        </button>
                    </form>

                    <button
                        onClick={() =>
                            setMode(mode === "login" ? "signup" : "login")
                        }
                    >
                        Switch to {mode === "login" ? "Sign Up" : "Login"}
                    </button>
                </div>
            )}
        </nav>
    );
}

export default Nav;