export const TEMPLATE_FIGURE_MARGIN_LEFT = 20;

export const CHAR_LENGTH_TYPE = {
  SINGLE_LINE: 1,
  MULTIPLE_LINE: 2,
};

export const CHAR_TYPE = {
  NUMBER: 1,
  NAME: 2,
  ADDRESS: 3,
  MAIL: 4,
  OTHER: 5,
  KATAKANA: 6,
  SPECIAL_NUM: 7,
  CHECKBOX_RECT: 8,
  CHECKBOX_CIRCLE: 9,
  DATE: 10,
  POST_CODE: 11,
  TELEPHONE: 12,
  CURRENCY: 13,
};

export const CHECK_BOX = {
  YES: 'Y',
  NO: 'N',
};

export const RECORDS_PER_PAGE = {
  TEN: 10,
  TWENTY: 20,
  THIRTY: 30,
  FIFTY: 50,
  HUNDRED: 100,
};

export const CHARACTOR_PROBABILITY = {
  DICTIONARY: 1,
  HIGH: 0.95,
  NORMAL: 0.9,
};

export const ROLE = {
  ASILLA: 'super admin',
  ADMIN: 'admin',
  END_USER: 'end user',
};

export const COMPANY_ROLE = {
  SUPER_ADMIN: [1],
  ADMIN: [2, 3, 4],
  END_USER: [5, 6, 7],
};

export const USER_ENABLE_TYPES = [
  {
    id: -1,
    text: '全て',
  },
  {
    id: 1,
    text: 'アクティブ',
  },
  {
    id: 0,
    text: '非アクティブ',
  },
];

export const USER_ROLE_IDS = [
  {
    id: -1,
    text: '全て権限',
  },
  {
    id: 1,
    text: '管理者',
  },
  {
    id: 2,
    text: 'オペレータ',
  },
];

export const UPDATE_USER_STATUS = {
  ALL_USER_STATUS: {
    id: -1,
    text: '基本設定',
  },
  ACTIVE: {
    id: 1,
    text: 'アクティブ',
  },
  NO_ACTIVE: {
    id: 0,
    text: '非アクティブ',
  },
};

export const UPDATE_USER_ROLE_IDS = {
  ALL_ROLES: {
    id: -1,
    text: '基本設定',
  },
  ADMIN: {
    id: 1,
    text: '管理者',
  },
  USER: {
    id: 2,
    text: 'オペレータ',
  },
};

export const USER_ROLE_TYPES = [
  { value: 8, label: '管理者' },
  { value: 9, label: 'オペレータ' },
];

export const USER_STATUS_TYPES = [
  { value: 1, label: 'アクティブ' },
  { value: 0, label: '非アクティブ' },
];

export const USER_ROLE = {
  ADMIN: 8,
  END_USER: 9,
};

export const USER_ROLE_ID = {
  ADMIN: 1,
  END_USER: 2,
};

export const COMPANY_STATUS = {
  ACTIVE: { id: 1, label: 'アクティブ' },
  INACTIVE: { id: 0, label: '非アクティブ' },
};

export const COMPANY_STATUSES_SELECT = {
  ALL: { id: -1, label: '全て' },
  ACTIVE: { id: 1, label: 'アクティブ' },
  INACTIVE: { id: 0, label: '非アクティブ' },
};

export const FOLDER_STATUSES = [
  { id: 0, label: '認識中' },
  { id: 1, label: '未処理あり' },
  { id: 2, label: '修正中あり' },
  { id: 3, label: '完了' },
  { id: 4, label: 'エラー' },
];

export const PROJECT_STATUSES = {
  ACTIVE: { id: 1, label: 'アクティブ' },
  INACTIVE: { id: 0, label: '非アクティブ' },
};

export const PROJECT_STATUSES_SELECT = {
  ALL: { id: -1, label: '全て' },
  ACTIVE: { id: 1, label: 'アクティブ' },
  INACTIVE: { id: 0, label: '非アクティブ' },
};

export const ALERT_WINDOW_SIZE = 992;

export const CSV_TYPE = {
  DOWNLOAD_ORIGIN_CSV: 0,
  DOWNLOAD_DICTIONARY_CSV: 1,
  DOWNLOAD_FIXED_CSV: 2,
};

export const CONSTRACT_PLAN = {
  STANDARD: { value: 1, label: 'スタンダードプラン(¥48,000 / 月)' },
  BUSINESS: { value: 2, label: 'ビジネスプラン（¥90,000 / 月）' },
};

export const PAYMENT = {
  BASIC_CREDIT: { value: 1, label: 'クレジットカード払い' },
};

export const VALIDATOR_TYPE = {
  REQUIRE: 'REQUIRE',
  POSTAL: 'POSTAL',
  PASSWORD: 'PASSWORD',
  PHONE_NUMBER: 'PHONE_NUMBER',
  EMAIL: 'EMAIL',
  COMPANY_IDENTIFY: 'COMPANY_IDENTIFY',
};
