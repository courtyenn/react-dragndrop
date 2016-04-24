import React from 'react';
import { MainSection, LineItem, List } from './LineItem.es6.js';
import DragDropManager from '../../src/DragDropManager.es6.js'

export default class App extends React.Component {

	constructor(){
		super();
	}

	render(){
		console.log(MainSection);
		return (
			<div>
				<MainSection></MainSection>
			</div>
		);
	}
}
