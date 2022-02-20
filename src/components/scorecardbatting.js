import { View, Text } from "react-native";
import AppTheme from "../infrastructure/apptheme/index";

const ScorecardBattingComponent = (props) => {
  return props.active && props.data.length > 0 ? (
    <View style={[AppTheme.styles.flex_1]}>
      <View style={[AppTheme.styles.flex_row, AppTheme.styles.border_bottom, AppTheme.styles.padding_16, AppTheme.styles.align_items_center, { backgroundColor: AppTheme.colors.bg.secondary }]}>
        <View style={[AppTheme.styles.flex_column, AppTheme.styles.flex_3]}>
          <Text style={[{ color: AppTheme.colors.text.primary, fontSize: AppTheme.fontSizes.subtitle, fontWeight: AppTheme.fontWeights.bold }]}>Batsman</Text>
        </View>
        <View style={[AppTheme.styles.flex_column, AppTheme.styles.flex_1, AppTheme.styles.align_items_center]}>
          <Text style={[{ color: AppTheme.colors.text.primary, fontSize: AppTheme.fontSizes.subtitle, fontWeight: AppTheme.fontWeights.bold }]}>R</Text>
        </View>
        <View style={[AppTheme.styles.flex_column, AppTheme.styles.flex_1, AppTheme.styles.align_items_center]}>
          <Text style={[{ color: AppTheme.colors.text.primary, fontSize: AppTheme.fontSizes.subtitle, fontWeight: AppTheme.fontWeights.bold }]}>B</Text>
        </View>
        <View style={[AppTheme.styles.flex_column, AppTheme.styles.flex_1, AppTheme.styles.align_items_center]}>
          <Text style={[{ color: AppTheme.colors.text.primary, fontSize: AppTheme.fontSizes.subtitle, fontWeight: AppTheme.fontWeights.bold }]}>4s</Text>
        </View>
        <View style={[AppTheme.styles.flex_column, AppTheme.styles.flex_1, AppTheme.styles.align_items_center]}>
          <Text style={[{ color: AppTheme.colors.text.primary, fontSize: AppTheme.fontSizes.subtitle, fontWeight: AppTheme.fontWeights.bold }]}>6s</Text>
        </View>
        <View style={[AppTheme.styles.flex_column, AppTheme.styles.flex_1, AppTheme.styles.align_items_center]}>
          <Text style={[{ color: AppTheme.colors.text.primary, fontSize: AppTheme.fontSizes.subtitle, fontWeight: AppTheme.fontWeights.bold }]}>SR</Text>
        </View>
      </View>
      {props.data.map((k, i) => {
        return (
          <View key={i} style={[AppTheme.styles.flex_row, AppTheme.styles.border_bottom, AppTheme.styles.padding_16, AppTheme.styles.align_items_center]}>
            <View style={[AppTheme.styles.flex_column, AppTheme.styles.flex_3]}>
              <Text style={[{ color: AppTheme.colors.text.primary, fontSize: AppTheme.fontSizes.subtitle }]}>{k.batsman_player_name}</Text>
              <Text style={[{ color: AppTheme.colors.text.secondary, fontSize: AppTheme.fontSizes.body }]}>{k.how_out}</Text>
            </View>
            <View style={[AppTheme.styles.flex_column, AppTheme.styles.flex_1, AppTheme.styles.align_items_center]}>
              <Text style={[{ color: AppTheme.colors.text.primary, fontSize: AppTheme.fontSizes.subtitle, fontWeight: AppTheme.fontWeights.bold }]}>{k.score}</Text>
            </View>
            <View style={[AppTheme.styles.flex_column, AppTheme.styles.flex_1, AppTheme.styles.align_items_center]}>
              <Text style={[{ color: AppTheme.colors.text.primary, fontSize: AppTheme.fontSizes.subtitle }]}>{k.ball}</Text>
            </View>
            <View style={[AppTheme.styles.flex_column, AppTheme.styles.flex_1, AppTheme.styles.align_items_center]}>
              <Text style={[{ color: AppTheme.colors.text.primary, fontSize: AppTheme.fontSizes.subtitle }]}>{k.four_x}</Text>
            </View>
            <View style={[AppTheme.styles.flex_column, AppTheme.styles.flex_1, AppTheme.styles.align_items_center]}>
              <Text style={[{ color: AppTheme.colors.text.primary, fontSize: AppTheme.fontSizes.subtitle }]}>{k.six_x}</Text>
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

export default ScorecardBattingComponent;
