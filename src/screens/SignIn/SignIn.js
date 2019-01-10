import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { PropTypes } from 'prop-types';
import { UserSignIn } from '../../components';

class SignInScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={styles.titleText}>Sign in to NoteWordy</Text>
        </View>
        <View style={styles.content}>
          <UserSignIn navigation={this.props.navigation} />
        </View>
      </View>
    );
  }
}

SignInScreen.propTypes = {
  navigation: PropTypes.object.isRequired
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF'
  },
  title: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 2
  },
  titleText: {
    fontSize: 20
  },
  content: {
    flex: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  }
});
