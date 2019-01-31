import { connect } from 'react-redux';
import WordScreen from './Word';

const mapStateToProps = state => ({
  selectedWord: state.WordsReducer.selectedWord
});

export default connect(
  mapStateToProps,
  null
)(WordScreen);
