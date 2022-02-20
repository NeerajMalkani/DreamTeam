import React, { useState, useEffect } from "react";
import { View, ActivityIndicator, ScrollView, RefreshControl } from "react-native";
import { Headline, Paragraph, Avatar, Divider, Title, Text } from "react-native-paper";
import { TabBar, TabView } from "react-native-tab-view";
import { Dimensions } from "react-native";
import { createNavigationContainerRef } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import AppTheme from "../infrastructure/apptheme/index";
import { API } from "../api/credentials";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { PlayStatus } from "../components/playstatus";
import MatchCard from "../components/matchcard";

const windowWidth = Dimensions.get("window").width;

export const navigationRef = createNavigationContainerRef();

const HomeScreen = (props) => {
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [live, setLive] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [results, setResults] = useState([]);

  let fetchLatestMatches = null;

  useEffect(() => {
    fetchLatestMatches = async () => {
      try {
        const requestMatches = await axios.get(API.endpoint_cric + "fixtures.php").catch((error) => {
          console.log(error);
          setLoading(false);
          setRefreshing(false);
          //clearInterval(initFM);
        });
        if (requestMatches !== null && requestMatches.data !== null && requestMatches.data !== undefined && requestMatches.data.status === "success") {
          const records = requestMatches.data.records;
          if (records !== null && records !== undefined && records.length > 0) {
            setLive(
              records.filter((el) => {
                return PlayStatus(el.status).type == "live";
              })
            );
            setUpcoming(
              records.filter((el) => {
                return PlayStatus(el.status).type == "upcoming";
              })
            );
            setResults(
              records.filter((el) => {
                return PlayStatus(el.status).type == "results";
              })
            );
          }
        }
        setLoading(false);
        setRefreshing(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        setRefreshing(false);
        //clearInterval(initFM);
      }
    };
    fetchLatestMatches();
    // const initFM = setInterval(() => {
    //   fetchLatestMatches();
    // }, 2000);
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchLatestMatches();
  }, []);

  const renderScene = ({ route }) => {
    switch (route.key) {
      case "live":
        return (
          <ScrollView style={[AppTheme.styles.flex_1]} refreshControl={<RefreshControl colors={[AppTheme.colors.brand.primary]} refreshing={refreshing} onRefresh={onRefresh} />}>
            <MatchCard data={live} type="live" navigationRef={navigationRef} />
          </ScrollView>
        );
      case "upcoming":
        return (
          <ScrollView style={[AppTheme.styles.flex_1]}>
            <MatchCard data={upcoming} type="upcoming" navigationRef={navigationRef} />
          </ScrollView>
        );
      case "results":
        return (
          <ScrollView style={[AppTheme.styles.flex_1]}>
            <MatchCard data={results} type="results" navigationRef={navigationRef} />
          </ScrollView>
        );
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
      tabStyle={{ width: windowWidth / 3 }}
      labelStyle={{ fontSize: AppTheme.fontSizes.button, fontWeight: AppTheme.fontWeights.bold }}
    />
  );
  const [routes] = React.useState([
    { key: "live", title: "Live" },
    { key: "upcoming", title: "Upcoming" },
    { key: "results", title: "Results" },
  ]);

  return (
    <View style={[AppTheme.styles.flex_1]}>
      {loading ? (
        <View style={[AppTheme.styles.flex_1, AppTheme.styles.justify_items_center, AppTheme.styles.align_items_center]}>
          <ActivityIndicator size="large" color={AppTheme.colors.brand.primary} />
        </View>
      ) : (
        <View style={[AppTheme.styles.flex_1, AppTheme.flex_column, { backgroundColor: AppTheme.colors.bg.primary }]}>
          <View style={[AppTheme.styles.flex_2, AppTheme.flex_column]}>
            <View style={[{ width: "100%", height: "100%", position: "absolute", top: 0 }]}>
              <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0.4, y: 0 }} colors={[AppTheme.colors.brand.primary, AppTheme.colors.brand.navigationBar]} style={[{ flex: 1, borderRadius: 8 }]}></LinearGradient>
            </View>
            <SafeAreaView style={[AppTheme.styles.flex_1]}>
              <View style={[AppTheme.styles.flex_1, AppTheme.styles.flex_column]}>
                <View style={[AppTheme.styles.flex_1, AppTheme.styles.padding_16, AppTheme.styles.flex_row]}>
                  <View style={[AppTheme.styles.flex_column, AppTheme.styles.flex_2]}>
                    <Paragraph style={[{ color: AppTheme.colors.ui.disabled }]}>Good Afternoon</Paragraph>
                    <Headline style={[{ color: AppTheme.colors.bg.primary }]}>Neeraj Malkani</Headline>
                  </View>
                  <View style={[AppTheme.styles.flex_1, AppTheme.styles.justify_items_center, AppTheme.styles.align_items_right]}>
                    <Avatar.Image size={48} source={{ uri: "https://www.cric-life.com/wp-content/uploads/2020/10/virat-kohli-avatar-min.png" }} style={[{ backgroundColor: AppTheme.colors.bg.primary }]} />
                  </View>
                </View>
                <Divider style={[{ backgroundColor: AppTheme.colors.brand.secondary }]} />
                <View style={[AppTheme.styles.flex_1_5, AppTheme.styles.padding_8, AppTheme.styles.flex_row]}>
                  <View style={[AppTheme.styles.flex_column, AppTheme.styles.flex_1, AppTheme.styles.margin_8, AppTheme.styles.padding_8, AppTheme.styles.border_radius_4, { width: "100%", backgroundColor: AppTheme.colors.brand.secondary }]}>
                    <Paragraph style={[{ color: AppTheme.colors.ui.tertiary }]}>Wallet</Paragraph>
                    <Title style={[{ color: AppTheme.colors.bg.primary }]}>¢200</Title>
                    <Ionicons name="wallet" color={AppTheme.colors.brand.secondary} size={28} style={[{ position: "absolute", bottom: 0, right: 0, opacity: 0.6 }]} />
                  </View>
                  <View style={[AppTheme.styles.flex_column, AppTheme.styles.flex_1, AppTheme.styles.margin_8, AppTheme.styles.padding_8, AppTheme.styles.border_radius_4, { width: "100%", backgroundColor: AppTheme.colors.brand.secondary }]}>
                    <Paragraph style={[{ color: AppTheme.colors.ui.tertiary }]}>Rank</Paragraph>
                    <Title style={[{ color: AppTheme.colors.bg.primary }]}>#2</Title>
                    <MaterialCommunityIcons name="crown" color={AppTheme.colors.brand.secondary} size={28} style={[{ position: "absolute", bottom: 0, right: 0, opacity: 0.6 }]} />
                  </View>
                  <View style={[AppTheme.styles.flex_column, AppTheme.styles.flex_1, AppTheme.styles.margin_8, AppTheme.styles.padding_8, AppTheme.styles.border_radius_4, { width: "100%", backgroundColor: AppTheme.colors.brand.secondary }]}>
                    <Paragraph style={[{ color: AppTheme.colors.ui.tertiary }]}>Points</Paragraph>
                    <Title style={[{ color: AppTheme.colors.bg.primary }]}>25K</Title>
                    <FontAwesome5 name="coins" color={AppTheme.colors.brand.secondary} size={24} style={[{ position: "absolute", bottom: 2, right: 2, opacity: 0.6 }]} />
                  </View>
                </View>
              </View>
            </SafeAreaView>
          </View>
          <View style={[AppTheme.styles.flex_5]}>
            <TabView renderTabBar={renderTabBar} navigationState={{ index, routes }} renderScene={renderScene} onIndexChange={setIndex} />
          </View>
        </View>
      )}
    </View>
  );
};

export default HomeScreen;
