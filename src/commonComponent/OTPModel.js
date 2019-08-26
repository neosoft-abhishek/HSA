
import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    Animated,
    TouchableHighlight,
    Dimensions
} from 'react-native';

import IconFea from 'react-native-vector-icons/Feather';



class OTPModel extends Component {

    constructor(props) {
        super(props);

        this.state = {
            visible: false,
            opacity: new Animated.Value(0),
            noAnimations: this.props.req || 4,
            arrNumbers: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
        }

        this.retValue = '';
        this.input = this.input.bind(this);
        this.toggle = this.toggle.bind(this);
        this.callBack = this.callBack.bind(this);
        this.del = this.del.bind(this);
    }

    componentWillMount() {
        console.log("1", this.state.noAnimations);
        let obj = {};
        for (let i = 0; i < this.state.noAnimations; i++) {
            obj['inputAnim' + i.toString()] = new Animated.Value(0);
        }
        Object.assign(this.state, obj);
        this.setState(this.state);
    }

    toggle() {
        if (!this.state.visible) {
            setTimeout(() => {
                Animated.parallel([
                    Animated.timing(this.state.opacity, {
                        toValue: 0.8,
                        duration: 300,
                    })
                ]).start();
            }, 400)
        } else {
            Animated.parallel([
                Animated.timing(this.state.opacity, {
                    toValue: 0,
                    duration: 0,
                }),
            ]).start();
        }
        this.reset();
        this.setState({
            visible: !this.state.visible
        });
    }

shuffle = (arra1) => {
    var ctr = arra1.length, temp, index;

    // While there are elements in the array
    while (ctr > 0) {
        // Pick a random index
        index = Math.floor(Math.random() * ctr);
        // Decrease ctr by 1
        ctr--;
        // And swap the last element with it
        temp = arra1[ctr];
        arra1[ctr] = arra1[index];
        arra1[index] = temp;
    }
    return arra1;
}

input(val) {

    let dataChanged = this.state.arrNumbers;

    this.setState({
        arrNumbers: dataChanged
    })

    if (this.retValue.length < this.state.noAnimations) {
        this.retValue += val;

        Animated.parallel([
            Animated.timing(this.state['inputAnim' + (this.retValue.length - 1).toString()], {
                toValue: 1,
                duration: 200,
            })
        ]).start();
    }

    if (this.retValue.length == this.state.noAnimations) {
        this.callBack();
    }
}

del() {
    if (this.retValue.length > 0) {
        this.retValue = this.retValue.substring(0, this.retValue.length - 1);

        Animated.parallel([
            Animated.timing(this.state['inputAnim' + (this.retValue.length).toString()], {
                toValue: 0,
                duration: 200,
            })
        ]).start();
    }
}

reset() {
    let resetAnim = [];
    this.retValue = '';
    for (let i = 0; i < this.state.noAnimations; i++) {
        resetAnim.push(Animated.timing(this.state['inputAnim' + i.toString()], {
            toValue: 0,
            duration: 0,
        }))
    }

    Animated.parallel(resetAnim).start();
}

callBack() {
    if (this.retValue.length != this.state.noAnimations) {
        this.reset();
        return;
    }

    this.props.callBack(this.retValue);
    this.reset();
}

renderHeader() {

    return (
        <View>
            <View style={styles.header}>
                <IconFea style={styles.headerIcon} name='lock' />
                <Text style={styles.headerText}>VerificationCodePrompt</Text>
            </View>
            <Text style={styles.buttonText}>SentCodePrompt{this.props.buttonText}</Text>
            <TouchableOpacity style={styles.resendBtnWrap} onPress={this.props.resend}>
                <Text style={styles.resendBtn}>ResendOTP</Text>
            </TouchableOpacity>
        </View>
    );
}

renderInput() {
    let inputs = [];

    for (let i = 0; i < (this.props.req || 4); i++) {
        inputs.push(
            <View key={i} style={styles.inputItem}>
                <Animated.View style={[styles.dot, { opacity: this.state['inputAnim' + i.toString()] }]} />
            </View>
        )
    }
    return (
        <View style={styles.inputWrapper}>
            {inputs}
        </View>
    );
}



renderKeyboard() {

    return (
        <View style={styles.keyboardWrapper}>
            <View style={styles.keyboardRow}>
                <TouchableHighlight style={styles.key} underlayColor='transparent' onPress={() => { this.input(this.state.arrNumbers[1]) }}><Text style={styles.keyText}>{this.state.arrNumbers[1]}</Text></TouchableHighlight>
                <TouchableHighlight style={styles.key} underlayColor='transparent' onPress={() => { this.input(this.state.arrNumbers[2]) }}><Text style={styles.keyText}>{this.state.arrNumbers[2]}</Text></TouchableHighlight>
                <TouchableHighlight style={styles.key} underlayColor='transparent' onPress={() => { this.input(this.state.arrNumbers[3]) }}><Text style={styles.keyText}>{this.state.arrNumbers[3]}</Text></TouchableHighlight>
            </View>
            <View style={styles.keyboardRow}>
                <TouchableHighlight style={styles.key} underlayColor='transparent' onPress={() => { this.input(this.state.arrNumbers[4]) }}><Text style={styles.keyText}>{this.state.arrNumbers[4]}</Text></TouchableHighlight>
                <TouchableHighlight style={styles.key} underlayColor='transparent' onPress={() => { this.input(this.state.arrNumbers[5]) }}><Text style={styles.keyText}>{this.state.arrNumbers[5]}</Text></TouchableHighlight>
                <TouchableHighlight style={styles.key} underlayColor='transparent' onPress={() => { this.input(this.state.arrNumbers[6]) }}><Text style={styles.keyText}>{this.state.arrNumbers[6]}</Text></TouchableHighlight>
            </View>
            <View style={styles.keyboardRow}>
                <TouchableHighlight style={styles.key} underlayColor='transparent' onPress={() => { this.input(this.state.arrNumbers[7]) }}><Text style={styles.keyText}>{this.state.arrNumbers[7]}</Text></TouchableHighlight>
                <TouchableHighlight style={styles.key} underlayColor='transparent' onPress={() => { this.input(this.state.arrNumbers[8]) }}><Text style={styles.keyText}>{this.state.arrNumbers[8]}</Text></TouchableHighlight>
                <TouchableHighlight style={styles.key} underlayColor='transparent' onPress={() => { this.input(this.state.arrNumbers[9]) }}><Text style={styles.keyText}>{this.state.arrNumbers[9]}</Text></TouchableHighlight>
            </View>
            <View style={styles.keyboardRow}>
                <TouchableHighlight style={styles.key} underlayColor='transparent'><Text style={styles.keyText}></Text></TouchableHighlight>
                <TouchableHighlight style={styles.key} underlayColor='transparent' onPress={() => { this.input(this.state.arrNumbers[0]) }}><Text style={styles.keyText}>{this.state.arrNumbers[0]}</Text></TouchableHighlight>
                <TouchableHighlight style={styles.key} underlayColor='transparent' onPress={this.del}><IconFea style={styles.keyText} name='delete' /></TouchableHighlight>
            </View>
        </View>
    );
}

render() {
    return (
        <View>
            <Modal style={styles.modal} visible={this.state.visible} animationType='slide' transparent={true} onRequestClose={() => { }}>
                <Animated.View style={[styles.wrapper, { opacity: this.state.opacity }]}>
                    <TouchableOpacity style={styles.closeBtn} onPress={this.toggle}>
                        <IconFea style={styles.closeIcon} size={30} name='x-circle' />
                    </TouchableOpacity>
                </Animated.View>
                <View style={styles.container}>
                    <View style={{ backgroundColor: "green" }}>
                        {this.renderHeader()}
                        {this.renderInput()}
                    </View>
                    {this.renderKeyboard()}
                </View>
            </Modal>
        </View>
    );
}
}

const styles = {
    wrapper: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
        backgroundColor: 'rgb(255,255,255)'
    },
    modal:{
        height:Dimensions.get("window").height
    },
    container: {
        backgroundColor: "green",
        //height: iPhoneX ? 580 : SMALL_DEVICE_H ? 470 : 540,
        //height: iPhoneX ? 580 : SMALL_DEVICE_H ? 470 : 540,
        width: '100%',
        position: 'absolute',
        bottom: -30,
        paddingBottom: 30,
        justifyContent: 'space-between',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 5,
        shadowOpacity: 0.2,
        elevation: 8
    },
    buttonWrapper: {
        width: '100%',
        height:60
    },
    button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        //paddingBottom: iPhoneX ? 20 : 0
    },
    buttonText: {
        paddingTop: 5,
        width: '100%',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '600',
        color: "white",
    },
    resendBtnWrap: {
      width:'100%'
    },
    resendBtn: {
        color: '#fff',
        fontSize: 19,
        width: 150,
        alignSelf: 'center',
        marginTop: 10,
        borderWidth: 1,
        textAlign: 'center',
        borderColor: '#fff',
        padding: 5,
        borderRadius: 10
    },
    header: {
        width: '100%',
        height: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        color: "white",
        marginLeft: 4,
        fontSize: 16,
        fontWeight: 'bold'
    },
    headerIcon: {
        color: "white",
        fontSize: 18
    },
    inputWrapper: {
        height: 100,
        width: '100%',
        paddingLeft: 40,
        paddingRight: 40,
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
    },
    inputItem: {
        height: 50,
        width: 30,
        borderBottomColor: "white",
        borderBottomWidth: 3,
        justifyContent:'center',
        alignItems: 'center'
    },
    dot: {
        width: 15,
        height: 15,
        backgroundColor: "white",
        borderRadius: 15
    },
    keyboardWrapper: {
        width: '100%',
       //height: SMALL_DEVICE_H ? 230 : 300
    },
    keyboardRow: {
        width: '100%',
        //height: SMALL_DEVICE_H ? 50 : 60,
        flexDirection: 'row',
        backgroundColor: "green",
        paddingLeft: 30,
        paddingRight: 30
    },
    key: {
        flex: 1,
        // height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    keyText: {
        color: '"white"',
        fontSize: 22
    },
    closeBtn: {
        position: 'absolute',
        right: 20,
        marginTop: "25%",
        zIndex: 2
    },
}

export default OTPModel;