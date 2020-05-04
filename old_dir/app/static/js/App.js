import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, Route} from "react-router-dom";


class App extends Component{
	render(){
		return(
			<BrowserRouter>
			  <div>
			  <Route
				  exact={true}
					path="/"
					render={()=>(
						<div>Hello React</div>
					)}
			  />

				<Route
				  exact={true}
					path="/login"
					render={()=> (
						<div>Hello Again</div>
					)}
				/>

				<Route
				  exact={true}
					path="/allevents"
					render={()=>(
						<div>Hello hello hello</div>
					)}
				/>
				</div>
				</BrowserRouter>
		)
	}
}
export default App;
