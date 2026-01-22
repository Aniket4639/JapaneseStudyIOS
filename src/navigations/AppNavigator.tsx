import React from 'react';
import {
  Button,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabScreen from '../screens/tabs/tabScreen/TabScreen';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import TranslationLessonsListScreen from '../screens/tabs/homeScreen/components/translationTips/TranslationLessonsListScreen';
import TranslationLessonScreen from '../screens/tabs/homeScreen/components/translationTips/TranslationLessonScreen';
import ConjuctionScreen from '../screens/tabs/homeScreen/components/translationTips/ConjuctionScreen';
import VocabularyListScreen from '../screens/tabs/homeScreen/components/customLists/CustomListScreen';
import DetailsWordScreen from '../screens/stacks/DetailsWordScreen';
import QuizListScreen from '../screens/tabs/homeScreen/components/customLists/components/customListQuiz/QuizListScreen';
import QuizSummaryListScreen from '../screens/tabs/homeScreen/components/customLists/components/customListQuiz/QuizSummaryList';
interface AppNavigatorInterface {
  first?: string;
  second?: string;
  third?: string;
}

const Stack = createNativeStackNavigator();

function AppNavigator() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <Stack.Navigator>
        <Stack.Screen
          name="TabScreen"
          component={TabScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="TranslationLessonsList"
          component={TranslationLessonsListScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="TranslationLesson"
          component={TranslationLessonScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ConjuctionScreen"
          component={ConjuctionScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="VocabularyList"
          component={VocabularyListScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="DetailsWord"
          component={DetailsWordScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="QuizListScreen"
          component={QuizListScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="QuizSummaryListScreen"
          component={QuizSummaryListScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AppNavigator;
