import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, StatusBar, Image, ActivityIndicator } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = () => {
        // This is just UI simulation - no actual backend connection
        setLoading(true);

        // Simulate a delay as if connecting to backend
        setTimeout(() => {
            setLoading(false);
            // Navigate to home screen 
            router.push('/dashboard' as any);
        }, 1500);
    };

    return (
        <>
            <StatusBar barStyle="dark-content" backgroundColor="white" />
            <SafeAreaView className="flex-1 bg-white">
                {/* Back button */}
                <TouchableOpacity
                    onPress={() => router.back()}
                    className="p-4"
                >
                    <Ionicons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>

                {/* Header */}
                <View className="items-center px-8 mt-4">
                    <Image
                        source={require('../assets/images/image-placeholder.png')}
                        className="w-24 h-24 mb-6"
                        resizeMode="contain"
                    />
                    <Text className="text-2xl font-bold text-gray-800 mb-2">Welcome Back</Text>
                    <Text className="text-gray-600 text-center mb-8">
                        Log in to your account to continue
                    </Text>
                </View>

                {/* Login Form */}
                <View className="px-8 mt-4">
                    {/* Email Input */}
                    <View className="mb-4">
                        <Text className="text-gray-700 mb-2 ml-1">Email</Text>
                        <View className="flex-row items-center bg-gray-100 rounded-xl px-3">
                            <Ionicons name="mail-outline" size={20} color="#666" />
                            <TextInput
                                className="flex-1 py-3 px-2 text-gray-800"
                                placeholder="Enter your email"
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        </View>
                    </View>

                    {/* Password Input */}
                    <View className="mb-6">
                        <Text className="text-gray-700 mb-2 ml-1">Password</Text>
                        <View className="flex-row items-center bg-gray-100 rounded-xl px-3">
                            <Ionicons name="lock-closed-outline" size={20} color="#666" />
                            <TextInput
                                className="flex-1 py-3 px-2 text-gray-800"
                                placeholder="Enter your password"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={!showPassword}
                            />
                            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                                <Ionicons
                                    name={showPassword ? "eye-off-outline" : "eye-outline"}
                                    size={20}
                                    color="#666"
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Forgot Password */}
                    <TouchableOpacity
                        className="self-end mb-6"

                    >
                        <Text className="text-[#3077e3]">Forgot Password?</Text>
                    </TouchableOpacity>

                    {/* Login Button */}
                    <TouchableOpacity
                        className="bg-[#3077e3] py-4 rounded-xl items-center"
                        onPress={handleLogin}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator color="white" />
                        ) : (
                            <Text className="text-white font-semibold text-base">Log In</Text>
                        )}
                    </TouchableOpacity>

                    {/* Sign Up Link */}
                    <View className="flex-row justify-center mt-8">
                        <Text className="text-gray-600">Don't have an account? </Text>
                        <TouchableOpacity onPress={() => router.push('/signup')}>
                            <Text className="text-[#3077e3] font-semibold">Sign Up</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Social Login Buttons */}
                    <View className="mt-10">
                        <Text className="text-center text-gray-500 mb-4">Or continue with</Text>
                        <View className="flex-row justify-center space-x-4">
                            <TouchableOpacity className="bg-gray-100 p-3 rounded-full">
                                <Ionicons name="logo-google" size={24} color="#DB4437" />
                            </TouchableOpacity>
                            <TouchableOpacity className="bg-gray-100 p-3 rounded-full">
                                <Ionicons name="logo-apple" size={24} color="#000" />
                            </TouchableOpacity>
                            <TouchableOpacity className="bg-gray-100 p-3 rounded-full">
                                <Ionicons name="logo-facebook" size={24} color="#3b5998" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        </>
    );
};

export default Login;