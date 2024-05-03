import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Search from "../screens/Search";
import Filter from "../screens/Filter";

const Stack = createStackNavigator();

const SearchNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="SearchScreen">
      <Stack.Screen
        name="SearchScreen"
        component={Search}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="FilterScreen"
        component={Filter}
        options={{
          title: "Tìm kiếm phòng trọ",
        }}
      />
    </Stack.Navigator>
  );
};

export default SearchNavigator;
