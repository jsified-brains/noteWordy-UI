import React, { Component } from 'react';
import {
  Container,
  Content,
  Card,
  CardItem,
  Button,
  Text,
  Icon,
  Left,
  Body,
  Right,
  List,
  ListItem,
  Toast
} from 'native-base';
import PropTypes from 'prop-types';
import AppHeader from '../../components/AppHeader/AppHeaderConnected';
import { styles } from './styles';

class WordScreen extends Component {
  /**
   * @name componentWillReceiveProps
   * @param {any} newprops new value of props
   */
  componentWillReceiveProps(newprops) {
    if (newprops.error !== '') {
      this.toastMessage(newprops.error);
    }
  }

  render() {
    const word = this.props.selectedWord; // navigation.getParam('word', {...this.state});
    const wordDetails = [
      { label: 'meaning', val: word.meaning },
      { label: 'example', val: word.example },
      { label: 'comments', val: word.comments }
    ];
    return (
      <Container>
        <AppHeader title="My Vocabulary" backButton="true" navigation={this.props.navigation} />
        <Content padder contentContainerStyle={styles.contentContainer}>
          <List style={{ flex: 1 }}>
            <ListItem icon itemDivider>
              <Left>
                <Button
                  style={{ backgroundColor: 'transparent' }}
                  onPress={() => this.onBackPress()}>
                  <Icon active name="arrow-round-back" style={{ color: 'blue' }} />
                </Button>
              </Left>
              <Body>
                <Text style={{ fontSize: 20 }}>{word.word}</Text>
              </Body>
              <Right>
                <Button style={styles.editButton} onPress={() => this.onEditPress()}>
                  <Icon active name="create" style={styles.editIcon} />
                </Button>
              </Right>
            </ListItem>
          </List>
          {this.renderWordDetailField(wordDetails)}
        </Content>
      </Container>
    );
  }

  /**
   * @name renderWordDetailField
   */
  renderWordDetailField = wordDetails =>
    wordDetails.map(wordDetail => {
      const { label, val } = wordDetail;
      return (
        <Card style={{ flex: 3 }} key={`wordDetails-${label}`}>
          <CardItem style={{ flex: 1 }}>
            <Left>
              <Text style={{ color: '#aaa' }}>{label}</Text>
            </Left>
          </CardItem>
          <CardItem style={{ flex: 5 }}>
            <Body>
              <Text>{val}</Text>
            </Body>
          </CardItem>
        </Card>
      );
    });

  /**
   * @name onEditPress
   * @description callback for onPress event of Back button
   */
  onBackPress = () => {
    this.props.navigation.navigate('Home');
  };

  /**
   * @name onEditPress
   * @description callback for onPress event of Edit button
   */
  onEditPress = () => {
    this.props.navigation.navigate('AddEditWord');
  };

  /**
   * @name toastMessage
   * @description toast a message
   * @param messsage message to be shown on the toast box
   */
  toastMessage = messsage => {
    Toast.show({
      text: messsage,
      buttonText: 'Okay',
      position: 'bottom',
      type: 'danger',
      duration: 5000
    });
  };
}

WordScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  selectedWord: PropTypes.object.isRequired
};

export default WordScreen;
