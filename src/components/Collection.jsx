import { useEffect, useState } from "react";
import Nav from "./Nav";
import { getFavorites } from "../supabase/favorites";
import { getProfile, updateProfile } from "../supabase/profile";

function Collection({ user }) {
    const [favorites, setFavorites] = useState([]);

    const [profile, setProfile] = useState(null);

    const [bio, setBio] = useState("");

    useEffect(() => {
        if (!user) return;

        getFavorites().then(setFavorites);

        getProfile(user.id).then((data) => {
            setProfile(data);
            setBio(data?.bio || "");
        });
    }, [user]);

    if (!user) {
        return (
            <div>
                <div className="page-header">
                    <h1>Collection</h1>
                    <Nav />
                </div>
                <p>Please log in to view your collection.</p>
            </div>
        );
    }

    async function saveBio() {
        await updateProfile(user.id, { bio });
        alert("Updated!");
    }

    return (
        <div>
            <div className="page-header">
                <h1>Collection</h1>
                <Nav />
            </div>
            <section id="profileSection">
                <div id="profPicContainer">
                    <img src="/media/profileplaceholder.jpg" alt="Profile" />
                </div>
                <div id="profBio">
                    <textarea
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                    />
                    <button onClick={saveBio}>Save Bio</button>
                </div>
            </section>

            <div>
                {favorites.map((item) => (
                    <img
                        key={item.id}
                        src={item.image_url}
                        alt={item.title}
                        title={`${item.title} (${item.source})`}
                    />
                ))}
            </div>
        </div>
    );
}

export default Collection;