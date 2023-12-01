import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PostsScreen from './src/screens/PostsScreen';
import UserScreen from './src/screens/UsersScreens'; 
import CreatePostScreen from './src/screens/CreatePostScreen';
import { RootStackParamList } from './src/services/NavigationTypes';

// Criação da stack de navegação com a tipagem RootStackParamList
const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Posts"
          component={PostsScreen}
          options={{ headerShown: false }} // Isso remove o cabeçalho inteiramente
        />
        <Stack.Screen
          name="CreatePost"
          component={CreatePostScreen}
          options={{ title: 'Voltar' }}
        />
        <Stack.Screen
          name="UserScreen"
          component={UserScreen}
          options={{ title: 'Detalhes do Usuário' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;


