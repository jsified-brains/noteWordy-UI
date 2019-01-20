import { API } from 'aws-amplify';
import { VOCAB_WORDS } from '../actionTypes';
import { createAction } from '../createAction';
import NavigationService from '../../../routes/NavigationService';

/**
 * @name selectWordToView
 * @param {*} payload - the word to be set as currently selected word
 * @description action to trigger when a word is selected on the list view of words
 */
export const selectWordToView = payload => ({
  type: VOCAB_WORDS.WORD_SELETED_TO_VIEW,
  payload
});

/**
 * @name fetchUserVocabWords
 * @description actionCreator for fetching words for logged in user
 */
export const fetchUserVocabWords = () => async dispatch => {
  dispatch(createAction(VOCAB_WORDS.GET_BY_USER.IN_PROGRESS));
  try {
    const words = await API.get('vocab_words', '/words');
    dispatch(createAction(VOCAB_WORDS.GET_BY_USER.SUCCESS, words));
  } catch (err) {
    dispatch(
      createAction(VOCAB_WORDS.GET_BY_USER.ERROR, {
        error: 'Error fetching words.'
      })
    );
  }
};

/**
 * @name fetchWordById
 * @param {*} wordId - id of the word to be queried and fetched from words table
 * @description actionCreator for fetching a word from words table by word id
 */
export const fetchWordById = wordId => async dispatch => {
  dispatch(createAction(VOCAB_WORDS.GET_BY_ID.IN_PROGRESS));
  try {
    const word = await API.get('vocab_words', `/words/${wordId}`);
    dispatch(createAction(VOCAB_WORDS.GET_BY_ID.SUCCESS, word));
  } catch (err) {
    dispatch(
      createAction(VOCAB_WORDS.GET_BY_ID.ERROR, {
        error: 'Error fetching word.'
      })
    );
  }
};

/**
 * @name addWordToVocab
 * @param {*} word - word object to be posted to words table
 * @description actionCreator for adding a word to words table
 */
export const addWordToVocab = word => async dispatch => {
  dispatch(createAction(VOCAB_WORDS.ADD.IN_PROGRESS));
  try {
    await API.post('vocab_words', '/words', {
      body: word
    });
    NavigationService.navigate('Home');
  } catch (err) {
    dispatch(
      createAction(VOCAB_WORDS.ADD.ERROR, {
        error: err.message || JSON.stringify(err)
      })
    );
  }
};

/**
 * @name updateWord
 * @param {*} word - word object to be updated
 * @description - updateWord for deleting a word
 */
export const updateWord = word => async dispatch => {
  dispatch(createAction(VOCAB_WORDS.UPDATE.IN_PROGRESS));
  try {
    await API.put('vocab_words', `/words/${word.wordId}`, {
      body: word
    });
    dispatch(createAction(VOCAB_WORDS.UPDATE.SUCCESS));
    NavigationService.navigate('Home');
  } catch (err) {
    dispatch(
      createAction(VOCAB_WORDS.UPDATE.ERROR, {
        error: `Service error: Error update word: ${err.message}`
      })
    );
  }
};

/**
 * @name deleteWord
 * @wordId - id of the word to be deleted
 * @description - actionCreator for deleting a word
 */
export const deleteWord = wordId => async dispatch => {
  dispatch(createAction(VOCAB_WORDS.DELETE.IN_PROGRESS));
  try {
    await API.del('vocab_words', `/words/${wordId}`);
    dispatch(createAction(VOCAB_WORDS.DELETE.SUCCESS, { wordId }));
  } catch (err) {
    dispatch(
      createAction(VOCAB_WORDS.DELETE.ERROR, {
        error: `Service error: Error deleting word: ${err.message}`
      })
    );
  }
};
