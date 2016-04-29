import React from 'react';
import { MainSection, LineItem, List } from './LineItem.es6';
import DragDropManager from '../../src/DragDropManager.es6'

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
