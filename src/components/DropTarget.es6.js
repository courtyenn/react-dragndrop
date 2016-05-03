import React, {Component} from 'react';

export default class DropTarget extends Component{
    constructor(){
        super();
        this.mouseIsOverTarget = false;
        this.style = {
            position: "relative",
            width: 400,
            height: 400
        };
        this.content = [];
        this.wrapper = "";
    }
    componentWillMount(){
        this.wrapper = this.props.wrapper || 'div';
        this.content = this.props.defaultContent || [];
        if(this.props.dimensions){
            this.style.left = this.props.dimensions.x,
            this.style.top = this.props.dimensions.y,
            this.style.width = this.props.dimensions.width,
            this.style.height = this.props.dimensions.height
        }
    }

    componentDidMount(){
        if(this.props.manager){
            this.props.manager.registerDropTarget(this);
        }
    }

    render(){
        var style,
        wrapper,
        dropTargetElement = {};

        if(this.props.style){
            style = Object.assign({}, this.style, this.props.style);
        }

        var type = typeof this.props.wrapper;
        if(type === "string"){
            var innards = React.createElement(this.wrapper, null, this.content);
            dropTargetElement = (
                <div style={style}>
                    {innards}
                </div>
            );
        }
        var content = this.content.length > 0 ? this.content : "helpful and friendly text just for you <3";
        if(type === "object"){
            wrapper =  React.createElement(this.props.wrapper.type, this.props.wrapper.props, content);
            dropTargetElement = (
                <div style={style}>
                    {wrapper}
                </div>
            );
        }

        return dropTargetElement;
    }

    setContent(content){
        this.content = content;
        this.setState({content: this.content});
    }

    appendToContent(content){
        this.content.push(content);
        this.setState({content: this.content});
    }

    draggableHoveringOverDropTarget(){
        if(this.props.handleDraggableHoveringOverDropTarget){
            this.props.handleDraggableHoveringOverDropTarget(this);
        }
    }

    setStyle(style){
        this.style = style;
    }
}

DropTarget.propTypes = {
    dimensions: React.PropTypes.shape({
        x: React.PropTypes.number,
        y: React.PropTypes.number,
        width: React.PropTypes.number,
        height: React.PropTypes.number,
    }).isRequired,
    style: React.PropTypes.object,
    wrapper: React.PropTypes.any
};
