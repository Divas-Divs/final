import { useEffect, useState } from "react";
import Nav from "./Nav";
import { getNewestMetGallery } from "../services/metService";

function Home() {
  const [featured, setFeatured] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCarousel() {
      try {
        setLoading(true);

        const data = await getNewestMetGallery("painting", 6);

        setFeatured(data);
      } catch (error) {
        console.error("Error loading carousel:", error);
      } finally {
        setLoading(false);
      }
    }

    loadCarousel();
  }, []);

  return (
    <div>
      <Nav />
      <hr />

      <h1>New Additions</h1>

      <div id="slideCarousel">
        {loading ? (
          <div>
            <p>Loading featured artworks...</p>
            <div>
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i}>Loading...</div>
              ))}
            </div>
          </div>
        ) : featured && featured.length > 0 ? (
          featured.map((item) => (
            <img
              key={item.id}
              className="titleImgContainer"
              src={item.image}
              alt={item.title}
              title={item.title}
            />
          ))
        ) : (
          <p>No artworks found.</p>
        )}
      </div>

      <hr />
      <h2>About</h2>
      <p>Welcome to <strong><i>We need a name plz change</i></strong>. Here, you can curate a personal collection of art from various art and science museums and institutions. Our collections rotate every <strong><i>CHANGE weekly/monthly/daily/every # days whatever</i></strong>. Find and embrace your personal style with us. Collect limited addition art as it cycles through our site, and earn badges for participating in select collections. </p>
      <p>Our science department features current and popular science exhibits across multiple institutions. Select installments include interactive displays and hands-on activities. While we can't emulate all in-person interactivity, our team strives to create an engaging and thoughtful environment. Enjoy some online science content and digital games. Our art collection showcases all genres of art, including popular classic artists and new emerging talents.</p>
    </div>
  );
}

export default Home;