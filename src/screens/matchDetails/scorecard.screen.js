import React, { useState, useEffect } from "react";
import { View, Image, ScrollView, ActivityIndicator, RefreshControl } from "react-native";
import { Paragraph, Subheading, Text } from "react-native-paper";
import axios from "axios";
import { API } from "../../api/credentials";
import AppTheme from "../../infrastructure/apptheme/index";
import ScorecardBattingComponent from "../../components/scorecardbatting";
import ScorecardBowlingComponent from "../../components/scorecardbowling";

const Scorecard = (props) => {
  const [scorecard, setScorecard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  let fetchScorecard = null;
  useEffect(() => {
    fetchScorecard = async () => {
      let battingData = [];
      let bowlingData = [];
      try {
        const requestScorecard = await axios.get(API.endpoint_cric + "fixtureScorecard.php?fixture_id=" + props.fixtureId + "&type=both").catch((error) => {
          console.log(error);
          setLoading(false);
          setRefreshing(false);
        });
        if (requestScorecard !== null && requestScorecard !== undefined && requestScorecard.data !== null && requestScorecard.data.status === "success") {
          setScorecard(SetScorecardData(requestScorecard.data, 1));
        }
        setLoading(false);
        setRefreshing(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        setRefreshing(false);
      }
    };
    fetchScorecard();
  }, []);

  const SetScorecardData = (data, active) => {
    const battingData = data.batting;
    const bowlingData = data.bowling;
    const scoreData = data.score;
    // const battingOrder = [...battingData.slice(0).sort((a, b) => a.innings < b.innings)];
    const allInnings = [...new Set(battingData.map((x) => x.innings))];
    return (
      <View>
        {allInnings.map((k, i) => {
          const score = scoreData.filter((el) => {
            return el.innings == k;
          })[0];
          const batting = battingData.filter((el) => {
            return el.innings == k;
          });
          const bowling = bowlingData.filter((el) => {
            return el.innings == k;
          });
          return (
            <View key={i}>
              <View style={[AppTheme.styles.flex_row, AppTheme.styles.align_items_center, AppTheme.styles.padding_16, { height: 64 }]}>
                <Image source={{ uri: score.team_flag }} resizeMode="contain" style={[{ width: 40, height: 40 }]} />
                <Text style={[AppTheme.styles.flex_1, AppTheme.styles.padding_start_12]}>{score.team_name}</Text>
                <View style={[AppTheme.styles.flex_1, AppTheme.styles.align_items_right]}>
                  <Subheading>{score.total_score + "/" + score.total_wickets + " (" + score.total_overs + ")"}</Subheading>
                </View>
              </View>
              <ScorecardBattingComponent data={batting} active={active === parseInt(i)} />
              <ScorecardBowlingComponent data={bowling} active={active === parseInt(i)} />
            </View>
          );
        })}
      </View>
    );
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchScorecard();
  }, []);

  return (
    <View style={AppTheme.styles.flex_1}>
      {loading ? (
        <View style={[AppTheme.styles.flex_1, AppTheme.styles.justify_items_center, AppTheme.styles.align_items_center]}>
          <ActivityIndicator size="large" color={AppTheme.colors.brand.primary} />
        </View>
      ) : (
        <ScrollView style={AppTheme.styles.flex_1} refreshControl={<RefreshControl colors={[AppTheme.colors.brand.primary]} refreshing={refreshing} onRefresh={onRefresh} />}>
          <View style={AppTheme.styles.flex_1}>{scorecard}</View>
        </ScrollView>
      )}
    </View>
  );
};

export default Scorecard;
