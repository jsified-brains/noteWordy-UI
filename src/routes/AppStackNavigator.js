import { createStackNavigator, createAppContainer } from 'react-navigation';
import { HomeScreen, SignInScreen, AddEditWordScreen, WordScreen } from '../screens';

const AppStackNavigator = createStackNavigator(
  {
    Home: { screen: HomeScreen },
    SignIn: { screen: SignInScreen },
    AddEditWord: { screen: AddEditWordScreen },
    Word: { screen: WordScreen }
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
