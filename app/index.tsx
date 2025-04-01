import React from 'react';
import { View, Text, Image, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const Index = () => {
    const router = useRouter();

    return (
        <>
            <StatusBar barStyle="dark-content" backgroundColor="white" />
            <SafeAreaView className="flex-1 bg-white">
                <View className="flex-1 justify-center items-center px-6">
                    {/* App Logo */}
                    <Image
                        source={require('../assets/images/image-placeholder.png')}
                        className="w-[150px] h-[150px] mb-10"
                        resizeMode="contain"
                    />

                    <Text className="text-3xl font-bold text-gray-800 mb-2">Welcome</Text>
                    <Text className="text-gray-600 text-center mb-10">
                        Sign in to continue or create a new account
                    </Text>

                    {/* Login Button */}
                    <TouchableOpacity
                        className="bg-[#3077e3] w-full py-4 rounded-xl flex-row justify-center items-center mb-4"
                        onPress={() => router.push('/login')}
                    >
                        <Ionicons name="log-in-outline" size={20} color="white" />
                        <Text className="text-white text-base ml-2">Log In</Text>
                    </TouchableOpacity>

                    {/* Sign Up Button */}
                    <TouchableOpacity
                        className="border border-[#3077e3] w-full py-4 rounded-xl flex-row justify-center items-center"
                        onPress={() => router.push('/signup')}
                    >
                        <Ionicons name="person-add-outline" size={20} color="#3077e3" />
                        <Text className="text-[#3077e3] text-base ml-2">Create Account</Text>
                    </TouchableOpacity>



                </View>
            </SafeAreaView>
        </>
    );
};

export default Index;