import React, { Component } from 'react';
import {
  Container,
  Content,
  Form,
  Item,
  Label,
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
import styles from './AddWord.styles';

class AddWordScreen extends Component {
  state = {
    word: '',
    meaning: '',
    example: '',
    comments: '',
    showAlert: false
  };

  render() {
    return (
      <Container>
        <AppHeader title="My Vocabulary" navigation={this.props.navigation} />
        <Content padder contentContainerStyle={styles.contentContainer}>
          <Segment style={styles.segment}>
            <Button first>
              <Text>Add a word</Text>
            </Button>
          </Segment>
          <Form style={styles.form}>
            <Item floatingLabel style={[styles.rowSpan1]}>
              <Label>word</Label>
              <Input value={this.state.word} onChangeText={txt => this.onTextChange('word', txt)} />
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
                <Icon name="add" />
              )}
              {/* eslint-enable */}

              <Text>Add word to my vocabulary</Text>
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
    this.setState({ showAlert: true });
    this.showAlert(this.state.word, 'to-do: Add word to Vocab DynamoDB table');
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
      [fieldName]: value
    });
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

AddWordScreen.propTypes = {
  navigation: PropTypes.object.isRequired
};

export default AddWordScreen;
