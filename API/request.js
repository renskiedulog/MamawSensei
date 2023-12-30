const baseUrl = "https://api.mangadex.org";

export const makeRequest = async (endpoint, method = "GET", params = {}, filter = {}) => {
    // Build the URL with endpoint and params
    const url = new URL(`${baseUrl}${endpoint}`);
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

    // Build the final order query for filters
    const order = { ...filter };
    for (const [key, value] of Object.entries(order)) {
        url.searchParams.append(`order[${key}]`, value);
    }

    // Make the request
    try {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return await res.json();
    } catch (error) {
        console.error('Fetch error:', error);
        return [];
    }
};

export const getFilter = async (filter, limit) => {
    const includedTagNames = [filter];
    const tags = await makeRequest("/manga/tag", "GET", {}, {});
    const includedTagIDs = tags?.data?.data
        .filter((tag) => includedTagNames.includes(tag.attributes.name.en))
        .map((tag) => tag.id);

    return includedTagIDs;
};

export const fetchCoverImages = async (array) => {
    const coverImages = await Promise.all(
        array.flatMap(async (manga) => {
            const coverRelationships = manga?.relationships?.filter(
                (rel) => rel.type === "cover_art"
            );
            const coverPromises = coverRelationships
                ? coverRelationships.map(async (rel) => {
                    const response = await makeRequest(`/cover/${rel?.id}`, "GET", {}, {});
                    const coverUrl = `https://uploads.mangadex.org/covers/${manga.id}/${response?.data?.attributes?.fileName}.256.jpg`;
                    return {
                        manga,
                        cover: coverUrl,
                    };
                })
                : [];
            return Promise.all(coverPromises);
        })
    );

    return coverImages.flat();
};

export const fetchTopMangas = async (toggle) => {
    let filter = {};

    if (toggle) {
        filter = { followedCount: "desc" };
    } else {
        filter = { rating: "desc" };
    }

    try {
        const req = await makeRequest("/manga", "GET", { limit: 10 }, filter);
        return req;
    } catch (err) {
        console.log(err);
    }
};