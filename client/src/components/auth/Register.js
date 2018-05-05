import React, {Component} from 'react';

class Register extends Component {
	constructor (){
		super();
		this.state = {
			name: '',
			email: '',
			password: '',
			password2: '',
			errors: {}
		};
		this.onInputChange = this.onInputChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onInputChange(e){
		this.setState({[e.target.name]: e.target.value});
	}
	onSubmit(e){
		e.preventDefault();
		const newUser = {
			name: this.state.name,
			email: this.state.email,
			password: this.state.password,
			password2: this.state.password2
		}
		console.log(newUser);
	}
	render(){
		return(
			<div className="register">
			<div className="container">
			  <div className="row">
				<div className="col-md-8 m-auto">
				  <h1 className="display-4 text-center">Sign Up</h1>
				  <p className="lead text-center">Create your DevConnector account</p>
				  <form onSubmit={this.onSubmit}>
					<div className="form-group">
					  <input type="text" className="form-control form-control-lg" onChange={this.onInputChange} value={this.state.name} placeholder="Name" name="name" required />
					</div>
					<div className="form-group">
					  <input type="email" className="form-control form-control-lg" onChange={this.onInputChange} value={this.state.email} placeholder="Email Address" name="email" />
					  <small className="form-text text-muted">This site uses Gravatar so if you want a profile image, use a Gravatar email</small>
					</div>
					<div className="form-group">
					  <input type="password" className="form-control form-control-lg" onChange={this.onInputChange} value={this.state.password} placeholder="Password" name="password" />
					</div>
					<div className="form-group">
					  <input type="password" className="form-control form-control-lg" onChange={this.onInputChange} value={this.state.password2} placeholder="Confirm Password" name="password2" />
					</div>
					<input type="submit" value="Submit" className="btn btn-info btn-block mt-4" />
				  </form>
				</div>
			  </div>
			</div>
		  </div>

		);
	};
}

export default Register;