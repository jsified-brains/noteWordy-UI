import { connect } from 'react-redux';
import HomeScreen from './Home';
import {
  fetchUserVocabWords,
  deleteWord,
  selectWordToView
} from '../../redux/actions/WordsActions/WordsActions';

const mapStateToProps = state => ({
  loading: state.WordsReducer.loading,
  vocab_words: state.WordsReducer.vocab_words,
  selectedWord: state.WordsReducer.selectedWord,
  error: state.WordsReducer.error
});

const mapDispatchToProps = dispatch => ({
  fetchUserVocabWords: () => {
    dispatch(fetchUserVocabWords());
  },
  deleteWord: wordId => {
    dispatch(deleteWord(wordId));
  },
  selectWordToView: word => {
    dispatch(selectWordToView(word));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);
