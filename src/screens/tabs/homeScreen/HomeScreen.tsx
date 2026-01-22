import React, {useCallback, useEffect, useState} from 'react';
import {Text, View, Platform, Button, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
// import LanguageTopics from './components/LanguageTopics';
import {TouchableOpacity} from 'react-native';
import {ScrollView} from 'react-native';
// import fetchUser from '../../../services/userInfo';
// import {AppDispatch, RootState} from '../../../redux/store';
import {useDispatch, useSelector} from 'react-redux';
import {getLanguageLabel} from '../../../utils/Utils';
import {useFocusEffect} from '@react-navigation/native';
// import JlptModal from './components/jlpt/JlptModal';
import { GLOBALCOLORS } from '../../../globalStyles/GlobalColors';
import LanguageTopics from './components/LanguageTopics';


const HomeScreen = ({navigation}: any) => {
//   const activeLanguage = useSelector(
//     (state: RootState) => state?.languageInfo?.activeLanguage,
//   );

const activeLanguage = 'N3';
  const [languageAlert, setLanguageAlert] = useState<boolean>(false);
  const [showJlptModal, setShowJlptModal] = useState<boolean>(false);
//   const dispatch = useDispatch<AppDispatch>();

//   useFocusEffect(
//     useCallback(() => {
//       dispatch(fetchUser());
//     }, [dispatch]),
//   );

  return (
    <SafeAreaView
      style={{
        display: 'flex',
        flex: 1,
        backgroundColor: GLOBALCOLORS.background_Color,
      }}>
      <ScrollView>
        <View style={{padding: 16, gap: 24}}>
          <TouchableOpacity
            style={{
              padding: 8,
              borderWidth: 1,
              borderColor: GLOBALCOLORS.border_Color,
              borderRadius: 10,
              alignSelf: 'flex-start',
            }}
            onPress={() => setLanguageAlert(true)}>
            <Text style={{color: GLOBALCOLORS.primary_Color, fontSize: 16}}>
              {getLanguageLabel(activeLanguage)}
            </Text>
          </TouchableOpacity>
          <LanguageTopics navigation={navigation} setShowJlptModal={setShowJlptModal}/>
        </View>
      </ScrollView>
      {/* <JlptModal
        jlptModalVisible={showJlptModal}
        setJlptModalVisible={setShowJlptModal}
        navigation={navigation}
      /> */}
    </SafeAreaView>
  );
};
export default HomeScreen;
