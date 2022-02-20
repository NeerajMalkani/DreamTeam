import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BottomNavigation, DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import AppTheme from "./src/infrastructure/apptheme/index";
import HomeScreen, { navigationRef } from "./src/screens/home.screen";
import FeedsScreen from "./src/screens/feeds.screen";
import ContestsScreen from "./src/screens/contests.screen";
import ProfileScreen from "./src/screens/profile.screen";
import MatchDetailsScreen from "./src/screens/matchDetails.screen";

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: AppTheme.colors.brand.primary,
    accent: AppTheme.colors.brand.accent,
  },
};

const Stack = createNativeStackNavigator();

const BottomTabs = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "home", title: "Home", icon: "home" },
    { key: "contests", title: "Contests", icon: "handshake" },
    { key: "feeds", title: "Feeds", icon: "newspaper" },
    { key: "profile", title: "Profile", icon: "account" },
  ]);
  const renderScene = BottomNavigation.SceneMap({
    home: HomeScreen,
    contests: ContestsScreen,
    feeds: FeedsScreen,
    profile: ProfileScreen,
  });
  return <BottomNavigation navigationState={{ index, routes }} onIndexChange={setIndex} renderScene={renderScene} barStyle={{ backgroundColor: AppTheme.colors.bg.primary }} activeColor={AppTheme.colors.brand.primary} />;
};
export default function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator>
          <Stack.Screen name="HomeStack" component={BottomTabs} options={{ headerShown: false }} />
          <Stack.Screen
            name="MatchDetailsScreen"
            component={MatchDetailsScreen}
            options={({ route }) => ({ title: route.params.name, headerStyle: { backgroundColor: AppTheme.colors.brand.primary }, headerTintColor: AppTheme.colors.bg.primary, headerTitleStyle: { fontWeight: AppTheme.fontWeights.bold } })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
