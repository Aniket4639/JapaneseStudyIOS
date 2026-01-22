import {useCallback, useEffect, useState} from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import DividerLine from '../../components/DividerLine';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Tts from 'react-native-tts';
import {useFocusEffect} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
// import {AppDispatch, RootState} from '../../redux/store';
// import fetchUser from '../../services/userInfo';
import Toaster from '../../components/Toaster';
import {SafeAreaView} from 'react-native-safe-area-context';
import Spinner from '../../components/Spinner'
import AddingWordCard from '../../components/AddingWord';
import WordRemoveAlert from './WordRemoveAlert';

const MaterialIcon = MaterialIcons as any;
const FontAwesomeIcon = FontAwesomeIcons as any;

const DetailsWordScreen = ({route, navigation}: any) => {
//   const userData = useSelector((state: RootState) => state?.userInfo?.userData);
//   const activeLanguage = useSelector(
//     (state: RootState) => state?.languageInfo?.activeLanguage,
//   );
//   const dispatch = useDispatch<AppDispatch>();

const activeLanguage = 'N3';
  const [data, setData] = useState<any>(route?.params?.wordDetails);
  const [firstText, onChangeFirstText] = useState('');
  const [secondText, onChangeSecondText] = useState('');
  const [optionalText, onChangeOptionalText] = useState('');
  const [selectLabel, setSelectLabel] = useState('');
  const [isEditButtonClicked, setIsEditButtonClicked] =
    useState<boolean>(false);
  const [isdisplayUpdatingToaster, setIsdisplayUpdatingToaster] =
    useState<boolean>(false);
  const [isdisplayRemovingToaster, setIsdisplayRemovingToaster] =
    useState<boolean>(false);
  const [isdisplayWordRemoveAlert, setIsdisplayWordRemoveAlert] =
    useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const date = new Date();

//   const handleDelete = async () => {
//     setIsLoading(true);
//     try {
//       const fetchedData =
//         activeLanguage === 'N3'
//           ? userData?.VocabularyN3List
//           : userData?.VocabularySpanishList;
//       const dataAfterRemove = fetchedData
//         ?.filter((e: any) => e?.Key !== route?.params?.wordDetails?.Key)
//         ?.map((e: any) => ({
//           ...e,
//           Key: e?.Key > route?.params?.wordDetails?.Key ? e?.Key - 1 : e?.Key,
//         }));
//       const updateField =
//         activeLanguage === 'N3' ? 'VocabularyN3List' : 'VocabularySpanishList';
//       const updatedUserData = {
//         ...userData,
//         [updateField]: dataAfterRemove || [],
//       };

//       await firestore()
//         .collection('WordKadoo')
//         .doc('123456789')
//         .set(updatedUserData);
//       setIsdisplayRemovingToaster(true);
//       setTimeout(() => {
//         navigation.goBack();
//       }, 3000);
//       dispatch(fetchUser());
//     } catch (error) {
//       console.log('DetailsWordScreen: handleDelete', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleEditButton = async (key: string) => {
//     setIsLoading(true);
//     try {
//       const fetchedData =
//         activeLanguage === 'N3'
//           ? userData?.VocabularyN3List
//           : userData?.VocabularySpanishList;
//       const dataAfterRemove = fetchedData?.filter((e: any) => e?.Key !== key);
//       const updateField =
//         activeLanguage === 'N3' ? 'VocabularyN3List' : 'VocabularySpanishList';
//       let updatedUserData = {
//         ...userData,
//         [updateField]: [
//           ...(dataAfterRemove || []),
//           {
//             FirstText: firstText,
//             SecondText: secondText,
//             OptionalText: optionalText,
//             Tag: selectLabel,
//             Key: key,
//             Time: `${date?.getDate()}/${date?.getMonth() + 1}/${date
//               ?.getFullYear()
//               .toString()
//               .substr(-2)}`,
//           },
//         ],
//       };
//       updatedUserData?.[updateField]?.sort((a: any, b: any) => a.Key - b.Key);
//       await firestore()
//         .collection('WordKadoo')
//         .doc('123456789')
//         .set(updatedUserData);
//       setIsdisplayUpdatingToaster(true);
//       setIsEditButtonClicked(false);
//       dispatch(fetchUser());
//     } catch (error) {
//       console.log('DetailsWordScreen: Error in updating words', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

  const handleFetchData = async () => {
    // try {
    //   const userDetails: any = await firestore()
    //     .collection('WordKadoo')
    //     .doc('123456789')
    //     .get();
    //   const data = userDetails?.data();
    //   if (data) {
    //     const fetchedData =
    //       activeLanguage === 'N3'
    //         ? data?.VocabularyN3List
    //         : data?.VocabularySpanishList;
    //     const filtered_data = fetchedData?.filter(
    //       (e: any) => e?.Key == route?.params?.wordDetails?.Key,
    //     )?.[0];
    //     setData(filtered_data);
    //     onChangeFirstText(filtered_data?.FirstText);
    //     onChangeSecondText(filtered_data?.SecondText);
    //     onChangeOptionalText(filtered_data?.OptionalText);
    //     setSelectLabel(filtered_data?.Tag);
    //   }
    // } catch (error) {
    //   console.log('DetailsWordScreen: handleFetchData', error);
    // }
  };

  const handlePlayIcon = (firstWord: string, secondWord: string) => {
    Tts.setDefaultLanguage('ja_JP');
    Tts.stop();
    Tts.speak(firstWord);
    Tts.speak(secondWord);
  };

  useFocusEffect(
    useCallback(() => {
      handleFetchData();
    }, [isEditButtonClicked]),
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView
        style={{
          display: 'flex',
          flex: 1,
          backgroundColor: '#F6F2F7',
          margin: 16,
        }}>
        <View style={{gap: 24}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
              <TouchableOpacity
                style={{flexDirection: 'row', alignItems: 'center', gap: 8}}
                onPress={() => navigation.goBack()}>
                <FontAwesomeIcon name="angle-left" size={30} color="#4169e1" />
                <Text style={{fontSize: 20, color: '#4169e1'}}>Back</Text>
              </TouchableOpacity>
            </View>
            {!isEditButtonClicked ? (
              <View
                style={{flexDirection: 'row', gap: 32, alignItems: 'center'}}>
                <FontAwesomeIcon
                  name="edit"
                  size={30}
                  color="#4169e1"
                  onPress={() => setIsEditButtonClicked(true)}
                />
                <FontAwesomeIcon
                  name="trash-o"
                  size={32}
                  color="#4169e1"
                  onPress={() =>
                    // handleDelete(route?.params?.wordDetails?.Key)
                    setIsdisplayWordRemoveAlert(true)
                  }
                />
              </View>
            ) : (
              <View
                style={{flexDirection: 'row', gap: 32, alignItems: 'center'}}>
                <FontAwesomeIcon
                  name="check-square-o"
                  size={30}
                  color="#4169e1"
                  onPress={() =>
                    // handleEditButton(route?.params?.wordDetails?.Key)
                    {}
                  }
                />
                <MaterialIcon
                  name="close"
                  size={36}
                  color="#4169e1"
                  onPress={() => setIsEditButtonClicked(false)}
                />
              </View>
            )}
          </View>
          {!isEditButtonClicked ? (
            <View
              style={{
                gap: 4,
                backgroundColor: 'white',
                borderRadius: 10,
                borderWidth: 1,
                borderColor: '#CACFD2',
                boxShadow: [
                  {
                    offsetX: 10,
                    offsetY: -3,
                    blurRadius: '15px',
                    spreadDistance: '10px',
                    color: 'white',
                    inset: true,
                  },
                ],
              }}>
              <View
                style={{padding: 28, gap: 24}}
                testID="Card-first-word-and-second-word">
                <View
                  style={{
                    alignItems: 'center',
                  }}>
                  <Text style={{fontWeight: 500, fontSize: 24}}>
                    {data?.FirstText}
                  </Text>
                </View>
                <DividerLine
                  ViewStyle={{
                    borderWidth: 0.3,
                    borderColor: '#CACFD2',
                  }}
                />
                <View
                  style={{
                    alignItems: 'center',
                  }}>
                  <Text style={{fontWeight: 500, fontSize: 24}}>
                    {data?.SecondText}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  padding: 28,
                  backgroundColor: '#F4F6F7',
                  alignItems: 'center',
                  borderBottomLeftRadius: 10,
                  borderBottomRightRadius: 10,
                }}
                testID="Card-optional-text">
                <Text style={{fontSize: 36}}>{data?.OptionalText}</Text>
                <FontAwesomeIcon
                  name="volume-up"
                  size={32}
                  color={'#4169e1'}
                  onPress={() =>
                    handlePlayIcon(data?.FirstText, data?.SecondText)
                  }
                  style={{alignSelf: 'flex-end'}}
                />
              </View>
            </View>
          ) : (
            <AddingWordCard
              firstText={firstText}
              onChangeFirstText={onChangeFirstText}
              secondText={secondText}
              onChangeSecondText={onChangeSecondText}
              optionalText={optionalText}
              onChangeOptionalText={onChangeOptionalText}
              selectLabel={selectLabel}
              setSelectLabel={setSelectLabel}
            />
          )}
          <View style={{gap: 8}}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={{fontSize: 20}}>Label</Text>
              <Text style={{fontSize: 20}}>{data?.Tag}</Text>
            </View>
            <DividerLine
              ViewStyle={{
                borderWidth: 0.3,
                borderColor: '#CACFD2',
              }}
            />
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={{fontSize: 20}}>Added on</Text>
              <Text style={{fontSize: 20}}>{data?.Time}</Text>
            </View>
            <DividerLine
              ViewStyle={{
                borderWidth: 0.3,
                borderColor: '#CACFD2',
              }}
            />
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={{fontSize: 20}}>Quiz Score</Text>
              <Text style={{fontSize: 20}}>-</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      {isLoading?<Spinner/>:null}
      <Toaster
        showToaster={isdisplayUpdatingToaster}
        setShowToaster={setIsdisplayUpdatingToaster}
        titleText={'Success'}
        descriptionText={'Word has been modified successfully'}
      />
      <Toaster
        showToaster={isdisplayRemovingToaster}
        setShowToaster={setIsdisplayRemovingToaster}
        titleText={'Success'}
        descriptionText={'Word has been removed successfully'}
      />
      <WordRemoveAlert
        showAlert={isdisplayWordRemoveAlert}
        setShowAlert={setIsdisplayWordRemoveAlert}
        // onConfirm={handleDelete}
        onConfirm={()=>{}}
      />
    </SafeAreaView>
  );
};
export default DetailsWordScreen;
