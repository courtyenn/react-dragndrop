import boxBoundaryChecking from './boxBoundaryChecking.es6';

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
      var draggableDimensions = {
        width: draggable.width,
        height: draggable.height,
        x: draggable.currentPosition.x,
        y: draggable.currentPosition.y
      };
      var dropTargetDimensions = {
        width: dropTarget.style.width,
        height: dropTarget.style.height,
        x: dropTarget.style.left,
        y: dropTarget.style.top
      };
      draggable.isOverTarget = boxBoundaryChecking(draggableDimensions, dropTargetDimensions);
      if(draggable.isOverTarget){
        this.hoveredDropTarget = dropTarget;
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
        content = draggable.props.setContentOnDrop();
      }
      else{
        content = draggable.props.children.props.children;
      }
      dropTargetBeingHovered.appendToContent(content);
      draggable.hideDraggable();
    }
  }
}
