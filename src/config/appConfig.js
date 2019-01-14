import Amplify from 'aws-amplify';
import { GoogleSignin } from 'react-native-google-signin';
import { APP_CONSTANTS } from './AppConstants';

/**
 * @name GoogleConfig
 * @description Configure GoogleSignIn services
 */
export const GoogleConfig = () => {
  GoogleSignin.configure({
    iosClientId: APP_CONSTANTS.google.iosClientId,
    androidClientId: APP_CONSTANTS.google.androidClientId
  });
};

/**
 * @name AmplifyConfig
 * @description Configure Amplify services
 */
export const AmplifyConfig = () => {
  Amplify.configure({
    Auth: {
      identityPoolId: APP_CONSTANTS.cognito.IDENTITY_POOL_ID,
      region: APP_CONSTANTS.cognito.REGION,
      mandatorySignIn: true
    },
    API: {
      endpoints: [
        {
          name: 'vocab_words',
          endpoint: APP_CONSTANTS.apiGateway.URL,
          region: APP_CONSTANTS.apiGateway.REGION
        }
      ]
    }
  });
};
