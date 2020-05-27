import {API_URL} from "../constants";

export function getUrl(url) {
    const safeUrl = url || '';
    if (safeUrl.includes('http')) {
        return url;
    }
    return `${API_URL}${url}`;
}