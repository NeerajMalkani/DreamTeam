import React from "react";
import { View, Image, TouchableNativeFeedback } from "react-native";
import AppTheme from "../infrastructure/apptheme/index";
import moment from "moment";
import { Card, Subheading, Text, Divider } from "react-native-paper";

const MatchCard = (props) => {
  const CardCliked = (data) => {
    props.navigationRef.navigate("MatchDetailsScreen", {
      name: data.local_team_code + " vs " + data.visitor_team_code,
      matchID: data.id,
      local_team: {
        id: data.local_team_id,
        name: data.local_team_name,
        flag: data.local_team_flag,
      },
      visitor_team: {
        id: data.visitor_team_id,
        name: data.visitor_team_name,
        flag: data.visitor_team_flag,
      },
    });
  };

  return (
    <View>
      {props.data.map((k, i) => {
        const teamAScore = FormatScore(props.data[i].local_team_score, props.data[i].local_team_overs, props.data[i].local_team_wickets);
        const teamBScore = FormatScore(props.data[i].visitor_team_score, props.data[i].visitor_team_overs, props.data[i].visitor_team_wickets);
        return (
          <View key={i} style={[AppTheme.styles.margin_8]}>
            <TouchableNativeFeedback onPress={() => CardCliked(props.data[i])}>
              <Card>
                <Card.Content>
                  <Text style={{ fontWeight: AppTheme.fontWeights.bold }}>{props.data[i].league_name}</Text>
                  <Text style={{ color: AppTheme.colors.text.secondary }}>{props.data[i].local_team_code + " vs " + props.data[i].visitor_team_code + " - " + props.data[i].match_name}</Text>
                  <View style={[AppTheme.styles.flex_row, AppTheme.styles.flex_1, AppTheme.styles.align_items_center, AppTheme.styles.margin_top_8]}>
                    <View style={[AppTheme.styles.align_items_center, AppTheme.styles.justify_items_center, { width: 48, height: 48 }]}>
                      <Image style={{ width: 40, height: 40 }} resizeMode="contain" source={{ uri: props.data[i].local_team_flag }} />
                    </View>
                    <Text>{props.data[i].local_team_name}</Text>
                    <View style={[AppTheme.styles.flex_column, AppTheme.styles.flex_1, AppTheme.styles.justify_items_center, AppTheme.styles.align_items_right]}>
                      <View style={[AppTheme.styles.flex_1, AppTheme.styles.flex_row]}>
                        <Subheading
                          style={[
                            {
                              textAlignVertical: "center",
                              fontWeight:
                                parseInt(props.data[i].won_id) === 1 ||
                                (parseInt(props.data[i].local_team_inning) !== 0 && parseInt(props.data[i].local_team_inning) > parseInt(props.data[i].visitor_team_inning) && parseInt(props.data[i].won_id) !== 2)
                                  ? AppTheme.fontWeights.bold
                                  : AppTheme.fontWeights.regular,
                            },
                          ]}
                        >
                          {teamAScore.score}
                        </Subheading>
                        <Text style={[{ color: AppTheme.colors.text.secondary, textAlignVertical: "center" }]}>{teamAScore.overs}</Text>
                      </View>
                    </View>
                  </View>

                  <View style={[AppTheme.styles.flex_row, AppTheme.styles.flex_1, AppTheme.styles.align_items_center]}>
                    <View style={[AppTheme.styles.align_items_center, AppTheme.styles.justify_items_center, { width: 48, height: 48 }]}>
                      <Image style={{ width: 40, height: 40 }} resizeMode="contain" source={{ uri: props.data[i].visitor_team_flag }} />
                    </View>
                    <Text>{props.data[i].visitor_team_name}</Text>
                    <View style={[AppTheme.styles.flex_column, AppTheme.styles.flex_1, AppTheme.styles.justify_items_center, AppTheme.styles.align_items_right]}>
                      <View style={[AppTheme.styles.flex_1, AppTheme.styles.flex_row]}>
                        <Subheading
                          style={[
                            {
                              textAlignVertical: "center",
                              fontWeight:
                                parseInt(props.data[i].won_id) === 2 ||
                                (parseInt(props.data[i].visitor_team_inning) !== 0 && parseInt(props.data[i].visitor_team_inning) > parseInt(props.data[i].local_team_inning) && parseInt(props.data[i].won_id) !== 1)
                                  ? AppTheme.fontWeights.bold
                                  : AppTheme.fontWeights.regular,
                            },
                          ]}
                        >
                          {teamBScore.score}
                        </Subheading>
                        <Text style={[{ color: AppTheme.colors.text.secondary, textAlignVertical: "center" }]}>{teamBScore.overs}</Text>
                      </View>
                    </View>
                  </View>
                  <Divider style={[AppTheme.styles.margin_top_8, { backgroundColor: AppTheme.colors.ui.secondary }]}></Divider>
                  <View style={[AppTheme.styles.padding_top_8]}>
                    <Text>{FormatMessage(props.data[i])}</Text>
                  </View>
                </Card.Content>
              </Card>
            </TouchableNativeFeedback>
          </View>
        );
      })}
    </View>
  );
};

const FormatScore = (score, overs, wickets) => {
  let formatted_score = { score: "0/0", overs: "0.0", bold: false };
  if (score !== null && score !== undefined && overs !== null && overs !== undefined && wickets !== null && wickets !== undefined) {
    formatted_score.score = wickets == 10 ? score : score + "/" + wickets;
    formatted_score.overs = " (" + overs + ")";
  }
  return formatted_score;
};

const FormatMessage = (data) => {
  let formatted_message = data.fixture_details.note;
  switch (data.fixture_details.type) {
    case "T20":
    case "T10":
    case "ODI":
    case "T20I":
      if (parseInt(data.fixture_details.is_live) === 1 && parseInt(data.local_team_inning) !== 0 && parseInt(data.visitor_team_inning) !== 0) {
        if (parseInt(data.local_team_inning) > parseInt(data.visitor_team_inning)) {
          const reqRuns = parseInt(data.visitor_team_score) + 1 - parseInt(data.local_team_score);
          const currOvers = data.local_team_overs.toString().split(".");
          const currBalls = parseInt(currOvers[0]) * 6 + parseInt(currOvers[1] === null || currOvers[1] === undefined ? 0 : currOvers[1]);
          const totBalls = data.fixture_details.type === "T20" || data.fixture_details.type === "T20I" ? 20 * 6 : data.fixture_details.type === "T10" ? 10 * 6 : 50 * 6;
          const remBalls = totBalls - currBalls;
          formatted_message = data.local_team_code + " requires " + reqRuns + (reqRuns === 1 ? " run" : " runs") + " in " + remBalls + (remBalls === 1 ? " ball" : " balls" + " (RR: " + ((reqRuns / remBalls) * 6).toFixed(2) + ")");
        } else {
          const reqRuns = parseInt(data.local_team_score) + 1 - parseInt(data.visitor_team_score);
          const currOvers = data.visitor_team_overs.toString().split(".");
          const currBalls = parseInt(currOvers[0]) * 6 + parseInt(currOvers[1] === null || currOvers[1] === undefined ? 0 : currOvers[1]);
          const totBalls = data.fixture_details.type === "T20" || data.fixture_details.type === "T20I" ? 20 * 6 : data.fixture_details.type === "T10" ? 10 * 6 : 50 * 6;
          const remBalls = totBalls - currBalls;
          formatted_message = data.visitor_team_code + " requires " + reqRuns + (reqRuns === 1 ? " run" : " runs") + " in " + remBalls + (remBalls === 1 ? " ball" : " balls" + " (RR: " + ((reqRuns / remBalls) * 6).toFixed(2) + ")");
        }
      } else if (parseInt(data.fixture_details.is_live) === 1 && (parseInt(data.local_team_inning) === 1 || parseInt(data.visitor_team_inning) === 1)) {
        formatted_message = data.fixture_toss.toss_won_team + " won the toss and elected " + data.fixture_toss.elected;
      }
      break;
  }
  if (data.fixture_details.status === "NS") {
    formatted_message = "Starts at " + moment(moment.utc(data.fixture_details.starting_at).toDate()).local().format("llll");
  }
  return formatted_message;
};

export default MatchCard;
