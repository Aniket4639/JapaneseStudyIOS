import {Text, TouchableOpacity, View} from 'react-native';
import {ViewStyle, StyleProp} from 'react-native';
import {GLOBALCOLORS} from '../globalStyles/GlobalColors';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import DividerLine from './DividerLine';

// Type assertion to fix TypeScript issue with react-native-vector-icons
const Icon = MaterialIcon as any;
interface ListViewScreen {
  navigation: any;
  ViewStyle?: StyleProp<ViewStyle>;
  data: any;
}

const ListView = ({ViewStyle, navigation, data}: ListViewScreen) => {
  return (
    <View
      style={{
        backgroundColor: GLOBALCOLORS.white,
        borderRadius: 10,
        paddingHorizontal: 16,
      }}>
      {data?.map((e: any, key: any) => {
        return (
          <>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                gap: 16,
                alignItems: 'center',
              }}
              onPress={() => {
                if (e.navigation) {
                  navigation.navigate(e.navigation);
                } else if (e.state) {
                  e.state(true);
                }
              }}>
              <Icon name={e?.icon} size={24} />
              <View style={{flexDirection: 'column', flex: 1}}>
                <Text
                  style={{
                    color: GLOBALCOLORS.primary_Color,
                    fontSize: 18,
                    paddingVertical: 12,
                  }}>
                  {e?.name}
                </Text>
                {data.length - 1 !== key ? (
                  <DividerLine
                    ViewStyle={{borderWidth: 0.5, borderColor: '#CACFD2'}}
                  />
                ) : null}
              </View>
            </TouchableOpacity>
          </>
        );
      })}
    </View>
  );
};
export default ListView;
