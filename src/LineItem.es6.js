'use strict';
import React, {Component} from 'react';
import Draggable from './components/Draggable';
import DropTarget from './components/DropTarget';
import IdGenerator from './IdGenerator.es6.js';
import DropTargetModel from './models/DropTarget.es6.js';
import DragDropManager from './DragDropManager.es6.js';
import DropTargetStyles from './styles/DropTargetStyles';

const dragDropManager = DragDropManager;

export default class List extends Component{
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

export default class LineItem extends Component{
	render(){
		return(
			<li>{this.props.children}</li>
		);
	}
}

export default class MainSection extends Component{
	constructor(){
		super();
		this.componentId = IdGenerator.generateId();
		this.dropTargets = [];
		var x = IdGenerator.generateId();
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
		dragDropManager.registerDropTarget(dropTarget3);
		dragDropManager.registerDropTarget(dropTarget2);
		this.dropTargets = dragDropManager.getDropTargets();
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
			dropTarget.setRef(this.refs[dropTarget.getId() + "-target"]);
			var ref = dropTarget.getId() + "-target";
			return (<DropTarget
							key={dropTarget.getId()}
							manager={dragDropManager}
							style={dropTarget.getBaseStyle()}
							model={dropTarget}
							/>);
		});

		return dropTargetComponents;
	}

	renderDroppables(){
		return (
			<div>
				<Draggable
				key={"0.0"}
				dropTargets={this.dropTargets}
				manager={dragDropManager}
				width={300}
				height={60}
				x={0}
				y={0}>
					<LineItem key={"0.0.1"} style={this.style} width={500} height={500}>Edible</LineItem>
				</Draggable>
				<Draggable
				key={"0.1"}
				dropTargets={this.dropTargets}
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
