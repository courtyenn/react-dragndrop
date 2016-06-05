# react-dragndrop (ES2015)
===================
This module provides a Draggable and DropTarget component. This library has a simplistic interface that allows users to listen to drop, drag, and release events. That way, the logic stays within the library, and your app can extend it.

## Draggable
This component allows multiple types of style for the user's customization. Currently, only styles are supported, but in the future, class names will be too.

#### Note:
This component currently wraps everything in a div when it is dropped inside a DropTarget.

Example:

      <Draggable>I want this dragged!</Draggable>

#### PropTypes:
id: React.PropTypes.string,
manager: React.PropTypes.instanceOf(DragDropManager).isRequired,
draggingStyle: React.PropTypes.object,
clickedStyle: React.PropTypes.object,
style: React.PropTypes.object,
clickedClassName: React.PropTypes.string,
draggingClassName: React.PropTypes.string,
handleMouseUp: React.PropTypes.func,
handleMouseDown: React.PropTypes.func,
setContentOnDrop: React.PropTypes.boolean

## DropTarget
This component allows multiple different types of children. It allows object, JSX, or a simple string to be nested within. I've used it in multiple ways in the 'small_game' example.

This component is how you listen to events.

Example:

      <DropTarget>This text will be appended to, by default. It can be customized to set content by passing in the appropriate prop.</DropTarget>

#### PropTypes:

manager: React.PropTypes.instanceOf(DragDropManager).isRequired,
style: React.PropTypes.object,
wrapper: React.PropTypes.any,
handleDraggableHoveringOverDropTarget: React.PropTypes.func,
handleDroppedDraggable: React.PropTypes.func
