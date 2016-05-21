import React, {Component} from 'react';
import { DropTarget } from '../../lib/react-dragndrop';

export default class List extends Component{
    render(){
        return(
            <DropTarget
            key={"testing"}
            manager={this.props.manager}
            style={this.props.style}>
                <h2>{this.props.title}</h2>
                <ul>
                    {this.props.children}
                </ul>
            </DropTarget>
        );
    }
}
