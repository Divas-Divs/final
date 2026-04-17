const BASE_URL = "https://collectionapi.metmuseum.org/public/collection/v1";

async function fetchFromMet(endpoint) {
    const res = await fetch(`${BASE_URL}${endpoint}`);

    if (!res.ok) throw new Error("MET API request failed");

    return res.json();
}

export async function searchMetObjects(query) {
    const data = await fetchFromMet(`/search?hasImages=true&q=${encodeURIComponent(query)}`);

    return data.objectIDs || [];
}

export async function getMetObject(id) {
    try {
        const data = await fetchFromMet(`/objects/${id}`);

        if (!data.primaryImageSmall) return null;

        return {
            id: data.objectID,
            title: data.title,
            image: data.primaryImageSmall,
            artist: data.artistDisplayName,
            date: data.objectDate,
        };
    } catch {
        return null;
    }
}