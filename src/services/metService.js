import { searchMetObjects, getMetObject } from "../api/metAPI.js";

export async function getRandomMetGallery(query = "art", limit = 9) {
    const ids = await searchMetObjects(query);

    if (!ids?.length) return [];

    const shuffled = ids
        .slice(0, 80)
        .sort(() => Math.random() - 0.5)
        .slice(0, limit * 3);

    const results = [];

    for (const id of shuffled) {
        const item = await getMetObject(id);
        if (item) results.push(item);

        if (results.length >= limit) break;
    }

    return results;
}

export async function getNewestMetGallery(query = "art", limit = 6) {
    const ids = await searchMetObjects(query);

    const safeIds = ids.slice(0, 50);

    const results = await Promise.all(
        safeIds.map((id) => getMetObject(id))
    );

    const valid = results.filter(Boolean);

    valid.sort((a, b) => {
        const aDate = parseInt(a.date) || 0;
        const bDate = parseInt(b.date) || 0;
        return bDate - aDate;
    });

    return valid.slice(0, limit);
}