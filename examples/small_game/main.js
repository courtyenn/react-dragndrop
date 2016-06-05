import React from 'react';
import List from './List';
import LineItem from './LineItem';
import { DragDropManager, DropTarget, Draggable } from '../../lib/react-dragndrop';
import DropTargetStyles from './styles/DropTargetStyles';
import DraggableStyles from './styles/Draggable';

const dragDropManager = new DragDropManager();

export default class MainSection extends React.Component{
  constructor(){
    super();
    this.dropTargets = [];
  }
  render(){
    return(
      <div>
        {this.renderDropTargets()}
        {this.renderDroppables()}
      </div>
    );
  }

  renderDropTargets(){
    var list = React.createElement(List, {title: "hello world", style: DropTargetStyles.Dropping, manager: dragDropManager});
    var firstStyle = Object.assign({}, DropTargetStyles.BaseStyle, {top: 0});
    var secondStyle = Object.assign({}, DropTargetStyles.BaseStyle, {top: 400});
    var thirdStyle = Object.assign({}, DropTargetStyles.BaseStyle, {top: 800});
    var title = "Monnkey";
    return (
      <div>
        <DropTarget
          key={"droptarget-1"}
          manager={dragDropManager}
          style={firstStyle}
          wrapper="ul"
          />
        <DropTarget
          key={"droptarget-2"}
          style={secondStyle}
          manager={dragDropManager}
          wrapper={list}
          />
        <List key={"List-droptarget-3"}
          manager={dragDropManager}
          style={thirdStyle} />
      </div>
    );
  }

  renderDroppables(){
    return (
      <ul>
        <Draggable
          key={"0.0"}
          manager={dragDropManager}
          style={DraggableStyles.Normal}
          droppedStyle={DraggableStyles.Dropped}
          draggingStyle={DraggableStyles.Dragging}>
          <LineItem style={DraggableStyles.Normal} key={"0.0.1"}>Edible</LineItem>
        </Draggable>
        <Draggable
          key={"0.1"}
          manager={dragDropManager}
          style={DraggableStyles.Normal}
          droppedStyle={DraggableStyles.Dropped}
          draggingStyle={DraggableStyles.Dragging}>
          <LineItem style={DraggableStyles.Normal} key={"0.0.2"}>Cuddly</LineItem>
        </Draggable>
      </ul>
    );
  }
}
