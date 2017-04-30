import React from 'react'
import { Button, Checkbox, Form, Segment, Message } from 'semantic-ui-react'
import firebase from '../../configs/firebase'

class Login extends React.Component {
  state = {
    error: false,
    errorCode: '',
    errorMS: '',
    inputEmail: '',
    inputPassword: '',
  };

  onLogin = () => {
    const _this = this;
    const { inputEmail, inputPassword } = this.state
    if (inputEmail !== '' && inputPassword !== '') {
      firebase.auth().signInWithEmailAndPassword(inputEmail, inputPassword).catch((error) => {
        // Handle Errors here.
        _this.setState({
          error: true,
          errorCode: error.code,
          errorMS: error.message,
        })
        // ...
      });
    }
  }

  onRegister = () => {
    const _this = this;
    const { inputEmail, inputPassword } = this.state
    if (inputEmail !== '' && inputPassword !== '') {
      firebase.auth().createUserWithEmailAndPassword(inputEmail, inputPassword).catch((error) => {
        // Handle Errors here.
        _this.setState({
          error: true,
          errorCode: error.code,
          errorMS: error.message,
        })
        // ...
      });
    }
  }

  updateValue = (e, key) => {
    this.setState({
      [key]: e.target.value,
    })
  }

  render() {
    const { error, errorMS } = this.state
    return (
      <div className="container _center">
        <br />
        <br />
        <h1>Login</h1>
        <div className="row">
          <div className="D-5 _left">
            <br />
            <Message
              hidden={!error}
              attached
              negative
              header='Error'
              content={errorMS}
            />
            <Form className='attached fluid segment'>
              <Form.Field>
                <label>Email</label>
                <input placeholder='Email' onChange={(e) => this.updateValue(e, 'inputEmail')} />
              </Form.Field>
              <Form.Field>
                <label>Password</label>
                <input placeholder='Password' onChange={(e) => this.updateValue(e, 'inputPassword')} />
              </Form.Field>
            </Form>
            <br />
            <Button.Group fluid>
              <Button color="blue" onClick={() => this.onLogin()} >Login</Button>
              <Button.Or />
              <Button onClick={() => this.onRegister()} positive>Register</Button>
            </Button.Group>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
