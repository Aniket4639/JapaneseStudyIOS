import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import DividerLine from './DividerLine';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {GLOBALCOLORS} from '../globalStyles/GlobalColors';
import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
// import {RootState} from '../redux/store';
const Icon = FontAwesomeIcon as any;

const AddingWordCard = ({
  firstText,
  onChangeFirstText,
  secondText,
  onChangeSecondText,
  optionalText,
  onChangeOptionalText,
  selectLabel,
  setSelectLabel,
}: any) => {
//   const activeLanguage = useSelector(
//     (state: RootState) => state?.languageInfo?.activeLanguage,
//   );

const activeLanguage = 'N3';
  const [selectTag, setSelectTag] = useState<number>(0);

  useEffect(() => {
    switch (selectLabel) {
      case 'None':
        setSelectTag(0);
        return;
      case 'Vocabulary':
        setSelectTag(1);
        return;
      case 'Grammar':
        setSelectTag(2);
        return;
      case 'Katakana':
        setSelectTag(3);
        return;
      case 'Verb':
        setSelectTag(4);
        return;
      default:
        setSelectTag(-1);
        break;
    }
  }, []);
  const tagData = [
    {name: 'None', id: 0},
    {name: 'Vocabulary', id: 1},
    {name: 'Grammar', id: 2},
    {name: 'Katakana', id: 3},
    {name: 'Verb', id: 4},
  ];
  return (
    <View
      style={{
        gap: 4,
        backgroundColor: GLOBALCOLORS.white,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: GLOBALCOLORS.border_Color,
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
      <View style={{gap: 24, paddingHorizontal: 16, paddingVertical: 24}}>
        <View
          style={{
            flexDirection: 'row',
            gap: 12,
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <TextInput
            value={firstText}
            onChangeText={onChangeFirstText}
            placeholder="First text"
            placeholderTextColor={GLOBALCOLORS.placeholder_text_color}
            style={{
              backgroundColor: GLOBALCOLORS.grey,
              borderRadius: 10,
              padding: 8,
              fontSize: 18,
              flex: 1,
              borderWidth: 1,
              borderColor: GLOBALCOLORS.border_Color,
            }}
          />
          <Icon name="book" size={24} />
        </View>
        <DividerLine
          ViewStyle={{
            borderWidth: 0.3,
            borderColor: GLOBALCOLORS.border_Color,
            marginLeft: 32,
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            gap: 12,
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <TextInput
            value={secondText}
            onChangeText={onChangeSecondText}
            placeholder="Second text"
            placeholderTextColor={GLOBALCOLORS.placeholder_text_color}
            style={{
              backgroundColor: GLOBALCOLORS.grey,
              borderRadius: 10,
              padding: 8,
              fontSize: 18,
              flex: 1,
              borderWidth: 1,
              borderColor: GLOBALCOLORS.border_Color,
            }}
          />
          <Icon name="language" size={24} />
        </View>
      </View>
      <View
        style={{
          padding: 24,
          backgroundColor: GLOBALCOLORS.grey,
          flexDirection: 'row',
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
        }}>
        <TextInput
          value={optionalText}
          onChangeText={onChangeOptionalText}
          placeholder="Comment(optional)"
          placeholderTextColor={GLOBALCOLORS.placeholder_text_color}
          multiline={true}
          style={{
            backgroundColor: GLOBALCOLORS.white,
            borderRadius: 5,
            padding: 8,
            fontSize: 18,
            flex: 1,
            textAlignVertical: 'top',
            height: 130,
            alignSelf: 'flex-start',
          }}
        />
      </View>
      {activeLanguage == 'N3' && (
        <>
          <View style={{paddingLeft: 16, paddingTop: 16}}>
            <Text style={{fontSize: 16, fontWeight: '500'}}>
              Label Your Word
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              gap: 12,
              padding: 12,
              flexWrap: 'wrap',
            }}>
            {tagData?.map((e, idx) => {
              return (
                <TouchableOpacity
                  style={{
                    padding: 8,
                    borderWidth: 1,
                    borderRadius: 10,
                    backgroundColor:
                      idx == selectTag
                        ? GLOBALCOLORS.primary_Color
                        : GLOBALCOLORS.grey,
                    borderColor:
                      idx == selectTag
                        ? GLOBALCOLORS.primary_Color
                        : GLOBALCOLORS.border_Color,
                  }}
                  onPress={() => {
                    setSelectTag(e?.id), setSelectLabel(e?.name);
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: idx == selectTag ? GLOBALCOLORS.white : null,
                    }}>
                    {e?.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </>
      )}
    </View>
  );
};
export default AddingWordCard;
