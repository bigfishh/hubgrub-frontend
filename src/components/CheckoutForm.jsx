import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import { Image, Button, Form} from 'semantic-ui-react';

class SignUpSignInForm extends Component {

    state = {
        username: "",
        password: "",
        img_url: ""
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.handleSubmit(this.state)
    }

    handleChange = (e) => {
        let {name, value} = e.target
        this.setState({
        [name]: value
        })
    }

    renderSignInForm = () => {
        let {username, password} = this.state
        return (  
            <>
                <Form.Field required>
                    <label>Username</label>
                    <Form.Input width={15} type="text" autoComplete="off" name="username" value={username} onChange={this.handleChange} placeholder='Username' />
                </Form.Field>
                <Form.Field required>
                    <label>Password</label>
                    <Form.Input width={15} type="password" autoComplete="off" name="password" value={password} onChange={this.handleChange} placeholder='Password' />
                </Form.Field>
            </>
        )
    }

    render() {
        let {formName} = this.props
        let {img_url} = this.state

        return (
            <div className="SignUpSignInBackground">
                <div className="SignUpSignIn">
                    <Image className="grubLogo" size='small' rounded src="https://s2.q4cdn.com/723557020/files/Grubhub-logo-251by107px@2x.png"/>
                    <Form position="center" onSubmit={this.handleSubmit}>
                        {/* <h2 className="formHeader">{formName}</h2> */}
                        {this.renderSignInForm()}
                        {formName === "Sign up Form"? 
                        (<Form.Field required>
                            <label htmlFor="img_url">Profile Picture:</label>
                            <Form.Input width={15} type="text" autoComplete="off" name="img_url" value={img_url} onChange={this.handleChange} placeholder='Picture URL'/>
                        </Form.Field>) : null}
                        <Button type='submit' value="Submit">Submit</Button>
                    </Form>
                    {formName === "Sign up Form"? <p className="signOptions">Already a member? <Link to="/signin">Sign In</Link></p> : <p className="signOptions">Not a member yet? <Link to="/signup">Sign Up</Link></p>}
                </div>
            </div>
        );
    }

}

export default withRouter(SignUpSignInForm);