import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// const data = [
//   { label: "Item 1", value: "1" },
//   { label: "Item 2", value: "2" },
//   { label: "Item 3", value: "3" },
//   { label: "Item 4", value: "4" },
//   { label: "Item 5", value: "5" },
//   { label: "Item 6", value: "6" },
//   { label: "Item 7", value: "7" },
//   { label: "Item 8", value: "8" },
// ];

const DropDown = ({
  inputLabel,
  materialCommunityIcons,
  data,
  mapValue,
  mapLabel,
  onValueChange,
  isDisabled,
  initVal,
}) => {
  const [value, setValue] = useState(initVal);
  const [isFocus, setIsFocus] = useState(false);

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: "blue" }]}>
          {inputLabel}
        </Text>
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      {renderLabel()}
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        search
        maxHeight={300}
        labelField={mapLabel}
        valueField={mapValue}
        placeholder={!isFocus ? inputLabel : "..."}
        searchPlaceholder="Nhập tên thành phố muốn tìm..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setValue(item[`${mapValue}`]);
          setIsFocus(false);
          onValueChange(item);
        }}
        renderLeftIcon={() => (
          <MaterialCommunityIcons
            style={styles.icon}
            color={isFocus ? "blue" : "black"}
            name={materialCommunityIcons}
            size={20}
          />
        )}
        disable={isDisabled}
      />
    </View>
  );
};

export default DropDown;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingBottom: 10,
  },
  dropdown: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 10,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 8,
    top: -8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 12,
  },
  placeholderStyle: {
    fontSize: 14,
  },
  selectedTextStyle: {
    fontSize: 14,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 14,
  },
});
