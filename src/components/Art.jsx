import { useEffect, useState } from "react";
import Nav from "./Nav";
import { getRandomMetGallery } from "../services/metService";

function Art() {
  const [artworks, setArtworks] = useState([]);

  useEffect(() => {
    async function loadArtworks() {
      try {
        const data = await getRandomMetGallery("art", 9);
        setArtworks(data);
      } catch (error) {
        console.error("Error loading artworks:", error);
      }
    }

    loadArtworks();
  }, []);

  return (
    <div>
      <Nav />
      <hr />
      <h1>Art</h1>
      {artworks.length === 0 ? (
        <div>
          <p>Loading artworks...</p>
        </div>
      ) : (
        <>
          <div className="artwork_container">
            {artworks.slice(0, 3).map((artwork, index) => (
          <img
            key={artwork?.id || index}
            className="titleImgContainer"
            src={artwork?.image || "/media/imgplaceholder.jpg"}
            alt={artwork?.title || `Art ${index + 1}`}
          />
        ))}
      </div>
      <div className="art_title_container">
        {artworks.slice(0, 3).map((artwork, index) => (
          <h2 key={artwork?.id || index} className="art_title">
            {artwork?.title || "Title"}
          </h2>
        ))}
      </div>
      <div className="artwork_container">
        {artworks.slice(3, 6).map((artwork, index) => (
          <img
            key={artwork?.id || index + 3}
            className="titleImgContainer"
            src={artwork?.image || "/media/imgplaceholder.jpg"}
            alt={artwork?.title || `Art ${index + 4}`}
          />
        ))}
      </div>
      <div className="art_title_container">
        {artworks.slice(3, 6).map((artwork, index) => (
          <h2 key={artwork?.id || index + 3} className="art_title">
            {artwork?.title || "Title"}
          </h2>
        ))}
      </div>
      <div className="artwork_container">
        {artworks.slice(6, 9).map((artwork, index) => (
          <img
            key={artwork?.id || index + 6}
            className="titleImgContainer"
            src={artwork?.image || "/media/imgplaceholder.jpg"}
            alt={artwork?.title || `Art ${index + 7}`}
          />
        ))}
      </div>
      <div className="art_title_container">
        {artworks.slice(6, 9).map((artwork, index) => (
          <h2 key={artwork?.id || index + 6} className="art_title">
            {artwork?.title || "Title"}
          </h2>
        ))}
      </div>
        </>
      )}
      <hr />
    </div>
  );
}

export default Art;