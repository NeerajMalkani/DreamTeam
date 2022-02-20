import React, { useState, useEffect } from "react";
import { View, ActivityIndicator, ScrollView, TouchableNativeFeedback } from "react-native";
import AppTheme from "../infrastructure/apptheme/index";
import { SafeAreaView } from "react-native-safe-area-context";
import { API } from "../api/credentials";
import axios from "axios";
import { Card, Text, Button } from "react-native-paper";

const FeedsScreen = () => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewsData = async () => {
      const requestNews = await axios.get(API.endpoint_news, { params: { category: "2021020913321411486" }, headers: { "x-rapidapi-host": API.rapidapi_host, "x-rapidapi-key": API.rapidapi_key } }).catch((error) => {
        console.log("error: " + error);
        setLoading(false);
      });
      if (requestNews !== null && requestNews !== undefined && requestNews.data !== null) {
        setNewsData(requestNews.data.data);
        setLoading(false);
      } else {
        setLoading(false);
      }
    };
    fetchNewsData();
  }, []);

  return (
    <View style={[AppTheme.styles.flex_1]}>
      {loading ? (
        <View style={[AppTheme.styles.flex_1, AppTheme.styles.justify_items_center, AppTheme.styles.align_items_center]}>
          <ActivityIndicator size="large" color={AppTheme.colors.brand.primary} />
        </View>
      ) : (
        <View style={[AppTheme.styles.flex_1, AppTheme.styles.padding_16]}>
          <SafeAreaView>
            <ScrollView>
              {newsData.map((k, i) => {
                return (
                  <Card key={i} style={[AppTheme.styles.margin_top_8]}>
                    <Card.Cover source={{ uri: k.image.data.urls.uploaded.original }} resizeMode="cover" resizeMethod="auto" />
                    <Card.Content>
                      <Text style={[AppTheme.styles.margin_top_8]}>{k.title}</Text>
                    </Card.Content>
                    <Card.Actions style={[AppTheme.styles.justify_items_right]}>
                      <TouchableNativeFeedback onPress={() => console.log("Pressed")}>
                        <Button>View Story</Button>
                      </TouchableNativeFeedback>
                    </Card.Actions>
                  </Card>
                );
              })}
            </ScrollView>
          </SafeAreaView>
        </View>
      )}
    </View>
  );
};

export default FeedsScreen;
