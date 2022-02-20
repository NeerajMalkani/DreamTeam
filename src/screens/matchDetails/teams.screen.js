import React, { useState, useEffect } from "react";
import { View, ScrollView, Text, Image, ActivityIndicator } from "react-native";
import axios from "axios";
import { API } from "../../api/credentials";
import AppTheme from "../../infrastructure/apptheme/index";
import PlayerTshirt from "../../components/tshirt";

const Teams = (props) => {
  const [teamA, setTeamA] = useState([]);
  const [teamB, setTeamB] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const requestTeams = await axios.get(API.endpoint_cric + "fixtureTeams.php?fixture_id=" + props.fixtureId).catch((error) => {
          setLoading(false);
        });
        if (requestTeams !== null && requestTeams !== undefined && requestTeams.data !== null && requestTeams.data.status === "success") {
          setTeamA(
            requestTeams.data.records.filter((el) => {
              return el.lineupteam_id == props.local_team.id;
            })
          );
          setTeamB(
            requestTeams.data.records.filter((el) => {
              return el.lineupteam_id == props.visitor_team.id;
            })
          );
          setLoading(false);
        } else {
          //error
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  return (
    <View style={AppTheme.styles.flex_1}>
      {loading ? (
        <View style={[AppTheme.styles.flex_1, AppTheme.styles.justify_items_center, AppTheme.styles.align_items_center]}>
          <ActivityIndicator size="large" color={AppTheme.colors.brand.primary} />
        </View>
      ) : (
        <View style={[AppTheme.styles.flex_column, AppTheme.styles.flex_1]}>
          <View style={[AppTheme.styles.card_without_flex, AppTheme.styles.margin_16, AppTheme.styles.margin_bottom_8, AppTheme.styles.flex_row, { overflow: "hidden" }]}>
            <View style={[AppTheme.styles.flex_2, AppTheme.styles.padding_16, AppTheme.styles.justify_items_center, AppTheme.styles.align_items_center]}>
              <View style={[AppTheme.styles.align_items_center, AppTheme.styles.justify_items_center, { width: 48, height: 48 }]}>
                <Image style={{ width: 40, height: 40 }} resizeMode="contain" source={{ uri: props.local_team.flag }} />
              </View>
              <Text>{props.local_team.name}</Text>
            </View>
            <View style={[AppTheme.styles.flex_1, AppTheme.styles.justify_items_center, AppTheme.styles.align_items_center]}>
              <View style={[AppTheme.styles.dividerHor, { backgroundColor: AppTheme.colors.brand.primary }]}></View>
              <View style={[AppTheme.styles.buttonCircleSmall, { position: "absolute" }]}>
                <Text style={[{ color: AppTheme.colors.bg.primary, fontWeight: AppTheme.fontWeights.bold, fontSize: AppTheme.fontSizes.caption }]}>vs</Text>
              </View>
            </View>
            <View style={[AppTheme.styles.flex_2, AppTheme.styles.padding_16, AppTheme.styles.justify_items_center, AppTheme.styles.align_items_center]}>
              <View style={[AppTheme.styles.align_items_center, AppTheme.styles.justify_items_center, { width: 48, height: 48 }]}>
                <Image style={{ width: 40, height: 40 }} resizeMode="contain" source={{ uri: props.visitor_team.flag }} />
              </View>
              <Text>{props.visitor_team.name}</Text>
            </View>
          </View>

          <View style={[AppTheme.styles.flex_1, AppTheme.styles.flex_row]}>
            <View style={[{ width: "50%" }]}>
              <ScrollView style={[AppTheme.styles.flex_1]} showsVerticalScrollIndicator={false}>
                {teamA.map((k, i) => {
                  return (
                    <View key={i} style={[AppTheme.styles.card_without_border_radius, AppTheme.styles.flex_row, AppTheme.styles.margin_8, AppTheme.styles.justify_items_center, AppTheme.styles.align_items_center, { height: 80 }]}>
                      <View style={[AppTheme.styles.flex_1, AppTheme.styles.padding_start_8, { width: 32, height: 32 }]}>
                        <PlayerTshirt primary_color={k.primary_color} secondary_color={k.secondary_color} />
                      </View>
                      <View style={[AppTheme.styles.flex_column, AppTheme.styles.flex_3, AppTheme.styles.justify_items_center]}>
                        <View style={[AppTheme.styles.padding_start_12, AppTheme.styles.flex_column]}>
                          <Text style={[{ fontSize: AppTheme.fontSizes.caption, color: AppTheme.colors.text.secondary }]}>{k.firstname}</Text>
                          <Text style={[{ fontSize: AppTheme.fontSizes.title, color: AppTheme.colors.text.primary }]}>{k.lastname}</Text>
                        </View>
                        <View style={[AppTheme.styles.padding_start_12, AppTheme.styles.padding_top_8]}>
                          <Text style={[{ fontSize: AppTheme.fontSizes.body, color: AppTheme.colors.text.secondary }]}>{k.positionname}</Text>
                        </View>
                      </View>
                      {k.lineupcaptain == 1 || k.lineupwicketkeeper == 1 ? (
                        <View
                          style={[
                            AppTheme.styles.align_items_center,
                            AppTheme.styles.justify_items_center,
                            { position: "absolute", top: 4, right: 4, width: 36, height: 24, borderRadius: 18, backgroundColor: k.lineupcaptain == 1 ? AppTheme.colors.balls.six : AppTheme.colors.balls.wicket },
                          ]}
                        >
                          <Text style={[{ fontSize: 9, color: AppTheme.colors.bg.primary }]}>{k.lineupcaptain == 1 && k.lineupwicketkeeper == 1 ? "C/WK" : k.lineupcaptain == 1 ? "C" : k.lineupwicketkeeper == 1 ? "WK" : ""}</Text>
                        </View>
                      ) : null}
                    </View>
                  );
                })}
              </ScrollView>
            </View>
            <View style={[{ width: "50%" }]}>
              <ScrollView style={[AppTheme.styles.flex_1]} showsVerticalScrollIndicator={false}>
                {teamB.map((k, i) => {
                  return (
                    <View key={i} style={[AppTheme.styles.card_without_border_radius, AppTheme.styles.flex_row, AppTheme.styles.margin_8, AppTheme.styles.justify_items_center, AppTheme.styles.align_items_center, { height: 80 }]}>
                      <View style={[AppTheme.styles.flex_1, AppTheme.styles.padding_start_8, { width: 32, height: 32 }]}>
                        <PlayerTshirt primary_color={k.primary_color} secondary_color={k.secondary_color} />
                      </View>
                      <View style={[AppTheme.styles.flex_column, AppTheme.styles.flex_3, AppTheme.styles.justify_items_center]}>
                        <View style={[AppTheme.styles.padding_start_12, AppTheme.styles.flex_column]}>
                          <Text style={[{ fontSize: AppTheme.fontSizes.caption, color: AppTheme.colors.text.secondary }]}>{k.firstname}</Text>
                          <Text style={[{ fontSize: AppTheme.fontSizes.title, color: AppTheme.colors.text.primary }]}>{k.lastname}</Text>
                        </View>
                        <View style={[AppTheme.styles.padding_start_12, AppTheme.styles.padding_top_8]}>
                          <Text style={[{ fontSize: AppTheme.fontSizes.body, color: AppTheme.colors.text.secondary }]}>{k.positionname}</Text>
                        </View>
                      </View>
                      {k.lineupcaptain == 1 || k.lineupwicketkeeper == 1 ? (
                        <View
                          style={[
                            AppTheme.styles.align_items_center,
                            AppTheme.styles.justify_items_center,
                            { position: "absolute", top: 4, right: 4, width: 36, height: 24, borderRadius: 18, backgroundColor: k.lineupcaptain == 1 ? AppTheme.colors.balls.six : AppTheme.colors.balls.wicket },
                          ]}
                        >
                          <Text style={[{ fontSize: 9, color: AppTheme.colors.bg.primary }]}>{k.lineupcaptain == 1 && k.lineupwicketkeeper == 1 ? "C/WK" : k.lineupcaptain == 1 ? "C" : k.lineupwicketkeeper == 1 ? "WK" : ""}</Text>
                        </View>
                      ) : null}
                    </View>
                  );
                })}
              </ScrollView>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default Teams;
