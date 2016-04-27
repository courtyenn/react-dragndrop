'use strict';
import React, {Component} from 'react';
import Draggable from '../../src/components/Draggable';
import DropTarget from '../../src/components/DropTarget';
import IdGenerator from '../../src/IdGenerator.es6.js';
import DropTargetModel from '../../src/models/DropTarget.es6.js';
import DragDropManager from '../../src/DragDropManager.es6.js';
import DropTargetStyles from '../../src/styles/DropTargetStyles';

// const dragDropManager = new DragDropManager(); was breaking stuff
const dragDropManager = new DragDropManager();

export class List extends Component{
	render(){
		return(
			<div>
			{this.props.title}
				<ul>
					{this.props.children}
				</ul>
			</div>
		);
	}
}

export class LineItem extends Component{
	render(){
		return(
			<li>{this.props.children}</li>
		);
	}
}

export class MainSection extends Component{
	constructor(){
		super();
		this.componentId = IdGenerator.generateId();
		this.dropTargets = [];
		var x = IdGenerator.generateId();
		console.log(dragDropManager);
		this.style = {
			"fontFamily": "sans-serif",
			"cursor": "default",
			"backgroundColor": "pink",
			"zIndex": "5"
		};
	}
	render(){
		return(
			<div>
				{this.renderDropTargets()}
				{this.renderDroppables()}
			</div>
		);
	}

	renderDropTargets(){
	 	let dropTarget3 = new DropTargetModel(100, 200, 450, 400, 250);
		dropTarget3.setBaseStyle(Object.assign({}, DropTargetStyles.BaseStyle, {
			'top': dropTarget3.y,
			'left': dropTarget3.x,
			'width': dropTarget3.width,
			'height': dropTarget3.height
		}));
		this.dropTargets.push(dropTarget3);
		let dropTarget2 = new DropTargetModel(101, 200, 10, 400, 250);
		dropTarget2.setBaseStyle(Object.assign({}, DropTargetStyles.BaseStyle, {
			'top': dropTarget2.y,
			'left': dropTarget2.x,
			'width': dropTarget2.width,
			'height': dropTarget2.height
		}));
		this.dropTargets.push(dropTarget2);
		var innerDropTarget = {
			ele: "li",
			options: {
				style: {
				"backgroundColor": "blue",
				"fontFamily": "sans-serif"
				}
			}
		};
		var dropTargetComponents = this.dropTargets.map((dropTarget) => {
			return (<DropTarget
							key={dropTarget.getId()}
							manager={dragDropManager}
							style={dropTarget.getBaseStyle()}
							{...dropTarget}
							/>);
		});

		return dropTargetComponents;
	}

	renderDroppables(){
		return (
			<div>
				<Draggable
				key={"0.0"}
				manager={dragDropManager}
				width={300}
				height={60}
				x={0}
				y={0}>
					<LineItem key={"0.0.1"} style={this.style} width={500} height={500}>Edible</LineItem>
				</Draggable>
				<Draggable
				key={"0.1"}
				manager={dragDropManager}
				width={100}
				height={100}
				x={0}
				y={100}>
					<LineItem key={"0.0.2"} style={this.style} width={500} height={500}>Cuddly</LineItem>
				</Draggable>
			</div>
		);
	}
}
