import React from 'react';
import Draggable from '../src/components/Draggable'

export default class App extends React.Component {
	constructor(){
		super();
	}

	render(){
		var x = "hi";
		console.log(Draggable);
		return (
			<div>
				<h1>Hello World!</h1>
			</div>
		);
	}
}
