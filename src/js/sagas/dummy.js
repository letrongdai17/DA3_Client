import {
  takeLatest,
  call,
  fork,
} from 'redux-saga/effects';
import * as services from '../services/dummy';
import { DUMMY_FETCH_DATA } from '../constants/dummy';

/**
 * @export
 * @param { type: String, onSuccess: func, onError: func} action
 */
export function* fetchData() {
  try {
    const result = yield call(services.fetchData);
    console.log(result);
  } catch (err) {
    console.log(err);
  }
}

export function* watchFetchData() {
  yield takeLatest(DUMMY_FETCH_DATA, fetchData);
}

export default function* dummy() {
  yield fork(watchFetchData);
}
