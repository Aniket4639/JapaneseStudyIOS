import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {GLOBALCOLORS} from '../../../../../globalStyles/GlobalColors';
import {GLOBALSTYLES} from '../../../../../globalStyles/GlobalStyles';
import MaterialIcon from 'react-native-vector-icons/FontAwesome';
const Icon = MaterialIcon as any;

const ConjuctionScreen = ({route, navigation}: any) => {
  const data = route?.params?.value;
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
        {data?.topics?.map((e: any, idx: any) => {
          return (
            <View style={{marginVertical: 16}}>
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
                <Text style={{fontSize: 24}}>{`${idx + 1}. ${e?.title}`}</Text>
                <Text style={{fontSize: 20, paddingLeft: 24}}>
                  {e?.meaning}
                </Text>
              </View>
              <View style={{paddingTop: 12, paddingLeft: 12}}>
                {e?.patterns?.map((e1: any, idx: any) => {
                  return (
                    <>
                      <View
                        style={{
                          flexDirection: 'row',
                          marginVertical: 8,
                          alignItems: 'center',
                          gap: 8,
                        }}>
                        {/* <View
                          style={{
                            width: 10,
                            height: 10,
                            backgroundColor: GLOBALCOLORS.black,
                            borderRadius: 10,
                          }}
                        /> */}
                        <Text style={{fontSize: 18}}>({idx + 1})</Text>
                        <Text style={{fontSize: 18}}>{e1?.pos}</Text>
                      </View>
                      <Text
                        style={{
                          fontSize: 18,
                          paddingLeft: 28,
                          fontWeight: '500',
                        }}>
                        {e1?.formation}
                      </Text>
                    </>
                  );
                })}
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: '500',
                    paddingVertical: 16,
                  }}>
                  Examples
                </Text>
                {e?.entries?.map((e1: any) => {
                  return (
                    <View style={{marginBottom: 32}}>
                      <View
                        style={{
                          flexDirection: 'row',
                          marginBottom: 8,
                          alignItems: 'center',
                          gap: 8,
                        }}>
                        <View
                          style={{
                            width: 10,
                            height: 10,
                            backgroundColor: GLOBALCOLORS.black,
                            borderRadius: 10,
                          }}
                        />
                        <Text
                          style={{
                            fontSize: 20,
                          }}>{`${e1?.pos}, ${e1?.tense}`}</Text>
                      </View>
                      <Text style={{fontSize: 20, paddingLeft: 16}}>
                        {e1?.example?.jp}
                      </Text>
                      <Text
                        style={{
                          fontSize: 16,
                          paddingLeft: 16,
                          color: GLOBALCOLORS.muted_color,
                        }}>
                        {e1?.example?.romaji}
                      </Text>
                      <Text style={{fontSize: 20, paddingLeft: 16, marginBottom: 12}}>
                        {e1?.example?.en}
                      </Text>
                      {e1?.vocabulary?.map((e2: any) => {
                        return (
                            <View style={{paddingLeft:16, paddingVertical:4}}>
                          <View style={{flexDirection:'row', alignItems:'center', gap: 8}}>
                            <View
                              style={{
                                width: 6,
                                height: 6,
                                backgroundColor: GLOBALCOLORS.black,
                                borderRadius: 10,
                              }}
                            />
                            <Text style={{fontSize:16}}>{`${e2?.word}: ${e2?.reading} `}</Text>
                          </View>
                          </View>
                        );
                      })}
                    </View>
                  );
                })}
              </View>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};
export default ConjuctionScreen;
