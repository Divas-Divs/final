import { useEffect, useState, useRef } from "react";
import Nav from "./Nav";
import { getNewestMetGallery } from "../services/metService";

function Home({ user }) {
    const [featured, setFeatured] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);
    const carouselRef = useRef(null);

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

    // Auto-scroll carousel
    useEffect(() => {
        const interval = setInterval(() => {
            if (carouselRef.current && featured && featured.length > 0) {
                const carousel = carouselRef.current;
                const itemWidth = carousel.querySelector(".titleImgContainer")?.offsetWidth || 0;
                const gap = 80;
                const scrollWidth = itemWidth + gap;
                const containerWidth = carousel.offsetWidth;

                // Calculate position for next image
                let newScrollPosition = carousel.scrollLeft + scrollWidth;
                
                // If we've scrolled past the "real" items, reset to start
                const maxScroll = featured.length * scrollWidth;
                if (newScrollPosition >= maxScroll) {
                    // Instantly reset scroll without animation
                    carousel.style.scrollBehavior = "auto";
                    carousel.scrollLeft = 0;
                    carousel.style.scrollBehavior = "smooth";
                    newScrollPosition = scrollWidth;
                    setCurrentIndex(1 % featured.length);
                } else {
                    carousel.scrollLeft = newScrollPosition;
                    // Calculate which image is in the center
                    const imageIndex = Math.round(newScrollPosition / scrollWidth);
                    setCurrentIndex(imageIndex % featured.length);
                }
            }
        }, 3000);

        return () => clearInterval(interval);
    }, [featured]);

    return (
        <div>
            <div className="page-header">
                <h1>New Additions</h1>
                <Nav user={user} />
            </div>
            <hr />

            <div className="carousel-container">
                <div id="slideCarousel" ref={carouselRef}>
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
                        <>
                            {featured.map((item) => (
                                <img
                                    key={item.id}
                                    className="titleImgContainer"
                                    src={item.image}
                                    alt={item.title}
                                    title={item.title}
                                />
                            ))}
                            {/* Duplicate items for infinite scroll effect */}
                            {featured.map((item) => (
                                <img
                                    key={`${item.id}-duplicate`}
                                    className="titleImgContainer"
                                    src={item.image}
                                    alt={item.title}
                                    title={item.title}
                                />
                            ))}
                        </>
                    ) : (
                        <p>No Artwork Was Found.</p>
                    )}
                </div>

                {/* Custom Indicator Dots */}
                {featured && featured.length > 0 && (
                    <div className="carousel-indicators">
                        {featured.map((_, index) => (
                            <div
                                key={index}
                                className={`indicator-dot ${index === currentIndex ? "active" : ""}`}
                            />
                        ))}
                    </div>
                )}
            </div>

            <hr />
            <div className="aboutSection">
                <h2>About</h2>
                <p>Welcome to Museum Diva. Here, you can curate a personal collection of art from various art and science museums and institutions. Our collections rotate every page refresh, but it can take some time to load the vast options, so be patient! Find and embrace your personal style with us. Collect limited edition art as it cycles through our site, and earn badges for participating in select collections. </p>
                <p>Our science department features current and popular science exhibits across multiple institutions. Select installments include interactive displays and hands-on activities. While we can't emulate all in-person interactivity, our team strives to create an engaging and thoughtful environment. Enjoy some online science content and digital games. Our art collection showcases all genres of art, including popular classic artists and new emerging talents.</p>
            </div>
        </div>
    );
}

export default Home;