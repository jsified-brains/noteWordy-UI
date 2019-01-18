import React, { Component } from 'react';
import {
  Container,
  Content,
  Form,
  Item,
  Toast,
  Input,
  Text,
  Textarea,
  Button,
  Segment,
  Icon,
  Spinner
} from 'native-base';
import { Alert } from 'react-native';
import { PropTypes } from 'prop-types';
import AppHeader from '../../components/AppHeader/AppHeaderConnected';
import styles from './styles';

class AddEditWordScreen extends Component {
  state = {
    word: '',
    meaning: '',
    example: '',
    comments: '',
    showAlert: false,
    error: ''
  };

  componentDidMount() {
    if (this.props.wordToEdit) {
      const word = this.props.wordToEdit;
      this.setState({
        word: word.word,
        meaning: word.meaning,
        example: word.example,
        comments: word.comments
      });
    }
  }

  render() {
    const wordToEdit = this.props.wordToEdit || null;
    const buttonIcon = !wordToEdit ? 'add' : 'create';
    return (
      <Container>
        <AppHeader title="My Vocabulary" navigation={this.props.navigation} />

        <Segment>
          <Item style={{ flex: 1 }} />
          <Button first last style={styles.segmentButton}>
            <Text>{!wordToEdit ? 'Add a word' : 'Edit'}</Text>
          </Button>
          <Item onPress={() => this.props.navigation.navigate('Home')} style={styles.closeIconItem}>
            <Icon name="close" style={styles.closeIcon} />
          </Item>
        </Segment>

        <Content padder contentContainerStyle={styles.contentContainer}>
          <Form style={styles.form}>
            <Item style={[styles.rowSpan1]}>
              <Input
                placeholder="word"
                value={this.state.word}
                onChangeText={txt => this.onTextChange('word', txt)}
              />
            </Item>

            {/* eslint-disable */}
            {["meaning", "example", "comments"].map(field =>
              this.renderTextArea(field)
            )}
            {/* eslint-enable */}

            <Button
              iconLeft
              block
              style={[styles.rowSpan1, styles.button]}
              disabled={this.state.showAlert}
              onPress={this.postWord}>
              {/* eslint-disable */}
              {this.state.showAlert ? (
                <Spinner color="red" />
              ) : (
                <Icon name={buttonIcon} />
              )}
              {/* eslint-enable */}

              <Text>{!wordToEdit ? 'Add word to my vocabulary' : 'Update'}</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }

  /**
   * @name postWord
   * @description function to call onPress of Add Word button of the form
   */
  postWord = () => {
    if (!this.state.word || !this.state.meaning) {
      this.toastMessage('A word and its meaning must be entered!');
      return;
    }

    const word = {
      word: this.state.word,
      meaning: this.state.meaning,
      example: this.state.example,
      comments: this.state.comments
    };

    if (this.props.wordToEdit) {
      // to-do: dispatch redux action to update word
    } else {
      // to-do: dispatch redux action to add word
    }
    // for time being, show alert until we connect the component to redux
    this.setState({ showAlert: true });
    this.showAlert(word.word, 'to-do: Add/Update word to Vocab DynamoDB table');
  };

  /**
   * @name onTextChange
   * @description function to call onChangeText event of text inputs
   *              to update the corresponding state value
   * @param fieldName name of the input whose text value has been changed
   * @param value value of the input field
   */
  onTextChange = (fieldName, value) => {
    this.setState({
      [fieldName]: value.trim()
    });
  };

  /**
   * @name onCancel
   * @description function to call on press of cancel button
   */
  onCancelPress = () => {
    this.props.navigation.navigate('Home');
  };

  /**
   * @name renderTextArea
   * @description returns TextArea element for the specified field
   * @param fieldName name for the textarea field
   */
  renderTextArea = fieldName => (
    <Textarea
      rowSpan={3}
      bordered
      placeholder={fieldName}
      key={fieldName}
      style={styles.rowSpan3}
      value={this.state[fieldName]}
      onChangeText={txt => this.onTextChange(fieldName, txt)}
    />
  );

  /**
   * @name toastMessage
   * @description toast a message
   * @param errMesssage message to be shown on the toast box
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

  /**
   * @name showAlert
   * @description show alert box
   * @param title title of the alert box
   * @param message message of the alert box
   */
  showAlert = (title, message) =>
    Alert.alert(
      title,
      message,
      [
        {
          text: 'OK',
          onPress: () => {
            this.setState({ showAlert: false });
            this.props.navigation.navigate('Home');
          }
        }
      ],
      {
        cancelable: false
      }
    );
}

AddEditWordScreen.defaultProps = {
  wordToEdit: null
};

AddEditWordScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  wordToEdit: PropTypes.object
};

export default AddEditWordScreen;