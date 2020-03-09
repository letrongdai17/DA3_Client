import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Alert from 'react-s-alert';
import { Link } from 'react-router-dom';
import {
  validatePassword,
  validateRequired,
} from '../../helpers/validator';
import messages from '../../config/messages';
import bgFooter from '../../../assets/img/bg-footer.png';
import logo from '../../../assets/img/logo.png';

const LinkIconChecked = "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3e%3c/svg%3e";

const StyledFormContainer = styled.main`
  height: calc(100vh - 104px) !important;
`;

const StyledForm = styled.div`
  width:96%;
  max-width:550px;
`;

const StyledContainer = styled.div`
  background: url('${bgFooter}') repeat;
`;

const StyledError = styled.div`
  height: 12px !important;
  font-size: 12px !important;
  margin-left: 14px;
`;

const RememberContainerStyled = styled.div`
  position: relative;
  min-height: 1.5rem;
  padding-left: 1.5rem !important;
`;

const CheckBoxStyled = styled.input`
  &:checked ~ .custom-control-label:before {
    color: #fff;
    border-color: #3173dc;
    background-color: #3173dc;
  }

  &:checked ~ .custom-control-label:after {
    background-image: url("${LinkIconChecked}");
  }

  position: absolute;
  z-index: -1;
  opacity: 0;
`;

const RememberLabelStyled = styled.label`
  position: relative;
  margin-bottom: 0;
  vertical-align: top;

  &:before {
    position: absolute;
    top: 3px;
    left: -1.5rem;
    display: block;
    width: 1rem;
    height: 1rem;
    pointer-events: none;
    content: "";
    background-color: #fff;
    border: #adb5bd solid 1px;
    transition: background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }

  &:after {
    position: absolute;
    top: 3px;
    left: -1.5rem;
    display: block;
    width: 1rem;
    height: 1rem;
    content: "";
    background: no-repeat 50%/50% 50%;
  }
`;

const StyledIcon = styled.span``;

function renderErrorInput(error) {
  const errorClass = classNames({
    'has-text-left ': true,
    'has-text-danger': true,
  });

  if (error !== '') {
    return (
      <StyledError className={errorClass}>
        {error}
      </StyledError>
    );
  }
  return <StyledError />;
}

const renderFooter = () => (
  <footer className="site-footer py-8">
    <div className="container">
      <div className="row justify-content-md-between">
        <div className="col-md-auto order-1 order-md-2">
          <div className="footer-menu">
            <a href="#">Term</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Development-Operation</a>
          </div>
        </div>
        <div className="col-md-auto order-2 order-md-1">
                  ©2019 <span className="text-info">JIJILLA.</span> All Right Reserved.
        </div>
      </div>
    </div>
  </footer>
);

const renderRemberMe = () => (
  <div className="d-flex align-items-center justify-content-between">
    <RememberContainerStyled className="d-flex align-items-center">
      <CheckBoxStyled type="checkbox" className="custom-control-input mr-2" name="remember" id="remember" />
      <RememberLabelStyled className="custom-control-label" htmlFor="remember">
        Remember my preference
      </RememberLabelStyled>
    </RememberContainerStyled>
    <a href="#">Forgot your password?</a>
  </div>
);

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: {
        value: '',
        isFocus: false,
        error: '',
      },
      password: {
        value: '',
        isFocus: false,
        error: '',
        isShow: false,
      },
      error: '',
      isLoading: false,
    };

    this.handleFocusEmail = this.handleFocusEmail.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleBlurEmail = this.handleBlurEmail.bind(this);

    this.handleFocusPassowrd = this.handleFocusPassowrd.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleBlurPassword = this.handleBlurPassword.bind(this);

    this.handleLogin = this.handleLogin.bind(this);

    this.handleKeyPress = this.handleKeyPress.bind(this);

    this.onError = this.onError.bind(this);
    this.onSuccess = this.onSuccess.bind(this);

    this.handleShowPassword = this.handleShowPassword.bind(this);
    this.onErrorCheckCompanyIdentify = this.onErrorCheckCompanyIdentify.bind(this);
  }

  componentDidMount() {
    const { companyIdentify } = this.props.match.params;
    this.props.checkCompanyIdentify(() => {},
      this.onErrorCheckCompanyIdentify, companyIdentify);
  }

  onLoading(value) {
    this.setState({
      isLoading: value,
    });
  }

  onSuccess() {
    this.onLoading(false);
    const { companyIdentify } = this.props.match.params;
    setTimeout(() => {
      this.props.history.push(`/${companyIdentify}`);
    }, 50);
  }

  onError(err) {
    try {
      const { status } = err.response;
      switch (status) {
        case 400:
          Alert.error(err.response.data.message);
          break;

        case 422: {
          const { data } = err.response;
          Object.keys(data).forEach((key) => {
            data[key].forEach(item => Alert.error(item));
          });
          break;
        }

        case 500:
          break;

        default: break;
      }
    } catch (e) {
      this.setState({ error: messages.UNKNOWN_ERROR });
    } finally {
      this.setState({ error: err.response.statusText });
      this.onLoading(false);
    }
  }

  onErrorCheckCompanyIdentify() {
    this.props.history.push('/notfound');
  }

  setItem(key, value) {
    const state = { ...this.state };
    Object.assign(state[key], value);
    this.setState(state);
  }

  setError(key, error) {
    const state = { ...this.state };
    state[key].error = error;
    this.setState(state);
  }

  setErrorFormInputs() {
    const {
      errorEmail,
      errorPassword,
    } = this.getErrorFormInputs();
    this.setError('email', errorEmail);
    this.setError('password', errorPassword);
  }

  getErrorFormInputs() {
    const { email, password } = this.state;
    const errorEmail = validateRequired(email.value);
    const errorPassword = validatePassword(password.value);
    return {
      errorEmail,
      errorPassword,
    };
  }

  handleFocusEmail() {
    const email = {
      ...this.state.email,
      isFocus: true,
    };
    this.setItem('email', email);
    this.setState({ error: '' });
  }

  handleChangeEmail(e) {
    const email = {
      ...this.state.email,
      value: e.target.value,
    };
    this.setItem('email', email);
  }

  handleBlurEmail() {
    const email = {
      ...this.state.email,
      isFocus: false,
      error: validateRequired(this.state.email.value),
    };
    this.setItem('email', email);
  }

  handleFocusPassowrd() {
    const password = {
      ...this.state.password,
      isFocus: true,
      value: this.state.password.value,
    };
    this.setItem('password', password);
    this.setState({ error: '' });
  }

  handleChangePassword(e) {
    const password = {
      ...this.state.password,
      value: e.target.value,
    };
    this.setItem('password', password);
  }

  handleBlurPassword() {
    const password = {
      ...this.state.password,
      isFocus: false,
      error: validatePassword(this.state.password.value),
    };
    this.setItem('password', password);
  }

  handleLogin(e) {
    e.preventDefault();
    if (this.isFormValidation()) {
      this.login();
    } else {
      this.setErrorFormInputs();
    }
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.handleLogin();
    }
  }

  handleShowPassword() {
    const { password } = this.state;
    password.isShow = !password.isShow;
    this.setItem('password', password);
  }

  isFormValidation() {
    const {
      errorEmail,
      errorPassword,
    } = this.getErrorFormInputs();
    if (errorEmail || errorPassword) {
      return false;
    }
    return true;
  }

  login() {
    this.onLoading(true);
    const { email, password } = this.state;
    const { companyIdentify } = this.props.match.params;
    const userInfor = {
      email: email.value,
      login_pass: password.value,
      company_identify: companyIdentify,
    };

    this.props.login(userInfor, this.onSuccess, this.onError);
  }

  renderEmailInput() {
    const { email } = this.state;
    return (
      <div>
        <div className="d-flex align-items-center py-2 border-bottom i-group mb-2">
          <i className="ion-ios-mail mr-3" />
          <input
            type="text"
            name="email"
            placeholder="Login ID"
            onFocus={this.handleFocusEmail}
            onChange={this.handleChangeEmail}
            onBlur={this.handleBlurEmail}
            onKeyPress={this.handleKeyPress}
          />
        </div>
        {renderErrorInput(email.isFocus ? '' : email.error)}
      </div>
    );
  }

  renderPasswordInput() {
    const { password } = this.state;
    const passwordType = password.isShow ? 'text' : 'password';
    const iconRightClass = password.isShow
      ? 'ion-ios-eye'
      : 'ion-ios-eye-off';

    return (
      <div>
        <div className="d-flex align-items-center py-2 border-bottom i-group mb-2">
          <i className="ion-ios-lock mr-3" />
          <input
            type={passwordType}
            name="password"
            placeholder="Password"
            onFocus={this.handleFocusPassowrd}
            onChange={this.handleChangePassword}
            onBlur={this.handleBlurPassword}
            onKeyPress={this.handleKeyPress}
          />
          <StyledIcon
            onClick={this.handleShowPassword}
          >
            <i
              className={`${iconRightClass} ml-auto toggle-password cursor-pointer`}
            />
          </StyledIcon>
        </div>
        {renderErrorInput(password.isFocus ? '' : password.error)}
      </div>
    );
  }

  renderLoginButton() {
    return (
      <div className="d-flex align-items-center i-group mb-7 mt-2">
        <input
          type="submit"
          className="ji-btn shadow"
          value="Login"
          onClick={this.handleLogin}
        />
      </div>
    );
  }

  render() {
    return (
      <StyledContainer>
        <StyledFormContainer className="member-section d-flex w-100 justify-content-center">
          <div className="login-wrap w-100 pt-10 mt-lg-10">
            <div className="site-logo mb-6 mb-lg-10">
              <Link to="/HomePage" className="site-logo">
                <img className="mx-auto" src={logo} alt="..." />
              </Link>
            </div>
            <StyledForm className="shadow border rounded p-6 p-lg-10 form-wrap mx-auto bg-white">
              <form>
                {this.renderEmailInput()}
                {this.renderPasswordInput()}
                {this.renderLoginButton()}
                {renderRemberMe()}
              </form>
            </StyledForm>
          </div>
        </StyledFormContainer>
        {renderFooter()}
      </StyledContainer>
    );
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  checkCompanyIdentify: PropTypes.func.isRequired,

  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

export default Login;
