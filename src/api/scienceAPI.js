const NASA_BASE_URL = "https://api.nasa.gov/planetary/apod";

const API_KEY = "HOq89QfMU68p2sjoFVvb62vR2QBuiDaxPwX2F87c";

const START_DATE = new Date("1995-06-16");
const TODAY = new Date();

function getRandomDate() {
    const start = START_DATE.getTime();
    const end = TODAY.getTime();

    const randomTime = start + Math.random() * (end - start);
    const date = new Date(randomTime);

    return date.toISOString().split("T")[0];
}

async function fetchAPOD(date) {
    const url = `${NASA_BASE_URL}?api_key=${API_KEY}&date=${date}`;

    const res = await fetch(url);
    if (!res.ok) return null;

    const data = await res.json();

    if (data.media_type !== "image") return null;

    return data;
}

export async function getRandomScienceExhibit() {
    const date = getRandomDate();

    const data = await fetchAPOD(date);

    if (!data) {
        return {
            id: date,
            title: "No Image Available",
            image: "/media/imgplaceholder.jpg",
            description: "NASA did not return an image.",
        };
    }

    return {
        id: date,
        title: data.title || "Untitled NASA Image",
        image: data.url,
        description: data.explanation || "No description available.",
    };
}