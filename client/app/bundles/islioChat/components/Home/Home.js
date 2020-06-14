import React from 'react'
import { withRouter } from 'react-router-dom'
import { deleteRequest } from '../../actions/getServerActions'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

function Home (props) {
  const logOutRequest = () => {
    console.log('logout')
    props.deleteRequest('/api/users/sign_out')
    redirectToLogin()
  }
  const redirectToLogin = () => {
      props.updateTitle('Login')
      props.history.push('/login');
  }
  return (
    <div>
    <span className="h3">Afer Login Page</span>
    <button className="btn btn-primary" onClick={logOutRequest}>LogOut</button>
    </div>
  )
}
const mapDispatchToProps = dispatch => {
  return {
    deleteRequest: (path, params) => dispatch(deleteRequest(path, params))
  }
}
const home = reduxForm({
  form: 'home',
  touchOnBlur: false
})(withRouter(Home))

export default connect(
  state => ({
    auth: state.auth
  }),
  mapDispatchToProps
)(home)
