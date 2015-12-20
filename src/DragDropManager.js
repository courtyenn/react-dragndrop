import Immutable from 'immutable';
import boxBoundaryChecking from './boxBoundaryChecking.js';

export default class DragAndDropManager{
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
			draggable.isOverTarget = boxBoundaryChecking(draggableDimensions, dropTarget);
			if(draggable.isOverTarget){
				this.hoveredDropTarget = dropTarget;
				break;
			}
		}
		return draggable.isOverTarget;
	}

	getDropTargetBeingHovered(){
		return this.hoveredDropTarget;
	}

	releaseDraggableOnDropTarget(draggable, content){
		if(draggable.isOverTarget){
			var y = this.getDropTargetBeingHovered().getRef();
			y.setContent(draggable.props.children.props.children);
			draggable.hideDraggable();
		}
	}
}
