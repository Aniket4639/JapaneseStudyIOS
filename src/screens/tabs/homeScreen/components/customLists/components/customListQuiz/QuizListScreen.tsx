import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import {getQuizQuestionList} from './hooks/getQuizQuestionList';
import {useEffect, useState} from 'react';
import {GLOBALCOLORS} from '../../../../../../../globalStyles/GlobalColors';
import Spinner from '../../../../../../../components/Spinner';
import {GLOBALSTYLES} from '../../../../../../../globalStyles/GlobalStyles';

const FontAwesomeIcon = FontAwesomeIcons as any

interface QuestionState {
  question: string;
  answer: string;
  userAnswer: string;
}
const QuizListScreen = ({navigation}: any) => {
  // initial 10 objects

  const [qaList, setQaList] = useState<QuestionState[]>(
    Array(10).fill({question: '', answer: '', userAnswer: ''}),
  );
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectOption, setSelectOption] = useState(-1);
  const [userOption, setUserOption] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {questionData, randomOptionsData} = getQuizQuestionList();

  useEffect(() => {
    setQaList(prev => {
      const updated = [...prev];
      updated[questionIndex] = {
        ...updated[questionIndex],
        ['question']: questionData?.[questionIndex]?.FirstText,
        ['answer']: questionData?.[questionIndex]?.SecondText,
      };
      return updated;
    });
  }, [questionIndex, questionData]);

  useEffect(() => {
    //setSelectOption
  }, [questionIndex]);

  const handlePrevButton = (index: number) => {
    setQuestionIndex(prev => prev - 1);
    setSelectOption(-1);
  };

  const handleNextButton = (userOption: string) => {
    setQaList(prev => {
      const updated = [...prev];
      updated[questionIndex] = {
        ...updated[questionIndex],
        ['userAnswer']: userOption,
      };
      return updated;
    });
    setQuestionIndex(prev => prev + 1);
    setSelectOption(-1);
    setUserOption('');
  };

  const handleSubmitButton = (userOption: string) => {
    const submitData = qaList.map((item, i) =>
      i === questionIndex ? {...item, userAnswer: userOption} : item,
    );

    setQaList(submitData);
    setSelectOption(-1);
    setIsLoading(true);
    setTimeout(() => {
      navigation.navigate('QuizSummaryListScreen', {
        data: submitData,
        navigation: navigation,
      });
      setIsLoading(false);
    }, 500);
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView
        overScrollMode="never"
        bounces={false} //for ios
        style={{
          display: 'flex',
          flex: 1,
          backgroundColor: GLOBALCOLORS.background_Color,
          margin: 16,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
          <TouchableOpacity
            style={{flexDirection: 'row', alignItems: 'center', gap: 8}}
            onPress={() => navigation.goBack()}>
            <FontAwesomeIcon
              name="angle-left"
              size={30}
              color={GLOBALCOLORS.primary_Color}
            />
            <Text style={{fontSize: 20, color: GLOBALCOLORS.primary_Color}}>
              Back
            </Text>
          </TouchableOpacity>
        </View>
        {questionData?.map((e: any, index: any) => {
          return (
            <>
              {index == questionIndex ? (
                <View>
                  <View style={{alignItems: 'center'}}>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: '500',
                      }}>{`Question ${index + 1} of ${
                      questionData.length
                    }`}</Text>
                  </View>
                  <View
                    style={{
                      marginVertical: 20,
                      marginHorizontal: 24,
                      borderRadius: 10,
                      height: 6,
                      backgroundColor: GLOBALCOLORS.border_Color,
                    }}>
                    <View
                      style={{
                        borderColor: GLOBALCOLORS.primary_Color,
                        borderWidth: 3,
                        borderRadius: 10,
                        width: `${
                          ((questionIndex + 1) / questionData.length) * 100
                        }%`,
                      }}
                    />
                  </View>
                  <View
                    style={{
                      backgroundColor: GLOBALCOLORS.white,
                      borderRadius: 16,
                      marginTop: 12,
                      marginHorizontal: 12,
                    }}>
                    <View
                      style={{
                        padding: 16,
                        alignItems: 'center',
                        marginBottom: 24,
                      }}>
                      <Text
                        style={{
                          fontSize: 22,
                        }}>{`What is the meaning of ${e?.FirstText} ?`}</Text>
                    </View>
                    {randomOptionsData?.[index]?.map((e1: any, idx: any) => {
                      return (
                        <TouchableOpacity
                          style={{
                            borderWidth: 1,
                            borderColor:
                              idx == selectOption ||
                              (qaList?.[questionIndex]?.userAnswer ==
                                e1?.SecondText &&
                                selectOption == -1)
                                ? GLOBALCOLORS.primary_Color
                                : GLOBALCOLORS.border_Color,
                            padding: 16,
                            borderRadius: 16,
                            alignItems: 'center',
                            marginBottom: 16,
                            marginHorizontal: 24,
                            backgroundColor:
                              idx == selectOption ||
                              (qaList?.[questionIndex]?.userAnswer ==
                                e1?.SecondText &&
                                selectOption == -1)
                                ? GLOBALCOLORS.primary_Color
                                : GLOBALCOLORS.white,
                          }}
                          onPress={() => {
                            setSelectOption(idx);
                            setUserOption(e1?.SecondText);
                          }}>
                          <Text
                            style={{
                              fontSize: 18,
                              color:
                                idx == selectOption ||
                                (qaList?.[questionIndex]?.userAnswer ==
                                  e1?.SecondText &&
                                  selectOption == -1)
                                  ? GLOBALCOLORS.white
                                  : null,
                            }}>
                            {e1?.SecondText}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>
              ) : null}
            </>
          );
        })}
        {/* <View style={{ gap: 50}}> */}
        {questionIndex != questionData.length - 1 ? (
          <TouchableOpacity
            style={{
              backgroundColor: GLOBALCOLORS.primary_Color,
              marginHorizontal: 32,
              paddingVertical: 12,
              borderRadius: 10,
              marginTop: 24,
              opacity:
                qaList?.[questionIndex]?.userAnswer || selectOption != -1
                  ? 1
                  : 0.3,
              pointerEvents:
                qaList?.[questionIndex]?.userAnswer || selectOption != -1
                  ? 'auto'
                  : 'none',
            }}
            onPress={() => handleNextButton(userOption)}>
            <Text
              style={{
                color: GLOBALCOLORS.white,
                fontSize: 20,
                alignSelf: 'center',
              }}>
              Next
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{
              backgroundColor: GLOBALCOLORS.primary_Color,
              paddingVertical: 12,
              paddingHorizontal: 24,
              borderRadius: 10,
              marginTop: 24,
              opacity:
                qaList?.[questionIndex]?.userAnswer || selectOption != -1
                  ? 1
                  : 0.3,
              pointerEvents:
                qaList?.[questionIndex]?.userAnswer || selectOption != -1
                  ? 'auto'
                  : 'none',
            }}
            onPress={() => handleSubmitButton(userOption)}>
            <Text style={{color: GLOBALCOLORS.white, fontSize: 18}}>
              Submit
            </Text>
          </TouchableOpacity>
        )}
        {questionIndex != 0 ? (
          <TouchableOpacity
            style={{
              paddingVertical: 12,
              borderRadius: 10,
            }}
            onPress={() => handlePrevButton(questionIndex)}>
            <Text
              style={{
                color: GLOBALCOLORS.primary_Color,
                fontSize: 20,
                alignSelf: 'center',
                fontWeight: '500',
              }}>
              Prev
            </Text>
          </TouchableOpacity>
        ) : null}
        {/* </View> */}
      </ScrollView>
      {isLoading ? <Spinner /> : null}
    </SafeAreaView>
  );
};
export default QuizListScreen;
