'use strict';
import React, {Component} from 'react';


export default class LineItem extends Component{
    render(){
        return(
            <li style={this.props.style}>{this.props.children}</li>
        );
    }
}
