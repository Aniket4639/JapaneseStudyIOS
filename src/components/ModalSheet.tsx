import {
  BackHandler,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ViewStyle, StyleProp} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {GLOBALSTYLES} from '../globalStyles/GlobalStyles';
import {GLOBALCOLORS} from '../globalStyles/GlobalColors';
import {ScrollView} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

import MaterialIcon from 'react-native-vector-icons/FontAwesome';
const Icon = MaterialIcon as any;

interface ModalSheetComponent {
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
  totalWords?: number;
  ViewStyle?: StyleProp<ViewStyle>;
  children?: any;
  title?: string;
  onClose: any;
  closeIconVisible?: boolean;
}

const ModalSheet = ({
  ViewStyle,
  modalVisible,
  setModalVisible,
  children,
  title,
  onClose,
  closeIconVisible = true,
}: ModalSheetComponent) => {
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        if (modalVisible) {
          setModalVisible(false);
          return true;
        }
        return false;
      };

      const sub = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress,
      );
      return () => sub.remove();
    }, [modalVisible]),
  );

  const handleBackTap = () => {
    setModalVisible(false);
  };

  return (
    <>
      {modalVisible ? (
        <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
          <Pressable style={styles.backdrop} onPress={handleBackTap} />
          <ScrollView
            style={[
              GLOBALSTYLES.card,
              styles.sheet,
              {
                backgroundColor: GLOBALCOLORS.white,
                borderColor: GLOBALCOLORS.alert_border,
              },
              {
                paddingHorizontal: 24,
                backgroundColor: GLOBALCOLORS.white,
                position: 'absolute',
                borderTopLeftRadius: 16,
                borderTopRightRadius: 16,
                right: 0,
                left: 0,
                bottom: 0,
                borderWidth: 1,
                borderColor: GLOBALCOLORS.alert_border,
                maxHeight: '90%',
              },
            ]}>
            {title ? (
              <View style={{alignItems: 'center', paddingBottom: 12, gap: 8}}>
                <Text style={{fontSize: 24}}>{title}</Text>
              </View>
            ) : null}
            {closeIconVisible ? (
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  alignSelf: 'flex-end',
                  padding: 4,
                  backgroundColor: GLOBALCOLORS.light_grey,
                  borderRadius: 50,
                }}
                onPress={() => {
                  setModalVisible(false);
                  onClose && onClose();
                }}>
<Icon name="times" size={24} color="black" />
              </TouchableOpacity>
            ) : null}
            {children}
          </ScrollView>
        </View>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.45)',
    zIndex: 1,
    elevation: 1, // Android
  },
  sheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    maxHeight: '90%',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderWidth: 1,
    paddingHorizontal: 24,
    zIndex: 2,
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 12,
  },
});

export default ModalSheet;
