import { createStackNavigator, createAppContainer } from 'react-navigation';
import { HomeScreen, SignInScreen, AddWordScreen } from '../screens';

const AppStackNavigator = createStackNavigator(
  {
    Home: { screen: HomeScreen },
    SignIn: { screen: SignInScreen },
    AddWord: { screen: AddWordScreen }
  },
  {
    initialRouteName: 'SignIn',
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false
    }
  }
);

export const AppNavigationContainer = createAppContainer(AppStackNavigator);
