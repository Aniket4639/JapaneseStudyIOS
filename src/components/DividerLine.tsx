import { View } from 'react-native';
import { ViewStyle, StyleProp } from 'react-native';
interface DividerLineScreen {
  borderWidth?: number;
  borderColor?: string;
  padding?: number;
  ViewStyle?: StyleProp<ViewStyle>;
}

const DividerLine = ({ ViewStyle }: DividerLineScreen) => {
  return (
    <View style={[{ borderWidth: 0.3, borderColor: '#CACFD2' }, ViewStyle]} />
  );
};
export default DividerLine;
