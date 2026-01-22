import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {getQuizQuestionList} from './hooks/getQuizQuestionList';
import {useEffect, useState} from 'react';
import {GLOBALCOLORS} from '../../../../../../../globalStyles/GlobalColors';

const MaterialIcon = MaterialIcons as any;

const QuizSummaryListScreen = ({navigation, route}: any) => {
  const [correctAnswerCount, setCorrectAnswerCount] = useState<number>(0);
  const answeredData = route?.params?.data;

  useEffect(() => {
    answeredData?.forEach((element: any) => {
      const checkAnswer = element?.answer == element?.userAnswer;
      return checkAnswer ? setCorrectAnswerCount(prev => prev + 1) : null;
    });
  }, [answeredData]);
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
        <View style={{alignItems: 'center', marginBottom: 24}}>
          <Text style={{fontSize: 24}}>Summary of the quiz</Text>
          <Text
            style={{
              fontSize: 16,
              alignSelf: 'flex-end',
              marginRight: 16,
              marginTop: 12,
            }}>{`Total correct- ${correctAnswerCount}/${answeredData.length}`}</Text>
        </View>
        {answeredData?.map((e: any, idx: string) => {
          return (
            <View style={{gap: 8, marginBottom: 16}}>
              <Text style={{fontSize: 18}}>{`Q${
                idx + 1
              }. What is the meaning of ${e?.question} ?`}</Text>
              <View
                style={{flexDirection: 'row', alignItems: 'center', gap: 4}}>
                <Text style={{fontSize: 18, paddingLeft: 32}}>
                  {e?.userAnswer}
                </Text>
                <MaterialIcon
                  name={e?.answer == e?.userAnswer ? 'check' : 'close'}
                  size={24}
                  color={e?.answer == e?.userAnswer ? 'green' : 'red'}
                />
              </View>
              {e?.answer != e?.userAnswer ? (
                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{
                      fontSize: 18,
                      paddingLeft: 32,
                      flexWrap: 'wrap',
                    }}>
                    {`correct answer- `}
                  </Text>
                  <Text
                    style={{fontSize: 18, fontWeight: '700', flexShrink: 1}}>
                    {` ${e?.answer}`}
                  </Text>
                </View>
              ) : null}
            </View>
          );
        })}
        <TouchableOpacity
          style={{
            backgroundColor: GLOBALCOLORS.primary_Color,
            padding: 12,
            alignSelf: 'center',
            marginVertical: 32,
            borderRadius: 10
          }}
          onPress={() => navigation.navigate('TabScreen')}>
          <Text style={{fontSize: 20, color: GLOBALCOLORS.white}}>
            Go to Home Screen
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};
export default QuizSummaryListScreen;
