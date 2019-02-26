import React, { Component } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';

class FontText extends Component {
    Loadtext(){
        //if(this.props.fontLoaded){
            return (<Text style={this.props.style}>{this.props.children}</Text>) ;
        //}
    }
    render(){
        return (
            this.Loadtext()
        );
    }
}
export default FontText;
