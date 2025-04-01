import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    StatusBar,
    Image,
    ScrollView,
    ActivityIndicator
} from 'react-native';
import { Link, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const SignUp = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [agreeToTerms, setAgreeToTerms] = useState(false);

    const handleSignUp = () => {
        // Simple UI simulation with no backend
        setLoading(true);

        // Simulate a network request
        setTimeout(() => {
            setLoading(false);

        }, 1500);
    };

    return (
        <>
            <StatusBar barStyle="dark-content" backgroundColor="white" />
            <SafeAreaView className="flex-1 bg-white">
                <ScrollView showsVerticalScrollIndicator={false}>
                    {/* Back button */}
                    <TouchableOpacity
                        onPress={() => router.back()}
                        className="p-4"
                    >
                        <Ionicons name="arrow-back" size={24} color="#333" />
                    </TouchableOpacity>

                    {/* Header */}
                    <View className="items-center px-8 mt-2">
                        <Image
                            source={require('../assets/images/image-placeholder.png')}
                            className="w-20 h-20 mb-4"
                            resizeMode="contain"
                        />
                        <Text className="text-2xl font-bold text-gray-800 mb-2">Create Account</Text>
                        <Text className="text-gray-600 text-center mb-6">
                            Sign up to get started with our app
                        </Text>
                    </View>

                    {/* Signup Form */}
                    <View className="px-8">
                        {/* Full Name Input */}
                        <View className="mb-4">
                            <Text className="text-gray-700 mb-2 ml-1">Full Name</Text>
                            <View className="flex-row items-center bg-gray-100 rounded-xl px-3">
                                <Ionicons name="person-outline" size={20} color="#666" />
                                <TextInput
                                    className="flex-1 py-3 px-2 text-gray-800"
                                    placeholder="Enter your full name"
                                    value={fullName}
                                    onChangeText={setFullName}
                                    autoCapitalize="words"
                                />
                            </View>
                        </View>

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
                        <View className="mb-4">
                            <Text className="text-gray-700 mb-2 ml-1">Password</Text>
                            <View className="flex-row items-center bg-gray-100 rounded-xl px-3">
                                <Ionicons name="lock-closed-outline" size={20} color="#666" />
                                <TextInput
                                    className="flex-1 py-3 px-2 text-gray-800"
                                    placeholder="Create a password"
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
                            <Text className="text-xs text-gray-500 mt-1 ml-1">
                                Password must be at least 8 characters
                            </Text>
                        </View>

                        {/* Confirm Password Input */}
                        <View className="mb-6">
                            <Text className="text-gray-700 mb-2 ml-1">Confirm Password</Text>
                            <View className="flex-row items-center bg-gray-100 rounded-xl px-3">
                                <Ionicons name="lock-closed-outline" size={20} color="#666" />
                                <TextInput
                                    className="flex-1 py-3 px-2 text-gray-800"
                                    placeholder="Confirm your password"
                                    value={confirmPassword}
                                    onChangeText={setConfirmPassword}
                                    secureTextEntry={!showConfirmPassword}
                                />
                                <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                                    <Ionicons
                                        name={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
                                        size={20}
                                        color="#666"
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Terms and Conditions Checkbox */}
                        <TouchableOpacity
                            className="flex-row items-center mb-6"
                            onPress={() => setAgreeToTerms(!agreeToTerms)}
                        >
                            <View className={`w-5 h-5 border rounded mr-2 items-center justify-center ${agreeToTerms ? 'bg-[#3077e3] border-[#3077e3]' : 'border-gray-400'}`}>
                                {agreeToTerms && <Ionicons name="checkmark" size={14} color="white" />}
                            </View>
                            <Text className="text-gray-700 flex-1">
                                I agree to the <Text className="text-[#3077e3]">Terms & Conditions</Text> and <Text className="text-[#3077e3]">Privacy Policy</Text>
                            </Text>
                        </TouchableOpacity>

                        {/* Sign Up Button */}
                        <TouchableOpacity
                            className={`py-4 rounded-xl items-center ${agreeToTerms ? 'bg-[#3077e3]' : 'bg-gray-300'}`}
                            onPress={handleSignUp}
                            disabled={loading || !agreeToTerms}
                        >
                            {loading ? (
                                <ActivityIndicator color="white" />
                            ) : (
                                <Text className="text-white font-semibold text-base">Create Account</Text>
                            )}
                        </TouchableOpacity>

                        {/* Login Link */}
                        <View className="flex-row justify-center mt-8 mb-10">
                            <Text className="text-gray-600">Already have an account? </Text>
                            <TouchableOpacity onPress={() => router.push('/login')}>
                                <Text className="text-[#3077e3] font-semibold">Log In</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    );
};

export default SignUp;