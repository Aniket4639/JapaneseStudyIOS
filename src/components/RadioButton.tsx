import {Text, TouchableOpacity, View} from 'react-native';
import {ViewStyle, StyleProp} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import DividerLine from './DividerLine';
import {useEffect, useState} from 'react';
import {GLOBALCOLORS} from '../globalStyles/GlobalColors';
interface RadioButtonComponent {
  isSelected: boolean;
  ViewStyle?: StyleProp<ViewStyle>;
  label: string;
  id: number;
  radioButtonSelected: number;
  setRadioButtonSelected: (e: number) => void;
}

const RadioButton = ({
  ViewStyle,
  label,
  id,
  radioButtonSelected,
  setRadioButtonSelected,
}: RadioButtonComponent) => {
  const [isSelected, setIsSelected] = useState<boolean>(false);
  useEffect(() => {
    setIsSelected(id === radioButtonSelected);
  }, [radioButtonSelected]);

  return (
    <TouchableOpacity
      style={{flexDirection: 'row', gap: 12, alignItems: 'center'}}
      onPress={() => setRadioButtonSelected(id)}>
      <View
        style={{
          width: 26,
          height: 26,
          borderWidth: 3,
          borderRadius: 24,
          borderColor: isSelected
            ? GLOBALCOLORS.primary_Color
            : GLOBALCOLORS.muted_Color,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {isSelected && (
          <View
            style={{
              width: 12,
              height: 12,
              backgroundColor: isSelected
                ? GLOBALCOLORS.primary_Color
                : GLOBALCOLORS.muted_Color,
              borderRadius: 24,
            }}
          />
        )}
      </View>
      <Text style={{fontSize: 22}}>{label}</Text>
    </TouchableOpacity>
  );
};
export default RadioButton;
