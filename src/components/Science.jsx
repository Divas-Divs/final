import { useEffect, useState } from "react";
import Nav from "./Nav";
import { getRandomScienceExhibit } from "../api/scienceAPI";
import { addFavorite } from "../supabase/favorites";

function Science({ user }) {
    const [exhibit, setExhibit] = useState(null);

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

    function handleFavorite() {
        if (!user) {
            alert("Please log in to favorite items");
            return;
        }

        addFavorite({
            id: exhibit.id,
            title: exhibit.title,
            image: exhibit.image,
            source: "science",
        });
    }

    return (
        <div>
            <Nav />
            <hr />

            <h1>Science</h1>

            <div className="science_section">
                <img
                    className="scienceImg"
                    src={
                        exhibit?.image ||
                        "/media/imgplaceholder.jpg"
                    }
                    alt="science"
                />
                <button onClick={handleFavorite}>
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