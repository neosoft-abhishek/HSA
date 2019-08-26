import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import {
  PagerTabIndicator,
  IndicatorViewPager,
  PagerTitleIndicator,
  PagerDotIndicator,
} from 'rn-viewpager';
import { CustomButton } from '../commonComponent/CustomButton'
import { colors } from '../utils/Colors';


class SplashScreen extends Component<{}> {
  static navigationOptions = {
    header: null,
  };

  _renderDotIndicator() {
    return <PagerDotIndicator pageCount={3} />;
  }

  render() {
    return (
      <View style={styles.container}>
        {/* <Loading ref="loader" /> */}
        <IndicatorViewPager
          style={styles.sliderWrap}
          indicator={this._renderDotIndicator()}>
          <View style={{backgroundColor: 'white'}}>
            <Image
              style={styles.imgs}
              source={require('../asset/slidePage.png')}
            />
          </View>
          <View style={{backgroundColor: 'cornflowerblue'}}>
            <Image
              style={styles.imgs}
              source={require('../asset/slidePage.png')}
            />
          </View>
          <View style={{backgroundColor: '#1AA094'}}>
            <Image
              style={styles.imgs}
              source={require('../asset/slidePage.png')}
            />
          </View>
        </IndicatorViewPager>
        <View style={styles.contentWrap}>
          <View style={styles.contentInner1}>
         <CustomButton
              onPress={ ()=> this.props.navigation.navigate('Login')}
              label = {"Login"}
              backgroundColor={colors.green}
              textColor = {colors.WHITE}
            />
          </View>
          <Text style={styles.registerPrompt}>Don't have an account ?</Text>
          <View style={styles.contentInner1}>
           
            <CustomButton
              onPress={()=>this.props.navigation.navigate('Registration')}
              backgroundColor={colors.THEME_COLOR}
              textColor = {colors.WHITE}
              label = {"Register"}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
  },
  sliderWrap: {
    height: Dimensions.get('window').height - 300,
  },
  contentWrap: {
    height: 300,
  },
  contentInner1: {
    flex: 1,
    alignSelf:'center'
  },
  contentInner2: {
    flex: 1,
  },
  loginBtn: {
    width: 150,
    borderRadius: 50,
    alignSelf: 'center',
  },
  loginBtnTouch: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginBtnTxt: {
    fontSize: 20,
    fontWeight: '800',
  },
  registerPrompt: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  registerBtn: {
    width: 120,
    borderRadius: 50,
    alignSelf: 'center',
  },
  registerBtnTouch: {
    width: '100%',
  },
  registerBtnTxt: {
    fontSize: 16,
    fontWeight: '800',
  },
  imgs: {
    height: 350,
    flex: 1,
    width: null,
  },
};

export default SplashScreen;
