// Create a lookup table of episodes by slug value
export const getGroupedEpisodes = data => {
    return data.edges.reduce((acc, obj) => {
        const key = obj.node.fields.slug;
        if (!acc[key]) {
            acc[key] = {};
        }
        acc[key] = obj;
        return acc;
    }, {});
};

// Convert px number value to rem string value
export const toRem = (value: number) => {
    return `${value / 16}rem`;
};
