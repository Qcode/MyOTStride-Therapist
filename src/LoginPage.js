import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import Api from "./Api"
import PatientListPage from './PatientListPage'

class LoginPage extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			email:'',
			password:'',
			error: null,
		}
		this.handleEmail = this.handleEmail.bind(this);
		this.handlePassword = this.handlePassword.bind(this);
		this.sendUserInfo = this.sendUserInfo.bind(this);
	}
	handleEmail(text){
		this.setState({email:text.target.value})
	}
	handlePassword(text){
		this.setState({password:text.target.value})
	}
	sendUserInfo(){
    	Api.request('login', {
      		method: 'POST',
      		body: {
        		email: this.state.email,
        		password: this.state.password,
        		therapist: true,
      		},
    	})
      		.then(jsonToken => {
        		Api.setToken(jsonToken.token, jsonToken.id);
        		 this.props.navigate('PatientListPage');
      		})
      		.catch(err => this.setState({ error: err }));
  	}

	render(){
		return(
				<div id = 'LoginInfo'>
					<form onSubmit = {this.sendUserInfo}>
						<label>
							<input type = "text" value = {this.state.email} onChange = {this.handleEmail}/>
						</label>
						<label>
							<input type = "text" value = {this.state.password} onChange = {this.handlePassword}/>
						</label>
						<input type = 'submit' value = 'Submit'/>
					</form>
				<p>{this.state.error}</p>
				</div>
			);
	}
}

export default LoginPage
