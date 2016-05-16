import React, {Component} from 'react';
import ReactDom from 'react-dom';

export default class DropTarget extends Component{
  constructor(){
    super();
    this.droppedStyle = {};
    this.domDropTargetElement;
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
    if(ref !== null){
      this.domDropTargetElement = ReactDom.findDOMNode(ref);
      this.dimensions = {
        x: this.domDropTargetElement.offsetLeft,
        y: this.domDropTargetElement.offsetTop,
        width: this.domDropTargetElement.offsetWidth,
        height: this.domDropTargetElement.offsetHeight
      };
    }
    //this.updateDimensions(this); //check if works with this
  }

  // componentWillUpdate(nextProps, nextState){
    // this.updateDimensions(nextState);
  // }

  // updateDimensions(nextState){
  //   this.baseStyle.left = nextState.dimensions.x;
  //   this.baseStyle.top = nextState.dimensions.y;
  //   this.baseStyle.width = nextState.dimensions.width;
  //   this.baseStyle.height = nextState.dimensions.height;
  // }

  render(){
    var style,
    wrapper,
    dropTargetElement = {};

    if(this.props.style){
      style = Object.assign({}, this.baseStyle, this.props.style);
    }
    else {
      style = Object.assign({}, this.baseStyle);
    }

    var type = typeof this.props.wrapper;
    var content = this.content.length > 0 ? this.content : "helpful and friendly text just for you <3";

    if(type === "string"){
      if(this.props.children){
        var allTheProps = Object.assign({}, this.props, this.props.children.props, {style: style, ref: this.setInitialDimensions});
        var innards = React.createElement(this.props.wrapper, allTheProps, content);
        dropTargetElement = innards;
      }
      else {
        var innards = React.createElement(this.props.wrapper, {style: style, ref: this.setInitialDimensions}, content);
        dropTargetElement = innards;
      }

    }
    else if(type === "object"){
      // var allTheChildren = Object.assign({}, this.props.wrapper.props.children);
      // var allTheProps = Object.assign({}, this.props.wrapper.props, {style: style, ref: this.setInitialDimensions.bind(this)});
      wrapper =  React.createElement(this.props.wrapper.type, this.props.wrapper.props, content);
      dropTargetElement = (
        <div style={style} ref={this.setInitialDimensions}>
          {wrapper}
        </div>
      );
      // wrapper =  React.createElement(this.props.wrapper.type, allTheProps, content);
      // dropTargetElement = wrapper;
    }
    else {
      dropTargetElement = (
        <div style={style} ref={this.setInitialDimensions}>
          {content}
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
