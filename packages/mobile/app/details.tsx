import { View, Text, StyleSheet } from 'react-native';

export default function DetailsScreen() {
    return (
        <View style={styles.container}>
            <Text>
                Hey hey this is KarmaBridge web client.
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
