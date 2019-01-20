import { connect } from 'react-redux';
import AddEditWordScreen from './AddEditWord';
import { addWordToVocab, updateWord } from '../../redux/actions/WordsActions/WordsActions';

const mapStateToProps = state => ({
  loading: state.WordsReducer.loading,
  error: state.WordsReducer.error,
  wordToEdit: state.WordsReducer.selectedWord
});

const mapDispatchToProps = dispatch => ({
  addWordToVocab: data => {
    dispatch(addWordToVocab(data));
  },
  updateWord: data => {
    dispatch(updateWord(data));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddEditWordScreen);
