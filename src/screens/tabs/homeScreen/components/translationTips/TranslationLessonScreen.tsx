import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {GLOBALSTYLES} from '../../../../../globalStyles/GlobalStyles';
import {GLOBALCOLORS} from '../../../../../globalStyles/GlobalColors';
import MaterialIcon from 'react-native-vector-icons/FontAwesome';
const Icon = MaterialIcon as any;

const TranslationLessonScreen = ({route, navigation}: any) => {
  const lessonData = route?.params?.value;

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
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
          }}
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
        <Text
          style={{
            alignSelf: 'center',
            fontSize: 24,
            fontWeight: '600',
            marginBottom: 16,
          }}>
          {`${lessonData?.japaneseTitle} ${lessonData?.title}`}
        </Text>
        {lessonData?.data?.map((e: any, index: string) => (
          <View style={{marginBottom: 54, gap: 12}}>
            <View
              style={[
                GLOBALSTYLES.card,
                {
                  backgroundColor: GLOBALCOLORS.grey,
                  borderColor: GLOBALCOLORS.border_Color,
                  borderWidth: 1,
                  borderRadius: 15,
                  gap: 8,
                },
              ]}>
              <View style={{flexDirection: 'row', marginRight: 16}}>
                <Text
                  style={{
                    fontSize: 24,
                  }}>
                  {`${index + 1}. `}
                </Text>
                <Text
                  style={{
                    fontSize: 24,
                  }}>
                  {`${e?.japaneseText}`}
                </Text>
              </View>
              <Text
                style={{
                  fontSize: 14,
                  paddingLeft: 28,
                }}>
                {e?.hiraganaText}
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  paddingLeft: 28,
                }}>
                {e?.englishText}
              </Text>
            </View>
            {e?.vocabularyText?.map((e1: any) => {
              const [kanji, reading] = Object.entries(e1)[0];
              return (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 8,
                    paddingLeft: 16,
                  }}>
                  <View
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: 20,
                      backgroundColor: GLOBALCOLORS.black,
                    }}
                  />
                  <Text
                    style={{
                      fontSize: 18,
                    }}>
                    {' '}
                    {`${kanji}: ${reading}`}
                  </Text>
                </View>
              );
            })}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};
export default TranslationLessonScreen;
