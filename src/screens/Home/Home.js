import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator } from 'react-native';
import {
  Container,
  Content,
  List,
  ListItem,
  Text,
  Fab,
  Icon,
  Toast,
  Left,
  Right,
  Button
} from 'native-base';
import AwesomeAlert from 'react-native-awesome-alerts';
import { AppHeader } from '../../components';
import styles from './Home.styles';

class HomeScreen extends Component {
  state = {
    confirmDelete: false,
    wordIdToDelete: ''
  };

  /**
   * @name componentDidMount
   */
  componentDidMount() {
    console.log('in componentDidMount');
    this.props.fetchUserVocabWords();
  }

  /**
   * @name componentWillReceiveProps
   * @param {any} newprops new value of props
   */
  componentWillReceiveProps(newprops) {
    if (newprops.error !== '') {
      this.toastMessage(newprops.error);
    }
  }

  /**
   * @name componentFocusSubscription
   * @description subscribe to 'didFocus' event of react-navigation
   * whenever this component is loaded(focused), trigger fetchUserVocabWords action
   */
  // componentFocusSubscription = this.props.navigation.addListener('didFocus', () => {
  //   console.log('in didFocus');
  //   this.props.fetchUserVocabWords();
  // });

  // /**
  //  * @name componentWillUnmount
  //  * @description remove componentFocusSubscription
  //  */
  // componentWillUnmount() {
  //   this.componentFocusSubscription.remove();
  // }

  /**
   * @name render
   * @description component's render method
   */
  render() {
    return (
      <Container>
        <AppHeader title="My Vocabulary" navigation={this.props.navigation} />
        {/* eslint-disable */}
        <Content contentContainerStyle={styles.contentContainer}>
          {this.renderContent()}
        </Content>
        {/* eslint-enable */}
        {this.renderFab()}
        {this.renderDeleteConfirm()}
      </Container>
    );
  }

  /**
   * @name renderContent
   * @description render Loading indicator or word's list
   * based on component's state
   */
  renderContent = () => {
    if (this.props.loading) {
      return this.activityIndicator();
    }
    return <List>{this.renderWordsList()}</List>;
  };

  /**
   * @name activityIndicator
   * @description render Loading indicator
   */
  activityIndicator = () => (
    <ActivityIndicator size="large" animating hidesWhenStopped={false} color="#eee" />
  );

  /**
   * @name renderWordsList
   * @description render User's Word's list
   */
  renderWordsList = () => {
    // console.log(`this.props.vocab_words for renderList= ${JSON.stringify(this.props.vocab_words)}`)
    const list = this.props.vocab_words.map((word, indx) => {
      const itemKey = `vocabWord-${indx}`;
      return (
        <ListItem key={itemKey} onPress={() => this.onListItemPress(word)}>
          <Left>
            <Text>{word.word}</Text>
          </Left>
          <Right>
            <Button
              style={{ backgroundColor: 'transparent' }}
              onPress={() => this.confirmDelete(word.wordId)}>
              <Icon active name="trash" style={{ color: '#ffb3b3' }} />
            </Button>
          </Right>
        </ListItem>
      );
    });
    return list;
  };

  /**
   * @name renderFab
   * @description render Fab button on bottom right
   */
  renderFab = () => (
    <Fab
      active
      direction="up"
      containerStyle={{}}
      style={{ backgroundColor: '#5067FF' }}
      position="bottomRight"
      onPress={this.onFabPress}>
      <Icon ios="ios-add" android="md-add" style={{ fontSize: 30 }} />
    </Fab>
  );

  /**
   * @name onFabClick
   * @description callback for Fab button onPress event
   */
  onFabPress = () => {
    this.props.selectWordToView(null);
    this.props.navigation.navigate('AddEditWord');
  };

  /**
   * @name onListItemPress
   * @description callback for word's list item onPress event
   */
  onListItemPress = word => {
    this.props.selectWordToView(word);
    this.props.navigation.navigate('Word');
  };

  /**
   * @name confirmDelete
   * @description callback for onPress event of delete button for a word
   * set component state to show Delete confirmation alert box
   */
  confirmDelete = wordId => {
    this.setState({ confirmDelete: true, wordIdToDelete: wordId });
  };

  /**
   * @name confirmDelete
   * @description callback for onCancelPressed event on Delete confirmation alert box
   * set component state to remove Delete confirmation alert box
   */
  cancelDelete = () => {
    this.setState({ confirmDelete: false, wordIdToDelete: '' });
  };

  /**
   * @name deleteWord
   * @description callback for onConfirmPressed event on Delete confirmation alert box
   */
  deleteWord = () => {
    this.props.deleteWord(this.state.wordIdToDelete);
    this.setState({ confirmDelete: false });
  };

  /**
   * @name deleteWord
   * @description callback for onConfirmPressed event on Delete confirmation alert box
   */
  renderDeleteConfirm = () => (
    <AwesomeAlert
      show={this.state.confirmDelete}
      title="Delete"
      message="Do you want to remove the word?"
      showCancelButton
      showConfirmButton
      cancelText="No"
      confirmText="Yes"
      cancelButtonColor="#333"
      confirmButtonColor="#DD6B55"
      onCancelPressed={this.cancelDelete}
      onConfirmPressed={this.deleteWord}
    />
  );

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

HomeScreen.propTypes = {
  vocab_words: PropTypes.array.isRequired,
  navigation: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  fetchUserVocabWords: PropTypes.func.isRequired,
  selectWordToView: PropTypes.func.isRequired,
  deleteWord: PropTypes.func.isRequired
};

export default HomeScreen;
