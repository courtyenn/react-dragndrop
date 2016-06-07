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
      ["Kitty", "Test"],
      ["HELLO"],
      []
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
    var list = React.createElement(List, {title: "hello world", style: DropTargetStyles.Dropping, manager: dragDropManager});
    var styles = [
      Object.assign({}, DropTargetStyles.BaseStyle, {top: 0}),
      Object.assign({}, DropTargetStyles.BaseStyle, {top: 400})
    ];
    var style2 = Object.assign({}, DropTargetStyles.BaseStyle, {top: 800});
    var title = "Monnkey";
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
  var dropHandler = function(drop, drag){
    return that.droppedContent(drop, drag, 2);
  };
    dropTargets.push(
      <List key={"List-droptarget-3"}
      manager={dragDropManager}
      style={style2}
      handleDroppedDraggable={dropHandler}
      title={title}>
        {this.columns[2]}
      </List>);
    return (
      <div>
        {dropTargets}
      </div>
    );
  }

  droppedContent(drop, drag, index){
    console.log(drop, drag);
    var newColumns = this.columns;
    newColumns[index].push(drag);
    this.setState({
      columns: newColumns
    });
  }

  renderDroppables(){

    var drags = this.choices.map((choice, index) => {
      var hideHandler = function(drag){
        return this.hideDraggable(index);
      }
      return (
        <Draggable
          key={"0.0." + choice}
          manager={dragDropManager}
          style={DraggableStyles.Normal}
          droppedStyle={DraggableStyles.Dropped}
          handleHideDraggable={this.hideDraggable}
          draggingStyle={DraggableStyles.Dragging}>
          <LineItem style={DraggableStyles.Normal} key={"0.0.1"+choice}>{choice}</LineItem>
        </Draggable>
      );
    })
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
