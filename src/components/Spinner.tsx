import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import {GLOBALCOLORS} from '../globalStyles/GlobalColors';

const Spinner = () => {
  return (
    <View
      style={{
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <ActivityIndicator size={54} color={GLOBALCOLORS.primary_Color} />
    </View>
  );
};
export default Spinner;
