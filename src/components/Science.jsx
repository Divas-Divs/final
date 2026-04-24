import { useEffect, useState } from "react";
import Nav from "./Nav";
import { getRandomScienceExhibit } from "../api/scienceAPI";
import { toggleFavorite, getFavorites } from "../supabase/favorites";

function Science({ user }) {
    const [exhibit, setExhibit] = useState(null);
    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        async function load() {
            try {
                const data = await getRandomScienceExhibit();
                setExhibit(data);
            } catch (err) {
                console.error("Load error:", err);
            }
        }

        load();
    }, []);

    useEffect(() => {
        async function checkIfLiked() {
            if (!user || !exhibit) return;
            try {
                const favorites = await getFavorites();
                const liked = favorites.some(fav => fav.item_id === exhibit.id);
                setIsLiked(liked);
            } catch (error) {
                console.error("Error checking favorite:", error);
            }
        }

        checkIfLiked();
    }, [user, exhibit]);

    async function handleFavorite() {
        if (!user) {
            alert("Please log in to favorite items");
            return;
        }

        try {
            await toggleFavorite({
                id: exhibit.id,
                title: exhibit.title,
                image: exhibit.image,
                source: "science",
            });

            // Toggle like state
            setIsLiked(!isLiked);
        } catch (error) {
            console.error("Error toggling favorite:", error);
        }
    }

    return (
        <div>
            <div className="page-header">
                <h1>Science</h1>
                <Nav user={user} />
            </div>
            <hr />

            <div className="science_section">
                <img
                    className="scienceImg"
                    src={
                        exhibit?.image ||
                        "/media/imgplaceholder.jpg"
                    }
                    alt="science"
                />
                <button 
                    className={`favorite-btn ${isLiked ? 'liked' : ''}`}
                    onClick={handleFavorite}
                >
                    ❤︎⁠
                </button>

                <div className="science_text">
                    <h1>
                        {exhibit?.title || "Loading..."}
                    </h1>

                    <p>
                        {exhibit?.description ||
                            "Loading description..."}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Science;