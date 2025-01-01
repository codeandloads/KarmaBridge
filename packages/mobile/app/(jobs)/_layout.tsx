import {Stack} from "expo-router";
import {StyleSheet, Text, View} from "react-native";

export default function JobLayout() {
    return <View
        style={styles.container}
    >
        <Text>This is jobs page root layout</Text>
    </View>;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
