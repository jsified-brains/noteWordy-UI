import { createStackNavigator, createAppContainer } from 'react-navigation';
import { HomeScreen, SignInScreen, AddEditWordScreen } from '../screens';

const AppStackNavigator = createStackNavigator(
  {
    Home: { screen: HomeScreen },
    SignIn: { screen: SignInScreen },
    AddEditWord: { screen: AddEditWordScreen }
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
