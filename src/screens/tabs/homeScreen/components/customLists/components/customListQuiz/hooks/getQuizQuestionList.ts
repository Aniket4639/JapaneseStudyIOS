import {useFocusEffect} from '@react-navigation/native';
import {useCallback, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import userInfoData from '../../../../../../../../../data/userInfo.json'
// import {RootState} from '../../../../../../../../redux/store';

export const getQuizQuestionList = () => {
//   const userData = useSelector((state: RootState) => state?.userInfo?.userData);
//   const activeLanguage = useSelector(
//     (state: RootState) => state?.languageInfo?.activeLanguage,
//   );
//   const vocabularyDataA =
//     activeLanguage === 'N3'
//       ? userData?.VocabularyN3List
//       : userData?.VocabularySpanishList;
const vocabularyDataA = userInfoData.VocabularyN3List;

  const [temp, setTemp] = useState(vocabularyDataA);
  const [questionData, setQuestionData] = useState<any>([]);
  const [randomOptionsData, setRandomOptionsData] = useState<any>([]);

  const handleFetchData = async () => {
    
    if (!vocabularyDataA || vocabularyDataA.length === 0) {
      console.log('No vocabulary data available');
      return;
    }
    
    let questionContainingKeys: any = [];
    let totalRandomQuestions = [...vocabularyDataA]
      .sort(() => Math.random() - 0.5)
      .slice(0, 10);

    totalRandomQuestions?.forEach((e: any) => {
      questionContainingKeys.push(e?.Key);
    });
    let totalRandomOptions = temp?.filter(
      (e: any) => !questionContainingKeys.includes(e?.Key),
    );
    totalRandomOptions = totalRandomOptions
      .sort(() => Math.random() - 0.5)
      .slice(0, totalRandomQuestions.length * 3);
    let shuffledOptionsArray: any = [];
    totalRandomQuestions.forEach?.((item: any, index: any) => {
      const random_data = totalRandomOptions?.slice(index * 3, index * 3 + 3);
      const options = [item, ...random_data]?.sort(() => Math.random() - 0.5);
      shuffledOptionsArray.push(options);
    });
    setQuestionData(totalRandomQuestions);
    setRandomOptionsData(shuffledOptionsArray);
  };

  useEffect(()=>{
    handleFetchData();
  },[vocabularyDataA])

  return {questionData, randomOptionsData};
};
