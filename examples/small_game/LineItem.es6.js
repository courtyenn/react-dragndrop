'use strict';
import React, {Component} from 'react';
import Draggable from '../../src/components/Draggable.es6';
import DropTarget from '../../src/components/DropTarget.es6';
import IdGenerator from '../../src/IdGenerator.es6';
import DragDropManager from '../../src/DragDropManager.es6';
import DropTargetStyles from '../../src/styles/DropTargetStyles';
import List from './List.es6';

// const dragDropManager = new DragDropManager(); was breaking stuff
const dragDropManager = new DragDropManager();

export default class LineItem extends Component{
    render(){
        return(
            <li>{this.props.children}</li>
        );
    }
}
