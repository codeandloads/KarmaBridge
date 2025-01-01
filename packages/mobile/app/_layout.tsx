import {Stack} from "expo-router";
import {StyleSheet} from "react-native";

export default function RootLayout() {
    return <Stack
        screenOptions={{
            headerStyle: {
                backgroundColor: '#07575a',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        }}
    >
        <Stack.Screen name="(posts)"/>
        <Stack.Screen name="(jobs)"/>
        <Stack.Screen name="details"/>
    </Stack>;
}