import React, {useCallback, useEffect, useState} from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Tts from 'react-native-tts';
import {SafeAreaView} from 'react-native-safe-area-context';
import {GLOBALCOLORS} from '../../../../../globalStyles/GlobalColors';
import {GLOBALSTYLES} from '../../../../../globalStyles/GlobalStyles';
import {useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import FilterAlert from './components/FilterAlert';
import SortAlert from './components/SortAlert';

import userInfoData from '../../../../../../data/userInfo.json'
const Icon = FontAwesomeIcon as any;

interface VocabularyListScreen {
  firstWord: string;
  secondWord: string;
}

const VocabularyListScreen = ({navigation}: any) => {
  //   const userData = useSelector((state: RootState) => state?.userInfo?.userData);

  //   const activeLanguage = useSelector(
  //     (state: RootState) => state?.languageInfo?.activeLanguage,
  //   );
//   const [userInfoData, setUserInfoData] = useState(userData);
  const [searchText, setSearchText] = useState('');
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [isDisplayFilterAlert, setIsDisplayFilterAlert] =
    useState<boolean>(false);
  const [filterData, setFilterData] = useState<string>('All');
  const [isDisplaySortAlert, setIsDisplaySortAlert] = useState<boolean>(false);
  const [sortData, setSortData] = useState<string>('None');
  //   const vocabularyData =
  //     activeLanguage === 'N3'
  //       ? userInfoData?.VocabularyN3List
  //       : userInfoData?.VocabularySpanishList;

  const vocabularyData = userInfoData.VocabularyN3List;

  const [data, setData] = useState(vocabularyData);

  const handlePlayIcon = async (firstWord: string, secondWord: string) => {
    Tts.setDefaultLanguage('ja-JP');
    Tts.stop();
    Tts.speak(secondWord);
  };

  useEffect(() => {
    let filteredListData = vocabularyData?.filter(
      (e: any) =>
        e?.FirstText?.toLowerCase().startsWith(searchText.toLowerCase()) ||
        e?.SecondText?.toLowerCase().startsWith(searchText.toLowerCase()),
    );
    if (filterData != 'All') {
      filteredListData = filteredListData?.filter(
        (e: any) => e?.Tag == filterData,
      );
    }
    if (sortData == 'EN_ASC') {
      filteredListData = filteredListData?.sort((a: any, b: any) =>
        (a?.SecondText ?? '').localeCompare(b?.SecondText ?? ''),
      );
    } else if (sortData == 'EN_DESC') {
      filteredListData = filteredListData?.sort((a: any, b: any) =>
        (b?.SecondText ?? '').localeCompare(a?.SecondText ?? ''),
      );
    } else if (sortData == 'JA_ASC') {
      filteredListData = filteredListData?.sort((a: any, b: any) =>
        (a?.FirstText ?? '').localeCompare(b?.FirstText ?? ''),
      );
    } else if (sortData == 'JA_DESC') {
      filteredListData = filteredListData?.sort((a: any, b: any) =>
        (b?.FirstText ?? '').localeCompare(a?.FirstText ?? ''),
      );
    }
    setData(filteredListData);
  }, [searchText, filterData, vocabularyData, sortData]);

//   useFocusEffect(
//     useCallback(() => {
//       setUserInfoData(userData);
//     }, [userData]),
//  );

  const onResetFilterData = () => {
    setFilterData('All');
  };

  const onResetSortData = () => {
    setSortData('None');
  };

  return (
    <SafeAreaView
      style={{
        display: 'flex',
        flex: 1,
      }}>
      <ScrollView
        overScrollMode="never"
        bounces={false} //for ios
        style={{
          display: 'flex',
          flex: 1,
          backgroundColor: GLOBALCOLORS.background_Color,
          margin: 16,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 24,
            opacity: modalVisible ? 0.3 : 1,
            pointerEvents: modalVisible ? 'none' : 'auto',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
            <TouchableOpacity
              style={{flexDirection: 'row', alignItems: 'center', gap: 8}}
              onPress={() => navigation.goBack()}>
              <Icon
                name="angle-left"
                size={30}
                color={GLOBALCOLORS.primary_Color}
              />
              <Text style={{fontSize: 20, color: GLOBALCOLORS.primary_Color}}>
                Back
              </Text>
            </TouchableOpacity>
            {data?.length > 0 && (
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: '600',
                }}>{`${data?.length} words`}</Text>
            )}
          </View>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 8,
              backgroundColor: '#4169e1',
              padding: 8,
              borderRadius: 10,
            }}
            onPress={() => navigation.navigate('QuizListScreen')}>
            <Icon name="graduation-cap" size={20} color="#FFFFFF" />
            <Text style={{fontSize: 20, color: '#FFFFFF'}}>Quiz</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 24,
            gap: 12,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 8,
              flex: 1,
            }}>
            <TouchableOpacity
              style={{flexDirection: 'row', alignItems: 'center', gap: 2}}
              onPress={() => setIsDisplaySortAlert(true)}>
              <Icon name="sort-alpha-asc" size={20} color="#4169e1" />
              <Text style={{fontSize: 20, color: GLOBALCOLORS.primary_Color}}>
                Sort
              </Text>
            </TouchableOpacity>
            <TextInput
              value={searchText}
              onChangeText={setSearchText}
              placeholder="Search"
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 5,
                padding: 8,
                fontSize: 18,
                flex: 1,
              }}
            />
          </View>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 2,
            }}
            onPress={() => setIsDisplayFilterAlert(true)}>
            <Icon name="filter" size={20} color={GLOBALCOLORS.primary_Color} />

            <Text style={{fontSize: 20, color: GLOBALCOLORS.primary_Color}}>
              Filter
            </Text>
          </TouchableOpacity>
        </View>
        {filterData !== 'All' || sortData != 'None' ? (
          <View style={{flexDirection: 'row', gap: 12, marginBottom: 8}}>
            {filterData !== 'All' ? (
              <TouchableOpacity
                style={{
                  paddingHorizontal: 8,
                  paddingVertical: 4,
                  backgroundColor: GLOBALCOLORS.primary_Color,
                  borderRadius: 20,
                  flexDirection: 'row',
                  gap: 4,
                  alignItems: 'center',
                }}
                onPress={onResetFilterData}>
                <Text style={{fontSize: 16, color: GLOBALCOLORS.white}}>
                  {filterData}
                </Text>
                <Icon name="close" size={16} color={GLOBALCOLORS.white} />
              </TouchableOpacity>
            ) : null}
            {sortData != 'None' ? (
              <TouchableOpacity
                style={{
                  paddingHorizontal: 8,
                  paddingVertical: 4,
                  backgroundColor: GLOBALCOLORS.primary_Color,
                  borderRadius: 20,
                  flexDirection: 'row',
                  gap: 4,
                  alignItems: 'center',
                }}
                onPress={onResetSortData}>
                <Text style={{fontSize: 16, color: GLOBALCOLORS.white}}>
                  {sortData}
                </Text>
                <Icon name="close" size={16} color={GLOBALCOLORS.white} />
              </TouchableOpacity>
            ) : null}
          </View>
        ) : null}
        {data?.length > 0 ? (
          data?.map((e: any, index: number) => {
            return (
              <TouchableOpacity
                key={index}
                style={{
                  backgroundColor: 'white',
                  padding: 16,
                  marginBottom: 12,
                  alignItems: 'center',
                  gap: 4,
                  borderRadius: 8,
                  flex: 1,
                }}
                onPress={() => {
                  navigation.navigate('DetailsWord', {
                    wordDetails: e,
                  });
                }}>
                <Text style={{fontSize: 18}}>{e?.FirstText}</Text>
                <Text style={{fontSize: 18}}>{e?.SecondText}</Text>
                {e?.OptionalText ? (
                  <Text style={{fontSize: 18, fontWeight: 500}}>
                    {e?.OptionalText}
                  </Text>
                ) : null}

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    flex: 1,
                    alignSelf: 'flex-end',
                  }}>
                  <Icon
                    name="volume-up"
                    size={24}
                    color={GLOBALCOLORS.primary_Color}
                    onPress={() => handlePlayIcon(e?.FirstText, e?.SecondText)}
                  />
                </View>
              </TouchableOpacity>
            );
          })
        ) : (
          <View
            style={[
              GLOBALSTYLES.card,
              {
                alignItems: 'center',
                justifyContent: 'center',
                height: 200,
                gap: 4,
              },
            ]}>
            <Text style={{fontSize: 24, fontWeight: '700'}}>
              No words in the bucket
            </Text>
            <Text style={{fontSize: 20, color: GLOBALCOLORS.accent_text}}>
              Please add some words.
            </Text>
          </View>
        )}
      </ScrollView>
      <FilterAlert
        filterData={filterData}
        setFilterData={setFilterData}
        isDisplayFilterAlert={isDisplayFilterAlert}
        setIsDisplayFilterAlert={setIsDisplayFilterAlert}
      />
      <SortAlert
        sortData={sortData}
        setSortData={setSortData}
        isDisplaySortAlert={isDisplaySortAlert}
        setIsDisplaySortAlert={setIsDisplaySortAlert}
      />
    </SafeAreaView>
  );
};
export default VocabularyListScreen;
