import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import { colors } from '../utils/Colors'
import { constants } from '../utils/Constants'


export const CustomButton = props => {
  return (
    <TouchableOpacity 
    style={[styles.buttonStyle,{backgroundColor:props.backgroundColor, borderColor: props.backgroundColor}]} 
    onPress={props.onPress}>
      <Text style = {[styles.text,{color:props.textColor}]}>{props.label}</Text>
    </TouchableOpacity>
  );
};

const styles = {
  buttonStyle: {
    borderRadius: 20,
    borderWidth: 1,
    margin:5,
    padding: 10,
    paddingHorizontal:15,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  text: {
    colors:'black',
    fontSize:16,
    fontWeight:'700'
  },
};
