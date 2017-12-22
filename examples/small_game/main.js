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
    this.choices = ["edible", "hello"];
    this.droppedContent = this.droppedContent.bind(this);
    this.hideDraggable = this.hideDraggable.bind(this);
    this.columns = [
      ["1. A List Of Stuff", " 2. No Erase"],
      ["Drop Here With Style"],
      ["Testing"]
    ];
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

    var styles = [
      Object.assign({}, DropTargetStyles.BaseStyle, {top: 0}),
      Object.assign({}, DropTargetStyles.BaseStyle, {top: 200}),
      Object.assign({}, DropTargetStyles.Styled, {top: 300})
    ];

    var title = "I am a semantic list with a h2";
    var that = this;
    var dropTargets = this.columns.map((items, index) => {
    var dropHandler = function(drop, drag){
      return that.droppedContent(drop, drag, index);
    };
      return (
        <DropTarget
          key={"droptarget-" + index}
          style={styles[index]}
          manager={dragDropManager}
          handleDroppedDraggable={dropHandler}>
          {items}
        </DropTarget>
      );
  });

    return (
      <div>
        {dropTargets}
      </div>
    );
  }

  droppedContent(drop, drag, index){
    var newColumns = this.columns;
    newColumns[index].push(drag.props.children);
    this.setState({
      columns: newColumns
    });
  }

  renderDroppables(){

    var drags = this.choices.map((choice, index) => {
      var that = this;
      return (
        <Draggable
          id={index + '.0'}
          key={"0.0." + choice}
          manager={dragDropManager}
          style={DraggableStyles.Normal}
          droppedStyle={DraggableStyles.Dropped}
          draggingStyle={DraggableStyles.Dragging}
          droppedClassName="draggable"
          handleDrop={this.hideDraggable.bind(this, index)}>
          <LineItem style={DraggableStyles.Normal} key={"0.0.1"+choice}>{choice}</LineItem>
        </Draggable>
      );
    })

    drags.push(
      <Draggable
      id={'retain-space'}
      key={"0.0.retain-space"}
      manager={dragDropManager}
      style={DraggableStyles.Normal}
      retainSpaceStyle={DraggableStyles.Ghost}
      retainSpace={true}>
      Lalalalalalalala retain space plez
    </Draggable>
    );

    drags.push(
      <Draggable
      id={'retain-space2'}
      key={"0.1.retain-space"}
      manager={dragDropManager}
      style={DraggableStyles.Normal}
      retainSpaceClassName={'testing'}
      retainSpace={true}>
      whatevs
    </Draggable>
    );
    return (
      <ul>
        {drags}
      </ul>
    );
  }

  hideDraggable(index) {
    var drags = this.choices;
    drags.splice(index, 1);
    this.setState({
      choices: drags
    });
  }
}
