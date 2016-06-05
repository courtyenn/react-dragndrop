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
      var content = '';
      if(draggable.props.setContentOnDrop){
        dropTargetBeingHovered.setContent(draggable.children);
      }
      else{
        content = draggable.props.children.props.children;
        dropTargetBeingHovered.appendToContent(content);
      }
      dropTargetBeingHovered.droppedDraggable(draggable);
      draggable.hideDraggable();
    }
  }
}
