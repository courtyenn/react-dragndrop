'use strict';
import React, {Component} from 'react';
import Draggable from '../../src/components/Draggable.es6';
import DropTarget from '../../src/components/DropTarget.es6';
import IdGenerator from '../../src/IdGenerator.es6';
import DragDropManager from '../../src/DragDropManager.es6';
import DropTargetStyles from '../../src/styles/DropTargetStyles';

// const dragDropManager = new DragDropManager(); was breaking stuff
const dragDropManager = new DragDropManager();

export class List extends Component{
    render(){
        return(
            <div>
                <h2>{this.props.title}</h2>
                <ul>
                    {this.props.children}
                </ul>
            </div>
        );
    }
}

export class LineItem extends Component{
    render(){
        return(
            <li>{this.props.children}</li>
        );
    }
}

export class MainSection extends Component{
    constructor(){
        super();
        this.componentId = IdGenerator.generateId();
        this.dropTargets = [];
        var x = IdGenerator.generateId();
        console.log(dragDropManager);
        this.style = {
            "fontFamily": "sans-serif",
            "cursor": "default",
            "backgroundColor": "pink",
            "zIndex": "5"
        };
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
        this.dropTargets.push({
            dimensions: {
                x: 500,
                y: 200,
                width: 450,
                height: 400
            },
            style: DropTargetStyles.BaseStyle,
            wrapper: "ul"
        });
        this.dropTargets.push({
            dimensions: {
                x: 500,
                y: 700,
                width: 450,
                height: 400
            },
            style: DropTargetStyles.BaseStyle,
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
            <div>
                <Draggable
                    key={"0.0"}
                    manager={dragDropManager}
                    width={300}
                    height={60}
                    x={0}
                    y={0}>
                    <LineItem key={"0.0.1"} style={this.style} width={500} height={500}>Edible</LineItem>
                </Draggable>
                <Draggable
                    key={"0.1"}
                    manager={dragDropManager}
                    width={100}
                    height={100}
                    x={0}
                    y={100}>
                    <LineItem key={"0.0.2"} style={this.style} width={500} height={500}>Cuddly</LineItem>
                </Draggable>
            </div>
        );
    }
}
