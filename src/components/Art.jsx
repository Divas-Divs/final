import { useEffect, useState } from "react";
import Nav from "./Nav";
import { getRandomMetGallery } from "../services/metService";
import { toggleFavorite, getFavorites } from "../supabase/favorites";

function Art({ user }) {
    const [artworks, setArtworks] = useState([]);
    const [likedIds, setLikedIds] = useState(new Set());

    useEffect(() => {
        async function loadArtworks() {
            try {
                const data = await getRandomMetGallery("art", 9);
                setArtworks(data);
            } catch (error) {
                console.error("Error loading artwork:", error);
            }
        }

        loadArtworks();
    }, []);

    useEffect(() => {
        async function loadFavorites() {
            if (!user) return;
            try {
                const favorites = await getFavorites();
                const ids = new Set(favorites.map(fav => fav.item_id));
                setLikedIds(ids);
            } catch (error) {
                console.error("Error loading favorites:", error);
            }
        }

        loadFavorites();
    }, [user]);

    async function handleFavorite(artwork) {
        if (!user) {
            alert("Please log in to favorite items!");
            return;
        }

        try {
            await toggleFavorite({
                id: artwork.id,
                title: artwork.title,
                image: artwork.image,
                source: "art",
            });

            // Update local state
            const newLikedIds = new Set(likedIds);
            if (newLikedIds.has(artwork.id)) {
                newLikedIds.delete(artwork.id);
            } else {
                newLikedIds.add(artwork.id);
            }
            setLikedIds(newLikedIds);
        } catch (error) {
            console.error("Error toggling favorite:", error);
        }
    }

    return (
        <div>
            <div className="page-header">
                <h1>Art</h1>
                <Nav />
            </div>
            <hr />
            {artworks.length === 0 ? (
                <div>
                    <p>Loading artworks...</p>
                </div>
            ) : (
                <>
                    <div className="artwork_container">
                        {artworks.slice(0, 3).map((artwork, index) => {
                            const displayTitle = artwork?.title && artwork.title.length > 27 
                                ? artwork.title.substring(0, 27) + '...' 
                                : artwork?.title || "Title";
                            const isLiked = likedIds.has(artwork?.id);
                            return (
                                <div className="art_card" key={artwork?.id || index}>
                                    <img
                                        className="titleImgContainer"
                                        src={artwork?.image || "/media/imgplaceholder.jpg"}
                                        alt={artwork?.title || `Art ${index + 1}`}
                                    />
                                    <p className="art_title" title={artwork?.title || "Title"}>
                                        {displayTitle}
                                    </p>
                                    <button 
                                        className={`favorite-btn ${isLiked ? 'liked' : ''}`}
                                        onClick={() => handleFavorite(artwork)}
                                    >
                                        ❤︎
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                    <div className="artwork_container">
                        {artworks.slice(3, 6).map((artwork, index) => {
                            const displayTitle = artwork?.title && artwork.title.length > 27 
                                ? artwork.title.substring(0, 27) + '...' 
                                : artwork?.title || "Title";
                            const isLiked = likedIds.has(artwork?.id);
                            return (
                                <div className="art_card" key={artwork?.id || index + 3}>
                                    <img
                                        className="titleImgContainer"
                                        src={artwork?.image || "/media/imgplaceholder.jpg"}
                                        alt={artwork?.title || `Art ${index + 4}`}
                                    />
                                    <p className="art_title" title={artwork?.title || "Title"}>
                                        {displayTitle}
                                    </p>
                                    <button 
                                        className={`favorite-btn ${isLiked ? 'liked' : ''}`}
                                        onClick={() => handleFavorite(artwork)}
                                    >
                                        ❤︎
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                    <div className="artwork_container">
                        {artworks.slice(6, 9).map((artwork, index) => {
                            const displayTitle = artwork?.title && artwork.title.length > 27 
                                ? artwork.title.substring(0, 27) + '...' 
                                : artwork?.title || "Title";
                            const isLiked = likedIds.has(artwork?.id);
                            return (
                                <div className="art_card" key={artwork?.id || index + 6}>
                                    <img
                                        className="titleImgContainer"
                                        src={artwork?.image || "/media/imgplaceholder.jpg"}
                                        alt={artwork?.title || `Art ${index + 7}`}
                                    />
                                    <p className="art_title" title={artwork?.title || "Title"}>
                                        {displayTitle}
                                    </p>
                                    <button 
                                        className={`favorite-btn ${isLiked ? 'liked' : ''}`}
                                        onClick={() => handleFavorite(artwork)}
                                    >
                                        ❤︎
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </>
            )}
            <hr />
        </div>
    );
}

export default Art;