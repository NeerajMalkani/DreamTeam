import { View, ScrollView, Text } from "react-native";
import AppTheme from "../../infrastructure/apptheme/index";

const Live = (props) => {
  return (
    <View style={AppTheme.styles.flex_1}>
      <ScrollView style={AppTheme.styles.flex_1}>
        <View style={AppTheme.styles.flex_1}>
          <Text>Live Team</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default Live;
