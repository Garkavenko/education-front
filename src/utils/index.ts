import { API_URL } from '../constants/environment';
import debounce from 'lodash/debounce';

export function getUrl(url: string) {
  const safeUrl = url || '';
  if (safeUrl.includes('http')) {
    return url;
  }
  return `${API_URL}${url}`;
}

export const years = (() => {
  const currentYear = new Date().getFullYear();
  return [...Array(50)].map((_, index) => currentYear - index);
})();

export const debounceCall = debounce((func: any) => {
  func && func();
}, 200);
