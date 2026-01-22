import {Text, View} from 'react-native';
// import {useSelector} from 'react-redux';
// import {RootState} from '../../../../redux/store';
import {useDeferredValue, useEffect, useState} from 'react';
import { GLOBALCOLORS } from '../../../../globalStyles/GlobalColors';
import ListView from '../../../../components/ListView';

const LanguageTopics = ({navigation, setShowJlptModal}: any) => {
//   const activeLanguage = useSelector(
//     (state: RootState) => state?.languageInfo?.activeLanguage,
//   );

const activeLanguage = 'N3';

  const japaneseN3Data = [
    {name: 'All', icon: 'dashboard', navigation: 'AllWordList'},
    {name: 'JLPT', icon: 'emoji-events', state: setShowJlptModal},
    {
      name: 'Sensei Notes',
      icon: 'auto-stories',
      navigation: 'SenseiVocabularyListScreen',
    },
    {
      name: 'Translation Tips',
      icon: 'translate',
      navigation: 'TranslationLessonsList',
    },
    {name: 'Custom Lists', icon: 'star', navigation: 'VocabularyList'},
  ];
  const spanishData = [
    {name: 'Custom Lists', icon: 'star', navigation: 'VocabularyList'},
  ];
  const [languageData, setLanguageData] = useState<any>(japaneseN3Data);

  useEffect(() => {
    switch (activeLanguage) {
      case 'N3':
        return setLanguageData(japaneseN3Data);
      default:
        return setLanguageData(spanishData);
    }
  }, [activeLanguage]);

  return (
    <View
      style={{
        gap: 4,
      }}>
      <Text style={{color: GLOBALCOLORS.muted_Color, paddingLeft: 4}}>
        Language Topics
      </Text>
      <ListView data={languageData} navigation={navigation} />
    </View>
  );
};
export default LanguageTopics;
