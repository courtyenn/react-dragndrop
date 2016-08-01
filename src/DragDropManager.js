import React from 'react';
import { checkBoundaries } from './mouseBoundaryChecking';

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

  draggableIsOverDropTarget(draggable, ev){
    for(var dropTarget of this.dropTargets){
      draggable.isOverTarget = checkBoundaries(ev, dropTarget.dimensions);
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
      dropTargetBeingHovered.droppedDraggable(draggable);
      if(draggable.props.handleDrop){
        draggable.props.handleDrop();
      }
    }
  }
}
