import React from 'react';
import {
  withRouter,
  BrowserRouter as Router
} from 'react-router-dom'

class PatientListPage extends React.Component{

	render(){
		return (
		<div>
			<h1>YOU MADE IT</h1>
			<button type ='text' value='goBack' onclick= {}/>
		</div>
			);
	}
}
export default withRouter(PatientListPage)
