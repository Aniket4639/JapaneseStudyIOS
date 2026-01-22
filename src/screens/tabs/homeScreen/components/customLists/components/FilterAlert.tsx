import {Text, TouchableOpacity, View} from 'react-native';
import {ViewStyle, StyleProp} from 'react-native';
import React, {useEffect, useState} from 'react';
import {GLOBALCOLORS} from '../../../../../..//globalStyles/GlobalColors';
import Alert from '../../../../../../components/Alert';
import RadioButton from '../../../../../../components/RadioButton';

interface FilterAlertComponent {
  filterData: string;
  setFilterData: (value: string) => void;
  ViewStyle?: StyleProp<ViewStyle>;
  isDisplayFilterAlert: boolean;
  setIsDisplayFilterAlert: (e: boolean) => void;
}
const FilterAlert = ({
  filterData,
  setFilterData,
  isDisplayFilterAlert,
  setIsDisplayFilterAlert,
}: FilterAlertComponent) => {
  const [radioButtonSelected, setRadioButtonSelected] = useState<number>(0);
  useEffect(() => {
    if (filterData == 'All') {
      return setRadioButtonSelected(0);
    } else if (filterData == 'Vocabulary') {
      return setRadioButtonSelected(1);
    } else if (filterData == 'Grammar') {
      return setRadioButtonSelected(2);
    } else if (filterData == 'Verb') {
      return setRadioButtonSelected(3);
    } else if (filterData == 'Katakana') {
      return setRadioButtonSelected(4);
    }
  }, [filterData]);

  const data = [
    {id: 0, label: 'All'},
    {id: 1, label: 'Vocabulary'},
    {id: 2, label: 'Grammar'},
    {id: 3, label: 'Verb'},
    {id: 4, label: 'Katakana'},
  ];

  const getFilteredStatus = (radioButtonSelected: number) => {
    if (radioButtonSelected == 0) {
      return setFilterData('All');
    } else if (radioButtonSelected == 1) {
      return setFilterData('Vocabulary');
    } else if (radioButtonSelected == 2) {
      return setFilterData('Grammar');
    } else if (radioButtonSelected == 3) {
      return setFilterData('Verb');
    } else if (radioButtonSelected == 4) {
      return setFilterData('Katakana');
    }
  };

  return (
    <Alert
      alertVisible={isDisplayFilterAlert}
      setAlertVisible={setIsDisplayFilterAlert}
      ViewStyle={{marginHorizontal: 24}}>
      <View
        style={{
          justifyContent: 'center',
          paddingTop: 8,
        }}>
        <Text style={{fontSize: 24, alignSelf: 'center'}}>
          Filter by Category
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
            onPress={() => setIsDisplayFilterAlert(false)}>
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
              getFilteredStatus(radioButtonSelected);
              setIsDisplayFilterAlert(false);
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
export default FilterAlert;
