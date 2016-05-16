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
    var list = React.createElement(List, {title: "hello world"});
    var firstStyle = Object.assign({}, DropTargetStyles.BaseStyle, {top: 0});
    var secondStyle = Object.assign({}, DropTargetStyles.BaseStyle, {top: 500});
    this.dropTargets.push({
      style: firstStyle,
      wrapper: "ul"
    });
    this.dropTargets.push({
      style: secondStyle,
      wrapper: list
    });
    var dropTargetComponents = this.dropTargets.map((dropTarget, index) => {
      return (
        <DropTarget
          key={"droptarget-" + index}
          manager={dragDropManager}
          {...dropTarget}
          />
      );
    });

    return dropTargetComponents;
  }

  renderDroppables(){
    return (
      <ul>
        <Draggable
          key={"0.0"}
          manager={dragDropManager} style={DraggableStyles.Normal}>
          <LineItem key={"0.0.1"}>Edible</LineItem>
        </Draggable>
        <Draggable
          key={"0.1"}
          manager={dragDropManager} style={DraggableStyles.Normal}>
          <LineItem key={"0.0.2"}>Cuddly</LineItem>
        </Draggable>
      </ul>
    );
  }
}
