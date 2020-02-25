import React, { Component } from 'react';

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

    render() {
        let {formName} = this.props
        let {username, password, img_url} = this.state

        return (
        <form onSubmit={this.handleSubmit}>
            <h1>{formName}</h1>
            <label htmlFor="username">Username:</label>
            <input type="text" autoComplete="off" name="username" value={username} onChange={this.handleChange}/>
            <label htmlFor="password">Password:</label>
            <input type="password" autoComplete="off" name="password" value={password} onChange={this.handleChange}/>
            {formName === "Sign up Form"? 
            (<p>
                <label htmlFor="img_url">Profile Picture:</label>
                <input type="text" autoComplete="off" name="img_url" value={img_url} onChange={this.handleChange}/>
            </p>) : null}
            <input type="submit" value="Submit"/>
        </form>
        );
    }

}

export default SignUpSignInForm;