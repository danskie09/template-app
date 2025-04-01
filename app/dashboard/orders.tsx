import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';

export default function OrdersScreen() {
    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="flex-1 justify-center items-center">
                <Text className="text-xl font-bold text-gray-800">Orders</Text>
                <Text className="text-gray-600 mt-2">Your orders will be listed here</Text>
            </View>
        </SafeAreaView>
    );
}