import React, {Component} from 'react';
import Draggable from './components/Draggable';
import DropTarget from './components/DropTarget';
import AppStore from './stores/AppStore';
import AltContainer from 'alt-container';
import IdGenerator from './IdGenerator';
import DropTargetModel from './models/DropTarget';
import DragDropManager from './DragDropManager';
import DropTargetStyles from './styles/DropTargetStyles';

const dragDropManager = new DragDropManager();

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
			<span>{this.props.children}</span>
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
			return (<DropTarget
							key={dropTarget.getId()}
							componentId={dropTarget.getId()}
							manager={dragDropManager}
							style={dropTarget.getBaseStyle()}
							model={dropTarget}>
						</DropTarget>);
		});

		return dropTargetComponents;
	}

	renderDroppables(){
		return (
			<div>
				<Draggable
				key={"0.0"}
				componentId={IdGenerator.generateId()}
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
				componentId={IdGenerator.generateId()}
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
