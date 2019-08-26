import React, {Component} from 'react';
import {TouchableOpacity, Text, Image, View, TextInput} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import IconMat from 'react-native-vector-icons/MaterialIcons';

import OTPModel from '../commonComponent/OTPModel';
import {colors} from '../utils/Colors';
import {constants} from '../utils/Constants';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contryCode: '966',
      phoneNo: '',
    };
  }

  componentDidMount() {}

  _renderTitleIndicator() {
    return <PagerTitleIndicator titles={['one', 'two', 'three']} />;
  }

  _renderDotIndicator() {
    return <PagerDotIndicator pageCount={3} />;
  }

  _resendOtp = () => {
    this.refs.pinmodal.toggle();
    setTimeout(() => {
      this._generateOTP();
    }, 500);
  };

  _generateOTP = () => {
    const {contryCode, phoneNo} = this.state;
    let errorList = [];
    this.props.navigation.navigate('OTPVerifivation')


      let data = {
        country_code: contryCode,
        mobile_no: phoneNo,
      };
     // console.log('login data', data);
      // //this.refs.loader.load();
     // data = JSON.stringify(data);
     //Api.loginOtpGenerate(this._generateOTPCb, data);
    // } else {
    //   this.refs.error.toggle(errorList);
    // }
  };

  _generateOTPCb = {
    success: result => {
      console.log({result});
      // //this.refs.loader.hideLoader();
      setTimeout(() => {
        console.log('open pin');
        this.refs.pinmodal.toggle();
      }, 500);
      console.log('open after');
    },
    error: err => {
      let cb = {
        ok: () => {
          //  //this.refs.loader.hideLoader();
        },
      };
      //   //this.refs.loader.error('Error', err.message, cb);
    },
  };

  _login = otp => {
    this.refs.pinmodal.toggle();
    setTimeout(() => {
      //this.refs.loader.load();
      FCM.requestPermissions();
      FCM.getFCMToken().then(token => {
        const {contryCode, phoneNo} = this.state;
        let data = {
          country_code: contryCode,
          mobile_no: phoneNo,
          otp: otp,
          device_id: token,
        };
        data = JSON.stringify(data);
        Api.login(this._loginCb, data);
      });
    }, 500);
  };

  _loginCb = {
    success: result => {
      //console.log("Jitu ==> ",result);
      let role = result.data.role.filter(role => role.name === 'user');
      //console.log(role);
      result.data.role = role[0].name;
      this.props.setUserData(result.data);
      //console.log("action set");
      _saveUserLocaly(result.data);
      //console.log("local storage");
      let cb = {
        ok: () => {
          let data = {};
          let header = buildHeader({access_token: result.data.token});
          Api.userProfile(this._userProfileCb, data, header);
          // //this.refs.loader.hideLoader();
          // setTimeout(() => {
          //     this.props.navigation.navigate('Drawer');
          // }, 500);
        },
      };
      //this.refs.loader.success('Success', 'Login Successfull', cb);
    },
    error: err => {
      let cb = {
        ok: () => {
          //this.refs.loader.hideLoader();
        },
      };
      //this.refs.loader.error('Error', err.message, cb);
    },
  };
  _userProfileCb = {
    success: result => {
      //this.props.setUserProfileData(result.data);
      this.props.setUserData(result.data);
      //_saveUserLocaly(result.data);
      console.log('result', result);
      //this.refs.loader.hideLoader();

      setTimeout(() => {
        this.props.navigation.navigate('Drawer');
      }, 500);
      // let cb = {
      //     ok: () => {
      //     }
      // }
      // //this.refs.loader.success('Success', 'Login Successfull', cb);
    },
    error: err => {
      let cb = {
        ok: () => {
          //this.refs.loader.hideLoader();
        },
      };
      //this.refs.loader.error('Error', err.message, cb);
    },
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.welcomeTitle}>
          <Image source={require('../asset/appLogo.png')} style={styles.logo} />

          {/* <Text style={styles.welcomeTxt}>Welcome</Text> */}
        </View>
        <View style={styles.flex1}>
          <Text style={styles.enterNumberPrompt}>
            {constants.ENTER_MOBILE_NUMBER}
          </Text>
          <View style={styles.inputWrap}>
            <TextInput
              style={styles.inputContryCodeStyle}
              underlineColorAndroid="transparent"
              placeholder="9xx"
              onChangeText={contryCode => this.setState({contryCode})}
              value={this.state.contryCode}
            />
            <View style={styles.verticleLine} />
            <TextInput
              style={styles.inputStyle}
              underlineColorAndroid="transparent"
              placeholder="55xxxxxxx"
              onChangeText={phoneNo => this.setState({phoneNo})}
              value={this.state.phoneNo}
            />
          </View>
          <View>
            <TouchableOpacity
              onPress={() => {
                this._generateOTP();
              }}
              style={styles.loginBtnTouch}>
              <Text style={styles.signUpPrompt}>{constants.LABEL_LOGIN}</Text>
              <IconMat name="arrow-forward" color={colors.WHITE} size={28} />
            </TouchableOpacity>
            <Text style={styles.textStyle}>{constants.LABEL_TEXT_LOGIN}</Text>
          </View>
          <View style={styles.bottomView}>
            <Text style={styles.signUpLabel}>
              ------ - {constants.OR} - ------
            </Text>
            <Text style={styles.signUpLabel}>{constants.SIGN_UP}</Text>
          </View>
        </View>

      </View>
    );
  }
}

// const mapStateToProps = state => ({});
// const mapDispatchToProps = dispatch =>
//   bindActionCreators(
//     {
//       setUserData,
//       setUserProfileData,
//     },
//     dispatch,
//   );

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  bottomView: {
    flex: 1,
    //  backgroundColor:'red'
  },
  signUpLabel: {
    textAlign: 'center',
    margin: 15,
    fontSize: 18,
  },
  textStyle: {
    fontSize: 12,
    textAlign: 'center',
  },
  flex1: {
    flex: 1.5,
  },
  logoWrap: {
    marginBottom: 10,
  },
  logo: {
    height: '90%',
    width: '100%',
    resizeMode: 'contain',
  },
  welcomeTxt: {
    color: colors.purple,
    fontSize: 30,
    height: '20%',
  },
  enterNumberPrompt: {
    textAlign: 'center',
    color: colors.THEME_COLOR,
    marginBottom: 10,
    //  fontSize: fontsSizes.medium
  },
  inputWrap: {
    flexDirection: 'row',
    paddingHorizontal: '20%',
    alignItems: 'center',
    marginBottom: '5%',
  },
  inputStyle: {
    height: 40,
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: colors.THEME_COLOR,
    width: '70%',
    textAlign: 'center',
  },
  inputContryCodeStyle: {
    height: 40,
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: colors.THEME_COLOR,
    width: '30%',
    textAlign: 'center',
  },
  verticleLine: {
    width: 10,
    height: 1,
    marginTop: 15,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: colors.gray,
  },
  signUpPrompt: {
    textAlign: 'center',
    color: colors.WHITE,
    fontSize: 16,
    paddingVertical: 10,
    paddingRight: 10,
    fontWeight: '600',
  },

  loginBtnTouch: {
    backgroundColor: colors.THEME_COLOR,
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    alignSelf: 'center',
    borderRadius: 25,
  },

  welcomeTitle: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default Login;
