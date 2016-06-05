import React, {Component} from 'react';
import { DropTarget } from '../../lib/react-dragndrop';
import DraggableStyles from './styles/Draggable';

export default class List extends Component{
    render(){
        return(
            <DropTarget
            key={"testing"}
            manager={this.props.manager}
            droppedStyle={DraggableStyles.Dropped}
            style={this.props.style}>
                <h2>{this.props.title}</h2>
                <ul>
                    {this.props.children}
                </ul>
            </DropTarget>
        );
    }
}
