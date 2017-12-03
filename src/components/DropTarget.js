import React, { Component } from 'react';
import ReactDom from 'react-dom';
import DragDropManager from '../DragDropManager';

export default class DropTarget extends Component {
  constructor() {
    super();
    this.droppedStyle = {};
    this.domDropTargetElement;
    this.baseClass = "";
    this.dimensions = {
      x: 0,
      y: 0,
      width: 100,
      height: 100
    };
    this.setInitialDimensions = this.setInitialDimensions.bind(this);
    this.droppedDraggable = this.droppedDraggable.bind(this);
    this.draggableHoveringOverDropTarget = this.draggableHoveringOverDropTarget.bind(this);
  }

  componentDidMount() {
    this.props.manager.registerDropTarget(this);
  }

  setInitialDimensions(ref) {
    if (ref !== null) {
      this.domDropTargetElement = ReactDom.findDOMNode(ref);
    }
  }

  render() {
    var style = null,
      classes = "",
      wrapper,
      dropTargetElement = {};

    if (this.props.style) {
      style = this.props.style;
    }

    if (this.props.className) {
      classes = this.props.className;
    }

    var type = typeof this.props.wrapper;

    return (
      <div style={style} ref={this.setInitialDimensions} className={classes}>
        {this.props.children}
      </div>
    );
  }

  draggableHoveringOverDropTarget() {
    if (this.props.handleDraggableHoveringOverDropTarget) {
      this.props.handleDraggableHoveringOverDropTarget(this);
    }
  }

  droppedDraggable(draggable) {
    if (this.props.handleDroppedDraggable) {
      this.props.handleDroppedDraggable(this, draggable);
    }
  }
}

DropTarget.propTypes = {
  manager: React.PropTypes.instanceOf(DragDropManager).isRequired,
  style: React.PropTypes.object,
  wrapper: React.PropTypes.any,
  handleDraggableHoveringOverDropTarget: React.PropTypes.func,
  handleDroppedDraggable: React.PropTypes.func
};
