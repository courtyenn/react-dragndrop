import React from 'react';
import { checkBoundaries } from './boxBoundaryChecking';

// refactor to be called singleton
export default class DragDropManager {
  constructor(){
    this.draggables = [];
    this.dropTargets = [];
    this.hoveredDropTarget = null;
  }

  registerDraggable(model){
    this.draggables.push(model);
  }

  registerDropTarget(model){
    this.dropTargets.push(model);
  }

  getDropTargets(){
    return this.dropTargets;
  }

  draggableIsOverDropTarget(draggable){
    for(var dropTarget of this.dropTargets){
      draggable.isOverTarget = checkBoundaries(draggable.dimensions, dropTarget.dimensions);
      if(draggable.isOverTarget){
        this.hoveredDropTarget = dropTarget;
        dropTarget.draggableHoveringOverDropTarget();
        break;
      }
    }
    return draggable.isOverTarget;
  }

  releaseDraggableOnDropTarget(draggable){
    if(draggable.isOverTarget){
      var dropTargetBeingHovered = this.hoveredDropTarget;
      var newStyle = {};
      if(draggable.props.droppedStyle){
        newStyle = Object.assign({}, draggable.props.droppedStyle, draggable.props.children.style);
      }
      var content = React.createElement('div', {style: newStyle}, draggable.props.children);
      if(draggable.props.setContentOnDrop){
        dropTargetBeingHovered.setContent(content);
      }
      else{
        dropTargetBeingHovered.appendToContent(content);
      }
      dropTargetBeingHovered.droppedDraggable(draggable);
      draggable.hideDraggable();
    }
  }
}
