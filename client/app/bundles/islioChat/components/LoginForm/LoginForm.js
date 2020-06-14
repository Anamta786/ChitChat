import React, { useState } from 'react'
import './LoginForm.css';
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { withRouter } from "react-router-dom";
import { postRequest } from '../../actions/getServerActions'

function LoginForm (props) {
  const { handleSubmit } = props
  const [state , setState] = useState({
    email : "",
    password : "",
    successMessage: null
  })
  const handleChange = (e) => {
    const {id , value} = e.target
    setState(prevState => ({
      ...prevState,
      [id] : value
    }))
  }

  const logInUser = () => {
    const payload = {
      'email' : state.email,
      'password' : state.password,
    }
    if (state.email.length && state.password.length) {
      let values = { user: {} }
      values['user']['email'] = state.email
      values['user']['password'] = state.password
      console.log('values', values)
      props.postRequest('/api/users/sign_in', { type: null, values: values })
      .then(res => {
        if (res.code === 200) {
        console.log(res, '{}{}{}{}{}{{}{}}')
        redirectToHome()
      } else if (res.code === 404) {
        props.showError(res.currentUser)
      }
      })
        } else {
            props.showError('Please enter valid username and password')
        }
    }

  const redirectToHome = () => {
    props.updateTitle('Home')
    props.history.push('/home');
  }
  const redirectToRegister = () => {
    console.log(props, '=====================')
    props.history.push('/register');
    props.updateTitle('Register');
  }
  return (
    <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
      <form onSubmit={handleSubmit(logInUser)}>
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
            <div className="form-check">
            </div>
            <button
                type="submit"
                className="btn btn-primary"
                >Submit</button>
      </form>
      <div className="alert alert-success mt-2" style={{display: state.successMessage ? 'block' : 'none' }} role="alert">
        {state.successMessage}
      </div>
      <div className="registerMessage">
        <span>Dont have an account? </span>
        <span style={{ color: '#007bff', fontWeight: 'bold', cursor: 'pointer' }} onClick={() => redirectToRegister()}>Register</span>
      </div>
    </div>
  )
}
const mapDispatchToProps = dispatch => {
  return {
    postRequest: (path, params) => dispatch(postRequest(path, params))
  }
}
const userSignIn = reduxForm({
  form: 'newSession',
  touchOnBlur: false
})(withRouter(LoginForm))

export default connect(
  state => ({
    auth: state.auth
  }),
  mapDispatchToProps
)(userSignIn)
// export default withRouter(LoginForm);
