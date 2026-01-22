import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {GLOBALCOLORS} from '../../globalStyles/GlobalColors';
import Alert from '../../components/Alert';
import RadioButton from '../../components/RadioButton';
interface WordRemoveAlertComponent {
  showAlert: boolean;
  setShowAlert: (e: boolean) => void;
  removingWord?: string;
  navigation?: any;
  onConfirm: () => void;
}
const WordRemoveAlert = ({
  showAlert,
  setShowAlert,
  removingWord,
  onConfirm,
  navigation,
}: WordRemoveAlertComponent) => {
  return (
    <Alert
      alertVisible={showAlert}
      setAlertVisible={setShowAlert}
      ViewStyle={{
        marginHorizontal: 8,
      }}>
      <View
        style={{
          justifyContent: 'center',
          paddingTop: 24,
        }}>
        <Text style={{fontSize: 20, alignSelf: 'center'}}>
          Are you want to delete this word?
        </Text>
        <Text style={{fontSize: 24, alignSelf: 'center'}}>{removingWord}</Text>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={{
              flex: 1 / 2,
              alignItems: 'center',
              padding: 16,
              borderTopWidth: 1,
              borderColor: GLOBALCOLORS.border_Color,
              marginLeft: -16,
              marginBottom: -16,
            }}
            onPress={() => setShowAlert(false)}>
            <Text
              style={{
                fontSize: 20,
                color: GLOBALCOLORS.muted_Color,
                fontWeight: '500',
              }}>
              Cancel
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 1 / 2,
              alignItems: 'center',
              padding: 16,
              borderTopWidth: 1,
              borderLeftWidth: 1,
              borderColor: GLOBALCOLORS.border_Color,
              marginRight: -16,
              marginBottom: -16,
            }}
            onPress={() => {
              setShowAlert(false);
              onConfirm();
            }}>
            <Text
              style={{
                fontSize: 20,
                color: GLOBALCOLORS.primary_Color,
                fontWeight: '500',
              }}>
              Delete
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Alert>
  );
};
export default WordRemoveAlert;
