
const jsonRegex = /{[\s\S]*?}/g;
export const extractJSON = (text) => {
    const jsonMatches = text.match(jsonRegex);
    return jsonMatches?.map(str => {
        try {
            return JSON.parse(str);
        } catch (e) {
            return null; // Ignore invalid JSON
        }
    }).filter(Boolean);
};
