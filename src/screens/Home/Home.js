import React, { Component } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Content, List, ListItem, Text } from 'native-base';
import { AppHeader } from '../../components';
import styles from './Home.styles';

class HomeScreen extends Component {
  render() {
    return (
      <Container>
        <Content contentContainerStyle={styles.screenContainer}>
          <AppHeader title="My Vocabulary" navigation={this.props.navigation} />

          <View style={styles.content}>
            <List>
              <ListItem>
                <Text>go for the jugular</Text>
              </ListItem>
              <ListItem>
                <Text>whole ball of wax</Text>
              </ListItem>
              <ListItem>
                <Text>volcano</Text>
              </ListItem>
            </List>
          </View>
        </Content>
      </Container>
    );
  }
}

HomeScreen.propTypes = {
  navigation: PropTypes.object.isRequired
};

export default HomeScreen;
