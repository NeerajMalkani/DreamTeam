import React, { useState, useEffect } from "react";
import { View, ScrollView, Text, Image, ActivityIndicator, TouchableNativeFeedback } from "react-native";
import moment from "moment";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import axios from "axios";
import { API } from "../../api/credentials";
import AppTheme from "../../infrastructure/apptheme/index";

const Info = (props) => {
  const [matchDetails, setMatchDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatchInfo = async () => {
      try {
        const requestMatchDetails = await axios.get(API.endpoint_cric + "fixtureDetails.php?fixture_id=" + props.fixtureId).catch((error) => {
          setLoading(false);
        });
        if (requestMatchDetails !== null && requestMatchDetails !== undefined && requestMatchDetails.data !== null && requestMatchDetails.data.status === "success") {
          setMatchDetails(requestMatchDetails.data.records[0]);
          setLoading(false);
        } else {
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
      }
    };

    fetchMatchInfo();
  }, []);

  return (
    <View style={[AppTheme.styles.flex_1]}>
      {loading ? (
        <View style={[AppTheme.styles.flex_1, AppTheme.styles.justify_items_center, AppTheme.styles.align_items_center]}>
          <ActivityIndicator size="large" color={AppTheme.colors.brand.primary} />
        </View>
      ) : (
        <ScrollView style={AppTheme.styles.flex_1} showsVerticalScrollIndicator={false}>
          <View style={[AppTheme.styles.card, AppTheme.styles.margin_16, AppTheme.styles.flex_row, { overflow: "hidden" }]}>
            <TouchableNativeFeedback onPress={() => {}}>
              <View style={[AppTheme.styles.flex_2, AppTheme.styles.padding_16, AppTheme.styles.justify_items_center, AppTheme.styles.align_items_center]}>
                <View style={[AppTheme.styles.align_items_center, AppTheme.styles.justify_items_center, { width: 48, height: 48 }]}>
                  <Image style={{ width: 40, height: 40 }} resizeMode="contain" source={{ uri: matchDetails.local_team_flag }} />
                </View>
                <Text>{matchDetails.local_team_name}</Text>
              </View>
            </TouchableNativeFeedback>
            <View style={[AppTheme.styles.flex_1, AppTheme.styles.justify_items_center, AppTheme.styles.align_items_center]}>
              <View style={[AppTheme.styles.dividerHor, { backgroundColor: AppTheme.colors.brand.primary }]}></View>
              <View style={[AppTheme.styles.buttonCircleSmall, { position: "absolute" }]}>
                <Text style={[{ color: AppTheme.colors.bg.primary, fontWeight: AppTheme.fontWeights.bold, fontSize: AppTheme.fontSizes.caption }]}>vs</Text>
              </View>
            </View>
            <TouchableNativeFeedback onPress={() => {}}>
              <View style={[AppTheme.styles.flex_2, AppTheme.styles.padding_16, AppTheme.styles.justify_items_center, AppTheme.styles.align_items_center]}>
                <View style={[AppTheme.styles.align_items_center, AppTheme.styles.justify_items_center, { width: 48, height: 48 }]}>
                  <Image style={{ width: 40, height: 40 }} resizeMode="contain" source={{ uri: matchDetails.visitor_team_flag }} />
                </View>
                <Text>{matchDetails.visitor_team_name}</Text>
              </View>
            </TouchableNativeFeedback>
          </View>

          <View style={[AppTheme.styles.card, AppTheme.styles.margin_16, AppTheme.styles.margin_top_0, AppTheme.styles.flex_column, { overflow: "hidden" }]}>
            <View style={[AppTheme.styles.flex_row, AppTheme.styles.padding_16, AppTheme.styles.border_bottom, AppTheme.styles.align_items_center, { backgroundColor: AppTheme.colors.ui.tertiary_2 }]}>
              <MaterialCommunityIcons name="information-outline" size={18} color={AppTheme.colors.brand.primary} />
              <Text style={[AppTheme.styles.padding_start_12, { color: AppTheme.colors.text.primary, fontWeight: AppTheme.fontWeights.bold, fontSize: AppTheme.fontSizes.title }]}>Match Info</Text>
            </View>
            <View style={[AppTheme.styles.flex_row, AppTheme.styles.padding_12, AppTheme.styles.border_bottom]}>
              <Text style={[AppTheme.styles.flex_1, { color: AppTheme.colors.text.primary, fontWeight: AppTheme.fontWeights.bold, fontSize: AppTheme.fontSizes.button }]}>Match</Text>
              <Text style={[AppTheme.styles.flex_2, { color: AppTheme.colors.text.primary, fontSize: AppTheme.fontSizes.button }]}>{matchDetails.match_name}</Text>
            </View>
            <View style={[AppTheme.styles.flex_row, AppTheme.styles.padding_12, AppTheme.styles.border_bottom]}>
              <Text style={[AppTheme.styles.flex_1, { color: AppTheme.colors.text.primary, fontWeight: AppTheme.fontWeights.bold, fontSize: AppTheme.fontSizes.button }]}>Tour</Text>
              <Text style={[AppTheme.styles.flex_2, { color: AppTheme.colors.text.primary, fontSize: AppTheme.fontSizes.button }]}>{matchDetails.league_name}</Text>
            </View>
            <View style={[AppTheme.styles.flex_row, AppTheme.styles.padding_12, AppTheme.styles.border_bottom]}>
              <Text style={[AppTheme.styles.flex_1, { color: AppTheme.colors.text.primary, fontWeight: AppTheme.fontWeights.bold, fontSize: AppTheme.fontSizes.button }]}>Format</Text>
              <Text style={[AppTheme.styles.flex_2, { color: AppTheme.colors.text.primary, fontSize: AppTheme.fontSizes.button, textTransform: "uppercase" }]}>{matchDetails.type}</Text>
            </View>
            <View style={[AppTheme.styles.flex_row, AppTheme.styles.padding_12, AppTheme.styles.border_bottom]}>
              <Text style={[AppTheme.styles.flex_1, { color: AppTheme.colors.text.primary, fontWeight: AppTheme.fontWeights.bold, fontSize: AppTheme.fontSizes.button }]}>Date</Text>
              <Text style={[AppTheme.styles.flex_2, { color: AppTheme.colors.text.primary, fontSize: AppTheme.fontSizes.button }]}>{moment(moment.utc(matchDetails.starting_at).toDate()).local().format("LL")}</Text>
            </View>
            <View style={[AppTheme.styles.flex_row, AppTheme.styles.padding_12]}>
              <Text style={[AppTheme.styles.flex_1, { color: AppTheme.colors.text.primary, fontWeight: AppTheme.fontWeights.bold, fontSize: AppTheme.fontSizes.button }]}>Time</Text>
              <Text style={[AppTheme.styles.flex_2, { color: AppTheme.colors.text.primary, fontSize: AppTheme.fontSizes.button }]}>{moment(moment.utc(matchDetails.starting_at).toDate()).local().format("LT")}</Text>
            </View>
          </View>

          {matchDetails.toss_won_team !== null && matchDetails.toss_won_team !== undefined ? (
            <View style={[AppTheme.styles.card, AppTheme.styles.margin_16, AppTheme.styles.margin_top_0, AppTheme.styles.flex_column, { overflow: "hidden" }]}>
              <View style={[AppTheme.styles.flex_row, AppTheme.styles.padding_16, AppTheme.styles.border_bottom, AppTheme.styles.align_items_center, { backgroundColor: AppTheme.colors.ui.tertiary_2 }]}>
                <FontAwesome name="hand-o-right" size={18} color={AppTheme.colors.brand.primary} />
                <Text style={[AppTheme.styles.padding_start_12, { color: AppTheme.colors.text.primary, fontWeight: AppTheme.fontWeights.bold, fontSize: AppTheme.fontSizes.title }]}>Toss</Text>
              </View>
              <View style={[AppTheme.styles.flex_row, AppTheme.styles.padding_12, AppTheme.styles.border_bottom]}>
                <Text style={[AppTheme.styles.flex_1, { color: AppTheme.colors.text.primary, fontWeight: AppTheme.fontWeights.bold, fontSize: AppTheme.fontSizes.button }]}>Winner</Text>
                <Text style={[AppTheme.styles.flex_2, { color: AppTheme.colors.text.primary, fontSize: AppTheme.fontSizes.button }]}>{matchDetails.toss_won_team}</Text>
              </View>
              <View style={[AppTheme.styles.flex_row, AppTheme.styles.padding_12]}>
                <Text style={[AppTheme.styles.flex_1, { color: AppTheme.colors.text.primary, fontWeight: AppTheme.fontWeights.bold, fontSize: AppTheme.fontSizes.button }]}>Elected</Text>
                <Text style={[AppTheme.styles.flex_2, { color: AppTheme.colors.text.primary, fontSize: AppTheme.fontSizes.button, textTransform: "capitalize" }]}>{matchDetails.elected}</Text>
              </View>
            </View>
          ) : null}

          {matchDetails.venue_name !== null && matchDetails.venue_name !== undefined ? (
            <View style={[AppTheme.styles.card, AppTheme.styles.margin_16, AppTheme.styles.margin_top_0, AppTheme.styles.flex_column, { overflow: "hidden" }]}>
              <View style={[AppTheme.styles.flex_row, AppTheme.styles.padding_16, AppTheme.styles.border_bottom, AppTheme.styles.align_items_center, { backgroundColor: AppTheme.colors.ui.tertiary_2 }]}>
                <MaterialCommunityIcons name="stadium-variant" size={20} color={AppTheme.colors.brand.primary} />
                <Text style={[AppTheme.styles.padding_start_12, { color: AppTheme.colors.text.primary, fontWeight: AppTheme.fontWeights.bold, fontSize: AppTheme.fontSizes.title }]}>Venue</Text>
              </View>
              <View style={[AppTheme.styles.flex_row, AppTheme.styles.padding_12, AppTheme.styles.border_bottom]}>
                <Text style={[AppTheme.styles.flex_1, { color: AppTheme.colors.text.primary, fontWeight: AppTheme.fontWeights.bold, fontSize: AppTheme.fontSizes.button }]}>Name</Text>
                <Text style={[AppTheme.styles.flex_2, { color: AppTheme.colors.text.primary, fontSize: AppTheme.fontSizes.button }]}>{matchDetails.venue_name}</Text>
              </View>
              <View style={[AppTheme.styles.flex_row, AppTheme.styles.padding_12, AppTheme.styles.border_bottom]}>
                <Text style={[AppTheme.styles.flex_1, { color: AppTheme.colors.text.primary, fontWeight: AppTheme.fontWeights.bold, fontSize: AppTheme.fontSizes.button }]}>City</Text>
                <Text style={[AppTheme.styles.flex_2, { color: AppTheme.colors.text.primary, fontSize: AppTheme.fontSizes.button }]}>{matchDetails.venue_city}</Text>
              </View>
              {matchDetails.venue_capacity !== null && matchDetails.venue_capacity !== undefined ? (
                <View style={[AppTheme.styles.flex_row, AppTheme.styles.padding_12]}>
                  <Text style={[AppTheme.styles.flex_1, { color: AppTheme.colors.text.primary, fontWeight: AppTheme.fontWeights.bold, fontSize: AppTheme.fontSizes.button }]}>Capacity</Text>
                  <Text style={[AppTheme.styles.flex_2, { color: AppTheme.colors.text.primary, fontSize: AppTheme.fontSizes.button }]}>{matchDetails.venue_capacity}</Text>
                </View>
              ) : null}
            </View>
          ) : null}
        </ScrollView>
      )}
    </View>
  );
};

export default Info;
