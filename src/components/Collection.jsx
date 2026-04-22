import { useEffect, useState } from "react";
import Nav from "./Nav";
import { getFavorites } from "../supabase/favorites";
import { getProfile, updateProfile } from "../supabase/profile";

function Collection({ user }) {
    const [favorites, setFavorites] = useState([]);
    const [profile, setProfile] = useState(null);
    const [bio, setBio] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [originalBio, setOriginalBio] = useState("");

    useEffect(() => {
        if (!user) return;

        getFavorites().then(setFavorites);

        getProfile(user.id).then((data) => {
            setProfile(data);
            setBio(data?.bio || "");
            setOriginalBio(data?.bio || "");
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
        setOriginalBio(bio);
        setIsEditing(false);
        alert("Updated!");
    }

    function cancelEdit() {
        setBio(originalBio);
        setIsEditing(false);
    }

    function startEdit() {
        setIsEditing(true);
    }

    return (
        <div>
            <div className="page-header">
                <h1>Collection</h1>
                <Nav />
            </div>
            <div id="collectionWrapper">
                <section id="profileSection">
                    <div id="profPicContainer">
                        <img src="/media/profileplaceholder.jpg" alt="Profile" />
                    </div>
                    <div id="profBio">
                        <h2>Bio</h2>
                        {isEditing ? (
                            <>
                                <textarea
                                    value={bio}
                                    onChange={(e) => setBio(e.target.value)}
                                />
                                <div className="bio-buttons">
                                    <button onClick={saveBio} className="save-btn">
                                        Save
                                    </button>
                                    <button onClick={cancelEdit} className="cancel-btn">
                                        Cancel
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <p className="bio-text">{bio || "No bio yet."}</p>
                                <button onClick={startEdit} className="edit-btn">
                                    Edit
                                </button>
                            </>
                        )}
                    </div>
                </section>

                <section id="favoritesSection">
                    {favorites.map((item) => (
                        <img
                            key={item.id}
                            src={item.image_url}
                            alt={item.title}
                            title={`${item.title} (${item.source})`}
                        />
                    ))}
                </section>
            </div>
        </div>
    );
}

export default Collection;