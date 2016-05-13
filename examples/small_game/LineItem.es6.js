'use strict';
import React, {Component} from 'react';


export default class LineItem extends Component{
    render(){
        return(
            <li>{this.props.children}</li>
        );
    }
}
