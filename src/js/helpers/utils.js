/* global navigator, performance, window */
/* eslint no-console: 0 */
import dayjs from 'dayjs';
import styled from 'styled-components';
import { COMPANY_ROLE, ROLE } from '../config/constants';
import { getBrowserInfo, getOsInfo } from './agent';

const dateLocale = new Date();
const delta = dateLocale.getTimezoneOffset() * (-1);

export function isAndroid(userAgent = navigator.userAgent) {
  const android = /Android/;
  return android.test(userAgent);
}

export function isIos(userAgent = navigator.userAgent) {
  const android = /iPhone|iPad/;
  return android.test(userAgent);
}

export function getWindowSize() {
  const element = document.documentElement;
  const gBody = document.getElementsByTagName('body')[0];
  const width = window.innerWidth || element.clientWidth || gBody.clientWidth;
  const height = window.innerHeight || element.clientHeight || gBody.clientHeight;

  return {
    width,
    height,
  };
}

export function checkedBrowserVersion(userAgent = navigator.userAgent) {
  const info = getBrowserInfo(userAgent);
  return info.check;
}

export function checkedOsVersion(userAgent = navigator.userAgent) {
  const osInfo = getOsInfo(userAgent);
  return osInfo.check;
}


const perfNow = window.performance && (
  performance.now
  || performance.mozNow
  || performance.msNow
  || performance.oNow
  || performance.webkitNow
);

export function now() {
  return (perfNow && perfNow.call(performance)) || (new Date().getTime());
}

export function appInitMonitor() {
  window.addEventListener('load', () => {
    const { timing } = window.performance;
    const interactive = timing.domInteractive - timing.domLoading;
    const dcl = timing.domContentLoadedEventStart - timing.domLoading;
    const complete = timing.domComplete - timing.domLoading;
    console.log(`interactive ${interactive}ms, dcl ${dcl}ms, complete ${complete}ms`);
  });
}

export function getDate(insertDate) {
  const date = new Date(insertDate.substr(0, insertDate.indexOf(' ')));
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}年 ${month}月 ${day}日`;
}

export const convertToJapaneseDateTime = (value = '') => (
  dayjs((value || '').substr(0, 19)).add(delta, 'm').format('YYYY/MM/DD HH:mm:ss')
);

export const convertToJapaneseDate = (value = '') => (
  dayjs((value || '').substr(0, 19)).add(delta, 'm').format('YYYY/MM/DD')
);

export function addComma (value = 0) {
  return value.toString().replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function removeComma (value = '') {
  return value.toString().replace(/,/g, "");
}

export function removeFileExtension(fileName) {
  if (fileName) {
    const index = fileName.lastIndexOf('.');
    return fileName.substring(0, index);
  }

  return '';
}

export function mapRoleNameFromCompanyRole(companyRole) {
  let role = ROLE.END_USER;
  if (COMPANY_ROLE.SUPER_ADMIN.includes(companyRole)) {
    role = ROLE.ASILLA;
  } else if (COMPANY_ROLE.ADMIN.includes(companyRole)) {
    role = ROLE.ADMIN;
  }
  return role;
}

export const styleSelect = {
  container: provided => ({
    ...provided,
    width: 200,
    height: 30,
    fontSize: 16,
  }),
  menu: provided => ({
    ...provided,
    marginTop: 10,
  }),
  control: provided => ({
    ...provided,
    height: 30,
    cursor: 'pointer',
  }),
  option: provided => ({
    ...provided,
    fontSize: 16,
    maxHeight: 300,
    cursor: 'pointer',
    overflow: 'auto',
  }),
};

export const StyledContainerDatePicker = styled.div`
  .react-datepicker__day-name {
    visibility: hidden;
    position: relative;
    display: inline-flex;
    ${['日', '月', '火', '水', '木', '金', '土'].map((day, index) => (
    `&:nth-child(${index + 1}):before {
      content: '${day}';
      text-align: center;
      visibility: visible;
      width: 100%;
      position: absolute;
    }`
  ))}
  }
`;
