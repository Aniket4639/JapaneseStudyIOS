import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {GLOBALSTYLES} from '../../../../../globalStyles/GlobalStyles';
import {GLOBALCOLORS} from '../../../../../globalStyles/GlobalColors';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import TranslationTipsData from '../../../../../assests/translationTips/TranslationTipsData.json';
import JapaneseConnectors from '../../../../../assests/translationTips/JapaneseConnectors.json';

// Type assertion to fix TypeScript issue with react-native-vector-icons
const Icon = FontAwesomeIcon as any;

const TranslationLessonsListScreen = ({navigation}: any) => {
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
          Content
        </Text>
        <Text
          style={{
            fontSize: 18,
            paddingLeft: 4,
          }}>
          Basic Translation
        </Text>
        {TranslationTipsData?.map((e: any) => (
          <TouchableOpacity
            style={[
              GLOBALSTYLES.ListCard,
              {
                marginVertical: 6,
                padding: 16,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              },
            ]}
            onPress={() =>
              navigation.navigate('TranslationLesson', {value: e})
            }>
            <View style={{marginRight: 16}}>
              <Text style={{fontSize: 20, color: GLOBALCOLORS.primary_Color}}>
                {`Lesson ${e?.lessonNumber}`}
              </Text>
              <Text style={{fontSize: 16}}>
                {`${e?.japaneseTitle} ${e?.title}`}
              </Text>
            </View>
            <Icon
              name="angle-right"
              size={24}
              color={GLOBALCOLORS.accent_text}
            />
          </TouchableOpacity>
        ))}
        <Text
          style={{
            marginTop: 36,
            fontSize: 18,
            paddingLeft: 4,
          }}>
          Advanced Translation
        </Text>
        {JapaneseConnectors?.map((e: any) => (
          <TouchableOpacity
            style={[
              GLOBALSTYLES.ListCard,
              {
                marginVertical: 6,
                padding: 16,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              },
            ]}
            onPress={() =>
              navigation.navigate('ConjuctionScreen', {value: e})
            }>
            <View style={{marginRight: 16}}>
              <Text style={{fontSize: 20, color: GLOBALCOLORS.primary_Color}}>
                {`Lesson ${e?.lessonNumber}`}
              </Text>
              <Text style={{fontSize: 16}}>
                {`${e?.title}`}
              </Text>
            </View>
            <Icon
              name="angle-right"
              size={24}
              color={GLOBALCOLORS.accent_text}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};
export default TranslationLessonsListScreen;
