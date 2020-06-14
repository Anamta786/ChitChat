import React, {useState} from 'react';
import axios from 'axios';
import './RegistrationForm.css';
import {API_BASE_URL} from '../../constants/apiContants';
import { withRouter } from "react-router-dom";
import { postRequest } from '../../actions/getServerActions'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'

function RegistrationForm(props) {
    const [state , setState] = useState({
        email : "",
        password : "",
        confirmPassword: "",
        successMessage: null
    })
    const handleChange = (e) => {
        const {id , value} = e.target
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
    }
    const sendDetailsToServer = () => {
        if(state.email.length && state.password.length) {
          if (state.password.length > 5) {
            props.showError(null);
            const payload={
                "email":state.email,
                "password":state.password,
            }
      props.postRequest('/api/users', { type: null, values: payload })
      .then(res => {
        console.log(res, '{}{}{}{}{}{{}{}}')
        if (res.code === 200) {
          props.history.push('/login')
        }
      })
        } else {
            props.showError('Password should be atleast 6 character or more.')
        }
      } else {
        props.showError('Please enter valid username and password.')
      }
    }
    const redirectToHome = () => {
        props.updateTitle('Home')
        props.history.push('/home');
    }
    const redirectToLogin = () => {
        props.updateTitle('Login')
        props.history.push('/login');
    }
    const handleSubmitClick = (e) => {
        e.preventDefault();
        if(state.password === state.confirmPassword) {
            sendDetailsToServer()
        } else {
            props.showError('Passwords do not match');
        }
    }
    return(
        <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
            <form>
                <div className="form-group text-left">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input type="email"
                       className="form-control"
                       id="email"
                       aria-describedby="emailHelp"
                       placeholder="Enter email"
                       value={state.email}
                       onChange={handleChange}
                />
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group text-left">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password"
                        className="form-control"
                        id="password"
                        placeholder="Password"
                        value={state.password}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group text-left">
                    <label htmlFor="exampleInputPassword1">Confirm Password</label>
                    <input type="password"
                        className="form-control"
                        id="confirmPassword"
                        placeholder="Confirm Password"
                        value={state.confirmPassword}
                        onChange={handleChange}
                    />
                </div>
                <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={handleSubmitClick}
                >
                    Register
                </button>
            </form>
            <div className="alert alert-success mt-2" style={{display: state.successMessage ? 'block' : 'none' }} role="alert">
                {state.successMessage}
            </div>
            <div className="mt-2">
                <span>Already have an account? </span>
                <span style={{color: '#007bff', fontWeight: 'bold', cursor: 'pointer'}}  onClick={() => redirectToLogin()}>Login here</span>
            </div>

        </div>
    )
}

const mapDispatchToProps = dispatch => {
  return {
    postRequest: (path, params) => dispatch(postRequest(path, params))
  }
}
const userSignUp = reduxForm({
  form: 'signUpForm',
  touchOnBlur: false
})(withRouter(RegistrationForm))

export default connect(
  state => ({
    server: state.server
  }),
  mapDispatchToProps
)(userSignUp)
// export default withRouter(RegistrationForm);
