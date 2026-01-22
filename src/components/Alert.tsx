import React, {useCallback} from 'react';
import {
  BackHandler,
  Pressable,
  StyleSheet,
  View,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {GLOBALSTYLES} from '../globalStyles/GlobalStyles';
import {GLOBALCOLORS} from '../globalStyles/GlobalColors';
import {useFocusEffect} from '@react-navigation/native';

interface AlertComponent {
  alertVisible: boolean;
  setAlertVisible: (value: boolean) => void;
  ViewStyle?: StyleProp<ViewStyle>; // renamed from ViewStyle
  children?: React.ReactNode;
  navigation?: any;
}

const Alert = ({
  ViewStyle,
  alertVisible,
  setAlertVisible,
  navigation,
  children,
}: AlertComponent) => {
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        if (alertVisible) {
          setAlertVisible(false);
          return true;
        }
        return false;
      };

      const sub = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress,
      );
      return () => sub.remove();
    }, [alertVisible, setAlertVisible]),
  );

  const handleBackTap = () => {
    setAlertVisible(false);
  };

  if (!alertVisible) return null;

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
      <Pressable style={styles.backdrop} onPress={handleBackTap} />
      <View style={styles.centeredWrapper}>
        <View
          style={[
            GLOBALSTYLES.card,
            styles.alertCard,
            ViewStyle, // apply custom styles from props
          ]}>
          {children}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.45)',
    zIndex: 1,
  },
  centeredWrapper: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  alertCard: {
    backgroundColor: GLOBALCOLORS.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: GLOBALCOLORS.alert_border,
    maxHeight: 400,
    width: '90%', // keep some margin from sides
    padding: 16,
  },
});

export default Alert;
