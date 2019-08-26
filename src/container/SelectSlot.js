import React, { Component } from "react";
import { View, ImageBackground, Button, TouchableOpacity } from "react-native";
import { constants } from "../utils/Constants";
import DateTimePicker from "react-native-modal-datetime-picker";

export default class SelectSlot extends Component {
  static navigationOptions = {
    title: constants.TIMING
  };

  constructor(props) {
    super(props);
    this.state = {
      isDateTimePickerVisible: false
    };
  }

  showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
  };

  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
  };

  handleDatePicked = date => {
    console.log("A date has been picked: ", date);
    this.hideDateTimePicker();
  };

  render() {
    return (
      <ImageBackground
        source={{
          uri:
            "https://images.neosofttech.com/sites/all/themes/neosoft2017/images/banner.jpg"
        }}
        style={styles.imageBackground}
      >
        <Button title="Show DatePicker" onPress={this.showDateTimePicker} />
        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this.handleDatePicked}
          onCancel={this.hideDateTimePicker}
        />
      </ImageBackground>
    );
  }
}
const styles = {
  imageBackground: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center"
  }
};
