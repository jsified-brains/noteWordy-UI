import React, { Component } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Content, List, ListItem, Text, Fab, Icon } from 'native-base';
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

          <Fab
            active
            direction="up"
            containerStyle={{}}
            style={{ backgroundColor: '#5067FF' }}
            position="bottomRight"
            onPress={this.onFabClick}>
            <Icon ios="ios-add" android="md-add" style={{ fontSize: 30 }} />
          </Fab>
        </Content>
      </Container>
    );
  }

  onFabClick = () => {
    this.props.navigation.navigate('AddWord');
  };
}

HomeScreen.propTypes = {
  navigation: PropTypes.object.isRequired
};

export default HomeScreen;
