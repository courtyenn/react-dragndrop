import React, {Component} from 'react';

export default class DropTarget extends Component{
	constructor(){
		super();
		this.mouseIsOverTarget = false;
		this.style = {};
		this.content = [];
		this.wrapper = "";
	}
	componentWillMount(){
		this.wrapper = this.props.wrapper || 'div';
		this.content = this.props.defaultContent;
		this.style = this.props.style;
	}

	render(){
		let style = this.style;
		if(this.props.style){
			style = Object.assign({}, this.style, this.props.style);
		}

		var dropTargetElement = React.createElement(this.wrapper, style, this.content);

		return (
		<div style={style}>
			{dropTargetElement}
		</div>);
	}

	setContent(content){
		this.content = content;
		this.setState({content: this.content});
	}

	appendToContent(content){
		this.content.push(content);
		this.setState({content: this.content});
	}

	draggableHoveringOverDropTarget(){
		if(this.props.handleDraggableHoveringOverDropTarget){
			this.props.handleDraggableHoveringOverDropTarget(this);
		}
	}

	setHoverStyle(style){
		this.hoveredStyle = style;
	}
}
