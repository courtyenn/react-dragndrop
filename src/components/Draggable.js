import React, {Component} from 'react';
import ReactDom from 'react-dom';

export default class Draggable extends Component{
  constructor(){
    super();
    this.baseStyle = {
      "zIndex": 9999
    };
    this.hoveringStyle = {};
    this.domDraggableElement;
    var html = document.getElementsByTagName('html')[0];
    html.addEventListener('mousemove', this.setMousePosition.bind(this), false);

    this.currentPosition = {x: 0, y: 0};
    this.clicked = false;
    this.dragging = false;

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.setInitialDimensions = this.setInitialDimensions.bind(this);
    this.setStyle = this.setStyle.bind(this);
    this.setClassName = this.setClassName.bind(this);

    this.dimensions = {
      x: 0,
      y: 0,
      width: 100,
      height: 100
    };

    this.isOverTarget = false;
    this.hoveredDropTarget = null;

    this.setState = this.setState;
  }

  setInitialDimensions(ref){
    if(ref !== null){
      this.domDraggableElement = ReactDom.findDOMNode(ref);
      this.dimensions = {
        x: this.domDraggableElement.offsetLeft,
        y: this.domDraggableElement.offsetTop,
        width: this.domDraggableElement.offsetWidth,
        height: this.domDraggableElement.offsetHeight
      };
    }
  }

  componentDidMount(){
    if(this.props.manager){
      this.props.manager.registerDraggable(this);
    }
  }

  render(){

    var styleOutput = this.setStyle();
    var classOutput = this.setClassName();
    return (
      <div ref={this.setInitialDimensions}
        style={styleOutput}
        className={classOutput}
        key={'draggable-' + Math.random()}
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
        >
        { this.props.children}
      </div>
    );
  }

  setStyle(){
    var childStyle = '';
    var styleOutput = '';
    var clickedStyle = '';
    var draggingStyle = '';

    if(this.dragging && this.props.draggingStyle){
      draggingStyle = this.props.draggingStyle;
    }
    if(this.clicked && this.props.clickedStyle){
      clickedStyle = this.props.clickedStyle;
    }
    if(this.props.style){
      styleOutput = Object.assign({}, draggingStyle, clickedStyle, this.baseStyle, this.props.style)
    }
    else {
      styleOutput = Object.assign({}, draggingStyle, clickedStyle, this.baseStyle)
    }
    return styleOutput;
  }

  setClassName(){
    var className = '';
    if(this.clicked && this.props.clickedClassName){
      className = this.props.clickedClassName;
    }
    else if(this.dragging && this.props.draggingClassName){
      className = this.props.draggingClassName;
    }
    return className;
  }

  setMousePosition(ev){
    this.localNextPosition.x = (ev.clientX);
    this.localNextPosition.y = (ev.clientY);

    if(this.clicked){
      this.dragging = true;
      this.localNextPosition.x -= (this.dimensions.width / 2);
      this.localNextPosition.y -= (this.dimensions.height / 2);

      if(this.props.manager){
        var draggableisOverDropTarget = this.props.manager.draggableIsOverDropTarget(this);
        if(draggableisOverDropTarget){
          this.isOverTarget = true;
          this.hoveredDropTarget = this.props.manager.hoveredDropTarget;
        }
        else {
          this.isOverTarget = false;
        }
      }
      var dimensions = Object.assign({}, this.dimensions, {
        x: this.localNextPosition.x,
        y: this.localNextPosition.y
      });
      this.dimensions = dimensions;
      this.baseStyle.left = dimensions.x;
      this.baseStyle.top = dimensions.y;
      this.baseStyle.position = 'absolute';
      var newHoveringStyle = Object.assign({}, this.hoveringStyle);

      this.setState({
        baseStyle: newHoveringStyle
      });
    }
  }

  handleMouseDown(ev){
    this.clicked = true;
    this.setState({
      clicked: true
    });
    if(this.props.handleMouseDown){
      this.props.handleMouseDown(ev);
    }
  }

  handleMouseUp(ev){
    this.clicked = false;
    this.dragging = false;
    this.setState({
      clicked: false,
      dragging: false
    });
    if(this.props.handleMouseUp){
      this.props.handleMouseUp(ev);
    }
    if(this.props.manager){
      this.props.manager.releaseDraggableOnDropTarget(this);
    }
  }

  hideDraggable(){
    this.baseStyle = Object.assign({}, this.baseStyle, {visibility: 'hidden'});
    this.setState({baseStyle: this.baseStyle});
  }
}

Draggable.prototype.localNextPosition = {x: 0, y: 0};
