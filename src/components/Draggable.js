import React, {Component} from 'react';
import ReactDom from 'react-dom';

export default class Draggable extends Component{
  constructor(){
    super();
    this.baseStyle = {
      "zIndex": 9999
    };
    this.hoveringStyle = {};
    this.domDraggableElement;
    var html = document.getElementsByTagName('html')[0];
    html.addEventListener('mousemove', this.setMousePosition.bind(this), false);

    this.currentPosition = {x: 0, y: 0};
    this.clicked = false;
    this.dragging = false;

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    // this.updateDimensions = this.updateDimensions.bind(this);
    this.setInitialDimensions = this.setInitialDimensions.bind(this);

    this.dimensions = {
      x: 0,
      y: 0,
      width: 100,
      height: 100
    };

    this.isOverTarget = false;
    this.hoveredDropTarget = null;

    this.setState = this.setState;
  }

  setInitialDimensions(ref){
    if(ref !== null){
      this.domDraggableElement = ReactDom.findDOMNode(ref);
      this.dimensions = {
        x: this.domDraggableElement.offsetLeft,
        y: this.domDraggableElement.offsetTop,
        width: this.domDraggableElement.offsetWidth,
        height: this.domDraggableElement.offsetHeight
      };
    }
  }

  componentDidMount(){
    if(this.props.manager){
      this.props.manager.registerDraggable(this);
    }
  }

  // componentWillUpdate(nextProps, nextState){
    // this.updateDimensions(nextState);
  // }

  // updateDimensions(nextState){
  //   if(nextState && nextState.dimensions){
  //     this.hoveringStyle.left = nextState.dimensions.x;
  //     this.hoveringStyle.top = nextState.dimensions.y;
  //     this.hoveringStyle.width = nextState.dimensions.width;
  //     this.hoveringStyle.height = nextState.dimensions.height;
  //     this.hoveringStyle.position = 'absolute';
  //
  //     this.currentPosition = {
  //       x: nextState.dimensions.x,
  //       y: nextState.dimensions.y
  //     };
  //
  //     this.setState({hoveringStyle: this.hoveringStyle});
  //   }
  // }

  render(){

    // var draggableClone = React.Children.map(this.props.children, (child) => {
      var childStyle = '';
      var styleOutput = '';
      var draggingStyle = '';

      // if(this.props.child && this.props.child.props.style){
      //   childStyle = child.props.style;
      // }

      if(this.dragging || this.clicked){
        draggingStyle = this.hoveringStyle;
      }
      if(this.props.style){
        styleOutput = Object.assign({}, draggingStyle, this.baseStyle, this.props.style)
      }
      else {
        styleOutput = Object.assign({}, draggingStyle, this.baseStyle)
      }

      // return React.createElement('div', {
      //   style: styleOutput,
      //   key: 'draggable-' + Math.random(),
      //   onMouseDown: this.handleMouseDown,
      //   onMouseUp: this.handleMouseUp,
      //   ref: this.setInitialDimensions
      // }, this.props.children);
    // });

    return (
      <div ref={this.setInitialDimensions}
        style= {styleOutput}
          key={'draggable-' + Math.random()}
          onMouseDown={this.handleMouseDown}
          onMouseUp={this.handleMouseUp}
        >
        { this.props.children}
      </div>
    );
  }

  setMousePosition(ev){
    this.localNextPosition.x = (ev.clientX);
    this.localNextPosition.y = (ev.clientY);

    if(this.clicked){
      this.dragging = true;
      this.localNextPosition.x -= (this.dimensions.width / 2);
      this.localNextPosition.y -= (this.dimensions.height / 2);

      if(this.props.manager){
        var draggableisOverDropTarget = this.props.manager.draggableIsOverDropTarget(this);
        if(draggableisOverDropTarget){
          this.isOverTarget = true;
          this.hoveredDropTarget = this.props.manager.hoveredDropTarget;
        }
        else {
          this.isOverTarget = false;
        }
      }
      var dimensions = Object.assign({}, this.dimensions, {
        x: this.localNextPosition.x,
        y: this.localNextPosition.y
      });
      this.dimensions = dimensions;
      this.hoveringStyle.left = dimensions.x;
      this.hoveringStyle.top = dimensions.y;
      this.hoveringStyle.position = 'absolute';
      var newHoveringStyle = Object.assign({}, this.hoveringStyle);

      this.setState({
        hoveringStyle: newHoveringStyle
      });
    }
  }

  handleMouseDown(ev){
    this.clicked = true;
    this.dragging = true;

    if(this.props.handleMouseDown){
      this.props.handleMouseDown(ev);
    }
  }

  handleMouseUp(ev){
    this.clicked = false;
    this.dragging = false;
    if(this.props.handleMouseUp){
      this.props.handleMouseUp(ev);
    }
    if(this.props.manager){
      this.props.manager.releaseDraggableOnDropTarget(this);
    }
  }

  hideDraggable(){
    this.baseStyle = Object.assign({}, this.baseStyle, {visibility: 'hidden'});
    this.setState({baseStyle: this.baseStyle});
  }
}

Draggable.prototype.localNextPosition = {x: 0, y: 0};
