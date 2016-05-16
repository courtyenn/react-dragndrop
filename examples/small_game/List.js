import React, {Component} from 'react';

export default class List extends Component{
    render(){
        return(
            <div style={this.props.style}>
                <h2>{this.props.title}</h2>
                <ul>
                    {this.props.children}
                </ul>
            </div>
        );
    }
}
