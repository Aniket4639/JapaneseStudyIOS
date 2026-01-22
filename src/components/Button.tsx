import {Text, TouchableOpacity, View} from 'react-native';
import {ViewStyle, StyleProp} from 'react-native';
import React, {useState} from 'react';
import {GLOBALCOLORS} from '../globalStyles/GlobalColors';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
interface ButtonComponent {
  text: string;
  ViewStyle?: StyleProp<ViewStyle>;
  onClickProceedButton?: any;
  disabled?: boolean;
}

const Button = ({
  ViewStyle,
  text,
  onClickProceedButton,
  disabled,
}: ButtonComponent) => {
  return (
    <TouchableOpacity
      style={{
        borderWidth: 2,
        borderColor: GLOBALCOLORS.primary_Color,
        padding: 12,
        borderRadius: 16,
        alignItems: 'center',
        marginVertical: 6,
        opacity: disabled ? 0.3 : 1,
        pointerEvents: disabled ? 'none' : 'auto',
      }}
      onPress={() => {
        if (!disabled) {
          onClickProceedButton();
        } else {
          null;
        }
      }}>
      <Text
        style={{
          fontSize: 24,
          color: GLOBALCOLORS.primary_Color,
          fontWeight: '700',
        }}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};
export default Button;
