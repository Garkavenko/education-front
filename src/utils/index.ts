import { API_URL } from '../constants/environment';

export function getUrl(url: string) {
  const safeUrl = url || '';
  if (safeUrl.includes('http')) {
    return url;
  }
  return `${API_URL}${url}`;
}
