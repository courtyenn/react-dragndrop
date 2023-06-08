# \*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\* DEPRECATED \*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*

This project is no longer maintained. Please refer to the many libraries out there for React.
Thank you to all who have starred and used it. 💜 -- courtyen

See other dragging libraries here:
https://www.npmjs.com/search?q=react%20drag%20and%20drop

# react-dragndrop (ES2015)

Simplistic library with minimal boilerplate code to get started. This library comes with 2 React components: `<Draggable>` and `<DropTarget>`. In order for these two components to talk to each other, an instance of `DragDropManager` must be created with the following code:

    import {DragDropManager, Draggable, DropTarget} from 'react-dragndrop'
    let manager = new DragDropManager()

    render(){
        return (
          <div>
            <Draggable manager={manager}>Drag me!</Draggable>
            <DropTarget manager={manager}>Here!</DropTarget>
          </div>
          )
    }

## Draggable

Whatever it is you want dragged, nest it inside of the Draggable component. This wrapper allows for customization for every stage of the Draggable life cycle. Base style, clicked style, dragging style. Once the Draggable is actually dropped in the DropTarget, it is up to the user to style the component at that point.

Example:

      <Draggable manager={manager}>I want this dragged!</Draggable>

#### PropTypes:

manager: React.PropTypes.instanceOf(DragDropManager).isRequired,

id: React.PropTypes.string,

draggingStyle: React.PropTypes.object,

clickedStyle: React.PropTypes.object,

style: React.PropTypes.object,

baseClassName: React.PropTypes.string,

clickedClassName: React.PropTypes.string,

draggingClassName: React.PropTypes.string,

droppedClassName: React.PropTypes.string,

handleMouseUp: React.PropTypes.func,

handleMouseDown: React.PropTypes.func,

handleDrop: React.PropTypes.func

## DropTarget

This component allows multiple different types of children. It allows object, JSX, or a simple string to be nested within.

This component is how you listen to events.

Example:

      <DropTarget manager={manager}>This text will be appended to with the Draggable text</DropTarget>

#### PropTypes:

manager: React.PropTypes.instanceOf(DragDropManager).isRequired,

style: React.PropTypes.object,

wrapper: React.PropTypes.any,

handleDraggableHoveringOverDropTarget: React.PropTypes.func,

handleDroppedDraggable: React.PropTypes.func
