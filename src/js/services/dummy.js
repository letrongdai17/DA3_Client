import { api } from '../helpers/api';

export function fetchData() {
  return api.get('http://127.0.0.1:8000/api/categories');
}

export function foo() {}
