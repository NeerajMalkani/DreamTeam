import React from "react";
import AppTheme from "../infrastructure/apptheme/index";
import { TabBar, TabView, SceneMap } from "react-native-tab-view";
import { View } from "react-native";
import Info from "./matchDetails/info.screen";
import Live from "./matchDetails/live.screen";
import Scorecard from "./matchDetails/scorecard.screen";
import Commentary from "./matchDetails/commentary.screen";
import Teams from "./matchDetails/teams.screen";

const MatchDetailsScreen = (props) => {
  const [index, setIndex] = React.useState(0);
  const renderScene = ({ route }) => {
    switch (route.key) {
      case "info":
        return <Info fixtureId={props.route.params.matchID} navigation={props.navigation} />;
      case "teams":
        return <Teams fixtureId={props.route.params.matchID} local_team={props.route.params.local_team} visitor_team={props.route.params.visitor_team} navigation={props.navigation} />;
      case "live":
        return <Live fixtureId={props.route.params.matchID} navigation={props.navigation} />;
      case "scorecard":
        return <Scorecard fixtureId={props.route.params.matchID} local_team={props.route.params.local_team} visitor_team={props.route.params.visitor_team} navigation={props.navigation} />;
      case "commentary":
        return <Commentary fixtureId={props.route.params.matchID} navigation={props.navigation} />;
      default:
        return null;
    }
  };

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: AppTheme.colors.brand.primary }}
      style={{ backgroundColor: AppTheme.colors.bg.primary }}
      inactiveColor={AppTheme.colors.text.secondary}
      activeColor={AppTheme.colors.brand.primary}
      scrollEnabled={true}
      tabStyle={{ width: "auto" }}
      labelStyle={{ fontSize: AppTheme.fontSizes.button, fontWeight: AppTheme.fontWeights.bold }}
    />
  );
  const [routes] = React.useState([
    { key: "info", title: "Info" },
    { key: "teams", title: "Teams" },
    { key: "live", title: "Live" },
    { key: "scorecard", title: "Scorecard" },
    { key: "commentary", title: "Commentary" },
  ]);
  return (
    <View style={[AppTheme.styles.flex_1, { backgroundColor: AppTheme.colors.bg.primary }]}>
      <TabView renderTabBar={renderTabBar} navigationState={{ index, routes }} renderScene={renderScene} onIndexChange={setIndex} />
    </View>
  );
};

export default MatchDetailsScreen;
