import {StyleSheet, Text, View} from "react-native";
import {Link} from "expo-router";

export default function Index() {
    return (
        <View style={styles.container}>
            <Text>
                Home Page/Screen
            </Text>
            <Link href={"/(posts)"}>Posts</Link>
            <Link href={"/(jobs)"}>Jobs</Link>
            <Link href={"/details"}>Details</Link>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }
})
