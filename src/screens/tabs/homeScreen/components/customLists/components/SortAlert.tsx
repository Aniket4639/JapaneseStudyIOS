import { Text, TouchableOpacity, View} from 'react-native';
import {ViewStyle, StyleProp} from 'react-native';
import React, {useEffect, useState} from 'react';
import {GLOBALCOLORS} from '../../../../../..//globalStyles/GlobalColors';
import Alert from '../../../../../../components/Alert';
import RadioButton from '../../../../../../components/RadioButton';
interface SortAlertComponent {
  sortData: string;
  setSortData: (value: string) => void;
  ViewStyle?: StyleProp<ViewStyle>;
  isDisplaySortAlert: boolean;
  setIsDisplaySortAlert: (e: boolean) => void;
}
const SortAlert = ({
  sortData,
  setSortData,
  isDisplaySortAlert,
  setIsDisplaySortAlert,
}: SortAlertComponent) => {
  const [radioButtonSelected, setRadioButtonSelected] = useState<number>(0);

  useEffect(() => {
    if (sortData == 'EN_ASC') {
      return setRadioButtonSelected(0);
    } else if (sortData == 'EN_DESC') {
      return setRadioButtonSelected(1);
    } else if (sortData == 'JA_ASC') {
      return setRadioButtonSelected(2);
    } else if (sortData == 'JA_DESC') {
      return setRadioButtonSelected(3);
    } else {
      return setRadioButtonSelected(-1);
    }
  }, [sortData]);

  const data = [
    {id: 0, label: 'A → Z (English)', value: 'EN_ASC'},
    {id: 1, label: 'Z → A (English)', value: 'EN_DESC'},
    {id: 2, label: 'あ → ん (Japanese)', value: 'JA_ASC'},
    {id: 3, label: 'ん → あ (Japanese)', value: 'JA_DESC'},
  ];

  const getSortedStatus = (radioButtonSelected: number) => {
    if (radioButtonSelected == 0) {
      return setSortData('EN_ASC');
    } else if (radioButtonSelected == 1) {
      return setSortData('EN_DESC');
    } else if (radioButtonSelected == 2) {
      return setSortData('JA_ASC');
    } else if (radioButtonSelected == 3) {
      return setSortData('JA_DESC');
    }
  };

  return (
    <Alert
      alertVisible={isDisplaySortAlert}
      setAlertVisible={setIsDisplaySortAlert}
      ViewStyle={{marginHorizontal: 24}}>
      <View
        style={{
          justifyContent: 'center',
          paddingTop: 8,
        }}>
        <Text style={{fontSize: 24, alignSelf: 'center'}}>
          Sort by Category
        </Text>
        <View style={{gap: 12, padding: 12, marginVertical: 12}}>
          {data.map((e, key) => {
            return (
              <RadioButton
                isSelected={false}
                label={e?.label}
                id={e?.id}
                radioButtonSelected={radioButtonSelected}
                setRadioButtonSelected={setRadioButtonSelected}
              />
            );
          })}
        </View>
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
            onPress={() => setIsDisplaySortAlert(false)}>
            <Text
              style={{
                fontSize: 22,
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
              getSortedStatus(radioButtonSelected);
              setIsDisplaySortAlert(false);
            }}>
            <Text
              style={{
                fontSize: 22,
                color: GLOBALCOLORS.primary_Color,
                fontWeight: '500',
              }}>
              Proceed
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Alert>
  );
};
export default SortAlert;
