import Amplify from 'aws-amplify';
import { GoogleSignin } from 'react-native-google-signin';
import { APP_CONSTANTS } from './AppConstants';

/**
 * @name GoogleConfig
 * @description Configure GoogleSignIn services
 */
export const GoogleConfig = () => {
  GoogleSignin.configure();
};

/**
 * @name AmplifyConfig
 * @description Configure Amplify services
 */
export const AmplifyConfig = () => {
  Amplify.configure({
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
