import React from 'react';
import {
  withRouter,
  BrowserRouter as Router
} from 'react-router-dom'

class PatientListPage extends React.Component{
	render(){
		return (
			<h1>YOU MADE IT</h1>
			);
	}
}
export default withRouter(PatientListPage)
