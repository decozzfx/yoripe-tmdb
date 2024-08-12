import React, { useEffect } from "react";
import { StatusBar, StyleSheet, ColorValue, LogBox } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Icon from "react-native-vector-icons/Ionicons";

// Hook for theme change (Light/Dark Mode)
import { useTheme } from "../themes/useTheme";

// Screens
import Movies from "../screens/Movies";
import Settings from "../screens/Settings";
import Search from "../screens/Search";
import WishList from "../screens/WishList";
import Detail from "../screens/Detail";

// Icons for Bottom Tab Navigation

const moviesIcon = ({ color }: { color: ColorValue | number }) => (
  <Icon name="md-home" size={24} color={color} />
);

const settingsIcon = ({ color }: { color: ColorValue | number }) => (
  <Icon name="settings-sharp" size={24} color={color} />
);

const wishListIcon = ({ color }: { color: ColorValue | number }) => (
  <Icon name="heart-sharp" size={24} color={color} />
);

const searchIcon = ({ color }: { color: ColorValue | number }) => (
  <Icon name="search-sharp" size={24} color={color} />
);

// -- stack screen

const Stack = createNativeStackNavigator();

const MoviesStackScreen = () => {
  const { theme } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: theme.cardBg },
        headerTitleAlign: "center",
        headerTitleStyle: { color: theme.color, fontSize: 20 },
      }}>
      <Stack.Screen name="TMBD Movies" component={Movies} />
      <Stack.Screen name="Details" component={Detail} />
    </Stack.Navigator>
  );
};

const SearchStackScreen = () => {
  const { theme } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: theme.cardBg },
        headerTitleAlign: "center",
        headerTitleStyle: { color: theme.color, fontSize: 20 },
      }}>
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="Details" component={Detail} />
    </Stack.Navigator>
  );
};

const WishListStackScreen = () => {
  const { theme } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: theme.cardBg },
        headerTitleAlign: "center",
        headerTitleStyle: { color: theme.color, fontSize: 20 },
      }}>
      <Stack.Screen name="Wishlist" component={WishList} />
      <Stack.Screen name="Details" component={Detail} />
    </Stack.Navigator>
  );
};

const Tab = createBottomTabNavigator();

const RootNavigation = () => {
  const { theme } = useTheme();
  useEffect(() => {
    LogBox.ignoreLogs([
      "In React 18, SSRProvider is not necessary and is a noop. You can remove it from your app.",
    ]);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        animated
        backgroundColor={theme.cardBg}
        barStyle={theme?.name === "light" ? "dark-content" : "light-content"}
      />

      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            tabBarStyle: {
              backgroundColor: theme.cardBg,
              borderTopColor: theme.layoutBg,
            },
            tabBarInactiveTintColor: theme.color,
            tabBarActiveTintColor: theme.primary,
            tabBarShowLabel: false,
            headerShown: false,
          }}>
          <Tab.Screen
            name="Movies"
            component={MoviesStackScreen}
            options={{
              tabBarIcon: moviesIcon,
            }}
          />
          <Tab.Screen
            name="Search Movies"
            component={SearchStackScreen}
            options={{
              tabBarIcon: searchIcon,
            }}
          />
          <Tab.Screen
            name="Wishlist Tab"
            component={WishListStackScreen}
            options={{
              tabBarIcon: wishListIcon,
            }}
          />
          <Tab.Screen
            name="Settings"
            component={Settings}
            options={{
              tabBarIcon: settingsIcon,
              headerStyle: { backgroundColor: theme.cardBg },
              headerTitleAlign: "center",
              headerTitleStyle: { color: theme.color, fontSize: 20 },
              headerShown: true,
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});

export default RootNavigation;
