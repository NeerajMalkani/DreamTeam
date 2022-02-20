import { View, Text } from "react-native";
import AppTheme from "../infrastructure/apptheme/index";

const ScorecardBowlingComponent = (props) => {
  return props.active && props.data.length > 0 ? (
    <View style={[AppTheme.styles.flex_1]}>
      <View style={[AppTheme.styles.flex_row, AppTheme.styles.border_bottom, AppTheme.styles.padding_16, AppTheme.styles.align_items_center, { backgroundColor: AppTheme.colors.bg.secondary }]}>
        <View style={[AppTheme.styles.flex_column, AppTheme.styles.flex_3]}>
          <Text style={[{ color: AppTheme.colors.text.primary, fontSize: AppTheme.fontSizes.subtitle, fontWeight: AppTheme.fontWeights.bold }]}>Bowler</Text>
        </View>
        <View style={[AppTheme.styles.flex_column, AppTheme.styles.flex_1, AppTheme.styles.align_items_center]}>
          <Text style={[{ color: AppTheme.colors.text.primary, fontSize: AppTheme.fontSizes.subtitle, fontWeight: AppTheme.fontWeights.bold }]}>O</Text>
        </View>
        <View style={[AppTheme.styles.flex_column, AppTheme.styles.flex_1, AppTheme.styles.align_items_center]}>
          <Text style={[{ color: AppTheme.colors.text.primary, fontSize: AppTheme.fontSizes.subtitle, fontWeight: AppTheme.fontWeights.bold }]}>M</Text>
        </View>
        <View style={[AppTheme.styles.flex_column, AppTheme.styles.flex_1, AppTheme.styles.align_items_center]}>
          <Text style={[{ color: AppTheme.colors.text.primary, fontSize: AppTheme.fontSizes.subtitle, fontWeight: AppTheme.fontWeights.bold }]}>R</Text>
        </View>
        <View style={[AppTheme.styles.flex_column, AppTheme.styles.flex_1, AppTheme.styles.align_items_center]}>
          <Text style={[{ color: AppTheme.colors.text.primary, fontSize: AppTheme.fontSizes.subtitle, fontWeight: AppTheme.fontWeights.bold }]}>W</Text>
        </View>
        <View style={[AppTheme.styles.flex_column, AppTheme.styles.flex_1, AppTheme.styles.align_items_center]}>
          <Text style={[{ color: AppTheme.colors.text.primary, fontSize: AppTheme.fontSizes.subtitle, fontWeight: AppTheme.fontWeights.bold }]}>ER</Text>
        </View>
      </View>
      {props.data.map((k, i) => {
        return (
          <View key={i} style={[AppTheme.styles.flex_row, AppTheme.styles.border_bottom, AppTheme.styles.padding_16, AppTheme.styles.align_items_center]}>
            <View style={[AppTheme.styles.flex_column, AppTheme.styles.flex_3]}>
              <Text style={[{ color: AppTheme.colors.text.primary, fontSize: AppTheme.fontSizes.subtitle }]}>{k.bowler_player_name}</Text>
            </View>
            <View style={[AppTheme.styles.flex_column, AppTheme.styles.flex_1, AppTheme.styles.align_items_center]}>
              <Text style={[{ color: AppTheme.colors.text.primary, fontSize: AppTheme.fontSizes.subtitle }]}>{k.overs}</Text>
            </View>
            <View style={[AppTheme.styles.flex_column, AppTheme.styles.flex_1, AppTheme.styles.align_items_center]}>
              <Text style={[{ color: AppTheme.colors.text.primary, fontSize: AppTheme.fontSizes.subtitle }]}>{k.medians}</Text>
            </View>
            <View style={[AppTheme.styles.flex_column, AppTheme.styles.flex_1, AppTheme.styles.align_items_center]}>
              <Text style={[{ color: AppTheme.colors.text.primary, fontSize: AppTheme.fontSizes.subtitle }]}>{k.runs}</Text>
            </View>
            <View style={[AppTheme.styles.flex_column, AppTheme.styles.flex_1, AppTheme.styles.align_items_center]}>
              <Text style={[{ color: AppTheme.colors.text.primary, fontSize: AppTheme.fontSizes.subtitle, fontWeight: AppTheme.fontWeights.bold }]}>{k.wickets}</Text>
            </View>
            <View style={[AppTheme.styles.flex_column, AppTheme.styles.flex_1, AppTheme.styles.align_items_center]}>
              <Text style={[{ color: AppTheme.colors.text.primary, fontSize: AppTheme.fontSizes.subtitle }]}>{parseFloat(k.rate).toFixed(2)}</Text>
            </View>
          </View>
        );
      })}
    </View>
  ) : null;
};

export default ScorecardBowlingComponent;
