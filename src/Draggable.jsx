var React = require('react');
var DraggableStyles = require('../styles/Draggable');
var LineItem = require('../LineItem');

var Draggable = React.createClass({
	propTypes: {
		width: React.PropTypes.number.isRequired,
		height: React.PropTypes.number.isRequired,
		currentPosition: React.PropTypes.object.isRequired
	},
	getInitialState: function(){
		this.style = {
			"position": "absolute",
			"left": 0,
			"top": 0
		};

		var html = document.getElementsByTagName('html')[0];
		html.addEventListener('mousemove', this.setMousePosition.bind(this), false);

		this.currentPosition = {x: 0, y: 0};
		this.clicked = false;
		this.dragging = false;

		this.handleMouseDown = this.handleMouseDown.bind(this);
		this.handleMouseUp = this.handleMouseUp.bind(this);
		this.width = 0;
		this.height = 0;
		this.dropTargets = [];
		this.isOverTarget = false;
		this.hoveredDropTarget = null;

		this.setState = this.setState;
	},
	componentWillMount: function(){
		this.currentPosition = {
			x: this.props.x,
			y: this.props.y
		};
		this.width = this.props.width;
		this.height = this.props.height;
		this.style = Object.assign(this.style, {width: this.width, height: this.height});
	},
	componentDidMount: function(){
		this.dropTargets = this.props.dropTargets;

		if(this.props.manager){
			this.props.manager.registerDraggable(this);
		}
	},
	render:function(){
		var style = {
			"left": this.currentPosition.x,
			"top": this.currentPosition.y
		};
		var draggableClone = React.Children.map(this.props.children, function(child){
			var childStyle = child.props.style || '';
			return React.createElement('div',
			{
				style: Object.assign({}, this.style, style, childStyle),
				key: this.props.id,
				onMouseDown: this.handleMouseDown,
				onMouseUp: this.handleMouseUp
			}, this.props.children);
		});

		return (
			<div>
				{draggableClone}
			</div>
		);
	},
	setMousePosition: function(ev){
		this.localNextPosition.x = (ev.clientX);
		this.localNextPosition.y = (ev.clientY);

		if(this.clicked){
			this.dragging = true;
			this.localNextPosition.x -= (this.width / 2);
			this.localNextPosition.y -= (this.height / 2);
			this.currentPosition = this.localNextPosition;


			if(this.props.manager){
				var draggableisOverDropTarget = this.props.manager.draggableIsOverDropTarget(this);
				if(draggableisOverDropTarget){
					this.isOverTarget = true;
					this.hoveredDropTarget = this.props.manager.getDropTargetBeingHovered();
				}
				else {
					this.isOverTarget = false;
				}
			}

			this.setState({
				currentPosition: this.localNextPosition
			});
		}
	},
	handleMouseDown: function(ev){
		this.clicked = true;
		this.dragging = true;

		if(this.props.handleMouseDown){
			this.props.handleMouseDown(ev);
		}
	},
	handleMouseUp: function(ev){
		this.clicked = false;
		if(this.props.handleMouseUp){
			this.props.handleMouseUp(ev);
		}
		if(this.props.manager){
			this.props.manager.releaseDraggableOnDropTarget(this, this.props.droppedDraggable);
		}
	},
	hideDraggable: function(){
		this.style = Object.assign(this.style, {visibility: 'hidden'});
		this.setState({style: this.style});
	}
});

Draggable.prototype.localNextPosition = {x: 0, y: 0};
