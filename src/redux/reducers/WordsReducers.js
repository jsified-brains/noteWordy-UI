import { VOCAB_WORDS } from '../actions/actionTypes';

const defaultState = {
  vocab_words: [],
  selectedWord: null,
  loading: false,
  error: ''
};

export default function WordsReducer(state = defaultState, action) {
  switch (action.type) {
    case VOCAB_WORDS.ADD.IN_PROGRESS:
    case VOCAB_WORDS.GET_BY_ID.IN_PROGRESS:
    case VOCAB_WORDS.GET_BY_USER.IN_PROGRESS:
    case VOCAB_WORDS.UPDATE.IN_PROGRESS:
    case VOCAB_WORDS.DELETE.IN_PROGRESS:
      return {
        ...state,
        error: '',
        loading: true
      };
    case VOCAB_WORDS.ADD.SUCCESS:
    case VOCAB_WORDS.UPDATE.SUCCESS:
      return {
        ...state,
        loading: false,
        error: ''
      };
    case VOCAB_WORDS.GET_BY_ID.SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        selectedWord: action.payload
      };
    case VOCAB_WORDS.GET_BY_USER.SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        vocab_words: action.payload
      };
    case VOCAB_WORDS.DELETE.SUCCESS: {
      const words = state.vocab_words.filter(word => word.wordId !== action.payload.wordId);

      return {
        ...state,
        error: '',
        loading: false,
        vocab_words: words
      };
    }
    case VOCAB_WORDS.WORD_SELETED_TO_VIEW:
      return {
        ...state,
        error: '',
        selectedWord: action.payload
      };
    case VOCAB_WORDS.ADD.ERROR:
    case VOCAB_WORDS.UPDATE.ERROR:
    case VOCAB_WORDS.GET_BY_ID.ERROR:
    case VOCAB_WORDS.GET_BY_USER.ERROR:
    case VOCAB_WORDS.DELETE.ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    default:
      return state;
  }
}
