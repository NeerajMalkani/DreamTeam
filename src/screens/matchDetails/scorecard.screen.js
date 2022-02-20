import React, { useState, useEffect } from "react";
import { View, ScrollView, ActivityIndicator } from "react-native";
import axios from "axios";
import { API } from "../../api/credentials";
import AppTheme from "../../infrastructure/apptheme/index";
import ScorecardBattingComponent from "../../components/scorecardbatting";
import ScorecardBowlingComponent from "../../components/scorecardbowling";

const Scorecard = (props) => {
  const [scorecardbatting, setScorecardBatting] = useState([]);
  const [scorecardbowling, setScorecardBowling] = useState([]);
  const [loading, setLoading] = useState(true);

  let activeInnings = "S1";

  const FilterScorecardByInnings = (type, data) => {
    type === "bat"
      ? setScorecardBatting(
          data.filter((el) => {
            return el.innings == activeInnings;
          })
        )
      : setScorecardBowling(
          data.filter((el) => {
            return el.innings == activeInnings;
          })
        );
  };

  useEffect(() => {
    const fetchScorecard = async () => {
      const requestScorecardBatting = await axios.get(API.endpoint_cric + "fixtureScorecard.php?fixture_id=" + props.fixtureId + "&type=bat").catch((error) => {
        console.log(error);
      });
      if (requestScorecardBatting !== null && requestScorecardBatting !== undefined && requestScorecardBatting.data !== null && requestScorecardBatting.data.status === "success") {
        const battingOrder = [...requestScorecardBatting.data.records.slice(0).sort((a, b) => a.innings < b.innings)];
        activeInnings = battingOrder[0].innings;
        FilterScorecardByInnings("bat", requestScorecardBatting.data.records);
      }
      const requestScorecardBowling = await axios.get(API.endpoint_cric + "fixtureScorecard.php?fixture_id=" + props.fixtureId + "&type=bowl").catch((error) => {
        console.log(error);
      });
      if (requestScorecardBowling !== null && requestScorecardBowling !== undefined && requestScorecardBowling.data !== null && requestScorecardBowling.data.status === "success") {
        FilterScorecardByInnings("bowl", requestScorecardBowling.data.records);
      }
      setLoading(false);
    };
    fetchScorecard();
  }, []);

  return (
    <View style={AppTheme.styles.flex_1}>
      {loading ? (
        <View style={[AppTheme.styles.flex_1, AppTheme.styles.justify_items_center, AppTheme.styles.align_items_center]}>
          <ActivityIndicator size="large" color={AppTheme.colors.brand.primary} />
        </View>
      ) : (
        <ScrollView style={AppTheme.styles.flex_1}>
          <View style={AppTheme.styles.flex_1}>
            <ScorecardBattingComponent data={scorecardbatting} active={true} />
            <ScorecardBowlingComponent data={scorecardbowling} active={true} />
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default Scorecard;
