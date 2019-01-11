import React, { Component } from 'react';
import { Text, TouchableHighlight, Image } from 'react-native';
import { Header, Left, Title, Subtitle, Right, Button, Body } from 'native-base';
import { GoogleSignin } from 'react-native-google-signin';
import { PropTypes } from 'prop-types';
import styles from './AppHeader.styles';

class AppHeader extends Component {
  render() {
    return (
      <Header style={styles.headerBar} iosBarStyle="dark-content" androidStatusBarColor="lightgray">
        <Left>
          <TouchableHighlight style={styles.profileImgContainer}>
            <Image source={{ uri: this.props.googleUser.photo }} style={styles.profileImg} />
          </TouchableHighlight>
        </Left>

        <Body style={{ flex: 3 }}>
          <Title>{this.props.title} </Title>
          <Subtitle style={{ color: 'white' }}>{this.props.googleUser.email || 'not found'}</Subtitle>
        </Body>

        <Right>
          <Button transparent dark onPress={() => this.signOut()}>
            <Text>Log out</Text>
          </Button>
        </Right>
      </Header>
    );
  }

  /**
   * @name signOut
   */
  signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
    } catch (error) {
      // console.error(error);
    } finally {
      this.props.UserSignIn_logOut({});
      this.props.navigation.navigate('SignIn');
    }
  };

  // subscribe to 'didFocus' event of react-navigation
  // whenever this component is loaded(focused), check if an authenticated user is avaible
  // if not, navigate the user back to SignIn screen
  componentFocusSubscription = this.props.navigation.addListener('didFocus', () => {
    if (!this.props.googleUser) {
      this.props.navigation.navigate('SignIn');
    }
  });

  componentWillUnmount() {
    this.componentFocusSubscription.remove();
  }
}

AppHeader.propTypes = {
  title: PropTypes.string.isRequired,
  navigation: PropTypes.object.isRequired,
  googleUser: PropTypes.object.isRequired,
  UserSignIn_logOut: PropTypes.func.isRequired
};

export default AppHeader;
