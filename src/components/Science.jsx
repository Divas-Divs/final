import { useEffect, useState } from "react";
import Nav from "./Nav";
import { getRandomScienceExhibit } from "../api/scienceAPI";

function Science() {
  const [exhibit, setExhibit] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await getRandomScienceExhibit();
        setExhibit(data);
      } catch (err) {
        console.error("Science load error:", err);
      }
    }

    load();
  }, []);

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

        <div className="science_text">
          <h1>
            {exhibit?.title || "Loading..."}
          </h1>

          <p>
            {exhibit?.description ||
              "Loading exhibit description..."}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Science;