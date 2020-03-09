import { api } from '../helpers/api';

export function login(userInfor) {
  return api.post('auth/signin', userInfor);
}

export function fetchUser() {
  return api.get('auth/info');
}

export function checkCompanyIdentify(companyIdentify) {
  return api.get(`/company/info/${companyIdentify}`);
}

export function loginOtherCompany(companyIdentify) {
  return api.post('/auth/otherCompanySignin', { company_identify: companyIdentify });
}
