import validator from 'validator';
import { VALIDATOR_TYPE } from '../config/constants';

/**
 *  return a message about error
 *
 * @param {string} source
 * @param {array} params
 * @returns {string}
 */
function format(source, params) {
  return params.reduce((message, value, index) => message.replace(new RegExp(`\\{${index}\\}`, 'g'), value), source);
}

export const messages = {
  required: '入力必須です',
  remote: '項目を入力してください',
  email: '有効なメールアドレスを入力してください',
  url: '有効なURLを入力してください',
  date: '有効な月日を入力してください',
  number: '有効な数値を入力してください',
  digits: '桁数を確認してください',
  equalTo: '同じ値を入力してください',
  maxlength: '最大{0}文字以下で入力してください',
  minlength: '最低{0}文字以上で入力してください',
  rangelength: '{0}文字から{1}文字以内で入力してください',
  range: '{0}から{1}までの間で入力してください.',
  max: '最大{0}以下で入力してください',
  min: '最小{0}以上で入力してください',
  validateFile: 'ファイル形式がサポートされていません。',
  requiredTemplateName: 'テンプレート名が必要です',
  boxNameNotEmpty: '認識枠は空ではありません',
  saveDetectionTemplateSuccess: 'テンプレートを保存しました',
  allBoxIsNotEmpty: '少なくとも１箇所以上の認識枠が必要です',
  postalCode: '郵便番号は有効ではありません。',
  companyIdentify: '企業識別子は、小文字の半角英数字6桁〜12桁で入力してください。',
  numberPhone: '電話番号は000-0000-0000の形式で入力してください',
  requirePasswordLetter: '大文字小文字のアルファベットまたは数字で入力してください',
  passwordCofirmNotMatching: 'パスワードが一致しません。',
  emailNotMatching: 'Incorrect email confirm',
  prefectureId: '都道府県を選択してください',
  emailMaxLength: 'メールアドレスは64文字以下にしてください。',
};

const acceptedFileExtensions = ['.zip', '.pdf', '.jpeg', '.jpg', '.png'];

/**
 *
 *
 * @export function
 * @param {string} input
 * @returns {string}
 */
export function validateRequired(input) {
  if (validator.isEmpty(input)) {
    return messages.required;
  }
  return '';
}

/**
 * validate email
 *
 * @export function
 * @param {string} email
 * @returns {string}
 */
export function validateEmail(email) {
  if (validator.isEmpty(email)) {
    return messages.required;
  }
  if (email.length > 64) {
    return messages.emailMaxLength;
  }
  if (!validator.isEmail(email)) {
    return messages.email;
  }
  return '';
}

/**
 * validate password
 *
 * @export function
 * @param {string} password
 * @returns {string}
 */
export function validatePassword(password) {
  if (validator.isEmpty(password)) {
    return messages.required;
  }
  if (!validator.isAlphanumeric(password, 'en-US')) {
    return messages.requirePasswordLetter;
  }
  if (validator.isLength(password, { max: 6 })) {
    return format(messages.minlength, [7]);
  }
  return '';
}

export function validateNumeric(param_input) {
  const input = param_input.replace(/,/g, '');
  if (validator.isEmpty(input)) {
    return messages.required;
  }
  if (!validator.isNumeric(input)) {
    return messages.number;
  }
  return '';
}

export function validateFile(fileName) {
  const fileExtension = fileName.substring(fileName.lastIndexOf('.')).toLowerCase();
  if (!acceptedFileExtensions.includes(fileExtension)) {
    return messages.validateFile;
  }
  return '';
}

export function validateFileExtension(fileName, fileExtendsionAccept) {
  const fileExtension = fileName.substring(fileName.lastIndexOf('.')).toLowerCase();
  if (!fileExtendsionAccept.includes(fileExtension)) {
    return messages.validateFile;
  }
  return '';
}

export function validatePrefecture(prefectureId) {
  if (prefectureId === 0 || prefectureId > 47) {
    return messages.prefectureId;
  }
  return '';
}

export function validatePostalCode(postalCode) {
  if (validator.isEmpty(postalCode)) {
    return messages.required;
  }
  if (!validator.isPostalCode(postalCode, 'JP')) {
    return messages.postalCode;
  }
  return '';
}

export function validateCompanyIdentify(value) {
  const validate = /^[a-z0-9]+$/;
  if (validator.isEmpty(value)) {
    return messages.required;
  }
  if (value.length < 6 || value.length > 12) {
    return messages.companyIdentify;
  }
  if (!validate.test(value)) {
    return messages.companyIdentify;
  }
  return '';
}

export function validatePhoneNumber(phone) {
  const validate = /^[0-9]([0-9]|-(?!-))+$/;
  if (validator.isEmpty(phone)) {
    return messages.required;
  }
  if (phone.length > 11 || phone.length < 9) {
    return '電話番号は半角数字で9〜11桁で入力してください。';
  }
  if (!validate.test(phone)) {
    return messages.numberPhone;
  }
  return '';
}

export function getValidatorError(validateType, value) {
  switch (validateType) {
    case VALIDATOR_TYPE.REQUIRE:
      return validateRequired(value);
    case VALIDATOR_TYPE.POSTAL:
      return validatePostalCode(value);
    case VALIDATOR_TYPE.PHONE_NUMBER:
      return validatePhoneNumber(value);
    case VALIDATOR_TYPE.PASSWORD:
      return validatePassword(value);
    case VALIDATOR_TYPE.EMAIL:
      return validateEmail(value);
    case VALIDATOR_TYPE.COMPANY_IDENTIFY:
      return validateCompanyIdentify(value);
    default:
      return '';
  }
}

export const getErrorsInput = (validateTypes, value) => {
  let errors = [];
  if (validateTypes.length === 0) {
    return [];
  }
  validateTypes.forEach((item) => {
    switch (item) {
      case VALIDATOR_TYPE.REQUIRE:
        errors = [...errors, validateRequired(value)];
        break;
      case VALIDATOR_TYPE.POSTAL:
        errors = [...errors, validatePostalCode(value)];
        break;
      case VALIDATOR_TYPE.PHONE_NUMBER:
        errors = [...errors, validatePhoneNumber(value)];
        break;
      case VALIDATOR_TYPE.PASSWORD:
        errors = [...errors, validatePassword(value)];
        break;
      case VALIDATOR_TYPE.EMAIL:
        errors = [...errors, validateEmail(value)];
        break;
      case VALIDATOR_TYPE.COMPANY_IDENTIFY:
        errors = [...errors, validateCompanyIdentify(value)];
        break;
      default:
        break;
    }
  });
  const errorMessage = errors.filter(item => item !== '');
  return errorMessage;
};
