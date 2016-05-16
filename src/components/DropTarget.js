import React, {Component} from 'react';
import ReactDom from 'react-dom';

export default class DropTarget extends Component{
  constructor(){
    super();
    this.droppedStyle = {};
    this.baseStyle = {
      "zIndex": 1
    };
    this.content = [];
    this.dimensions = {
      x: 0,
      y: 0,
      width: 100,
      height: 100
    };
    this.setInitialDimensions = this.setInitialDimensions.bind(this);
  }

  componentDidMount(){
    if(this.props.manager){
      this.props.manager.registerDropTarget(this);
    }
  }

  setInitialDimensions(ref){
    this.domDropTargetElement = ReactDom.findDOMNode(ref);
    this.dimensions = {
      x: this.domDropTargetElement.offsetLeft,
      y: this.domDropTargetElement.offsetTop,
      width: this.domDropTargetElement.offsetWidth,
      height: this.domDropTargetElement.offsetHeight
    };

    //this.updateDimensions(this); //check if works with this

  }

  // componentWillUpdate(nextProps, nextState){
    // this.updateDimensions(nextState);
  // }

  updateDimensions(nextState){
    this.droppedStyle.left = nextState.dimensions.x;
    this.droppedStyle.top = nextState.dimensions.y;
    this.droppedStyle.width = nextState.dimensions.width;
    this.droppedStyle.height = nextState.dimensions.height;
  }

  render(){
    var style,
    wrapper,
    dropTargetElement = {};

    if(this.props.style){
      style = Object.assign({}, this.droppedStyle, this.baseStyle, this.props.style);
    }
    else {
      style = Object.assign({}, this.droppedStyle, this.baseStyle);
    }

    var type = typeof this.props.wrapper;
    if(type === "string"){
      var innards = React.createElement(this.props.wrapper, null, this.content);
      dropTargetElement = (
        <div style={style}>
          {innards}
        </div>
      );
    }
    var content = this.content.length > 0 ? this.content : "helpful and friendly text just for you <3";
    if(type === "object"){
      wrapper =  React.createElement(this.props.wrapper.type, this.props.wrapper.props, content);
      dropTargetElement = (
        <div style={style} ref={this.setInitialDimensions}>
          {wrapper}
        </div>
      );
    }

    return dropTargetElement;
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
}

DropTarget.propTypes = {
  style: React.PropTypes.object,
  wrapper: React.PropTypes.any
};
