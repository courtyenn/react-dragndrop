import React, {Component} from 'react';
import ReactDom from 'react-dom';
import DragDropManager from '../DragDropManager';

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
      this.props.manager.registerDropTarget(this);
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
  }

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
    var content = this.content.length > 0 ? this.content : '';

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
      wrapper =  React.createElement(this.props.wrapper.type, this.props.wrapper.props, content);
      dropTargetElement = (
        <div style={style} ref={this.setInitialDimensions}>
          {wrapper}
        </div>
      );
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
  manager: React.PropTypes.instanceOf(DragDropManager).isRequired,
  style: React.PropTypes.object,
  wrapper: React.PropTypes.any,
  handleDraggableHoveringOverDropTarget: React.PropTypes.func
};
