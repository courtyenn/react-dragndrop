var React = require('react');

var DropTarget = React.createClass({
	getInitialState: function(){
		this.mouseIsOverTarget = false;
		this.style = {};
		this.content = [];
		this.wrapper = "";
	},
	componentWillMount: function(){
		this.wrapper = this.props.wrapper || 'div';
		this.content = this.props.defaultContent;
		this.style = this.props.style;
		if(this.props.model){
			this.props.model.setRef(this);
		}
	},
	render: function(){
		var style = this.style;
		if(this.props.style){
			style = Object.assign({}, this.style, this.props.style);
		}

		var dropTargetElement = React.createElement(this.wrapper, style, this.content);

		return (
		<div style={style}>
			{dropTargetElement}
		</div>);
	},
	setContent: function(content){
		this.content = content;
		this.setState({content: this.content});
	},
	appendToContent: function(content){
		this.content.push(content);
		this.setState({content: this.content});
	},
	draggableHoveringOverDropTarget: function(){
		if(this.props.handleDraggableHoveringOverDropTarget){
			this.props.handleDraggableHoveringOverDropTarget(this);
		}
	},
	setHoverStyle: function(style){
		this.hoveredStyle = style;
	}
});
