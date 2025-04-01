import React from 'react';
import { View, Text, SafeAreaView, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

// Define interfaces for type safety
interface UserProfile {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    joinDate: string;
    imageUrl: string | null;
    stats: {
        orders: number;
        favorites: number;
        reviews: number;
    };
}

// Mock user data
const userData: UserProfile = {
    id: 'USR-1234',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main Street, Anytown, CA 94321',
    joinDate: '2024-01-15',
    imageUrl: null, // We'll use a placeholder
    stats: {
        orders: 17,
        favorites: 8,
        reviews: 12
    }
};

export default function ProfileScreen(): JSX.Element {
    // Format date for display
    const formatJoinDate = (dateString: string): string => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'long',
            year: 'numeric'
        });
    };

    // Handle logout
    const handleLogout = (): void => {
        // In a real app, you would clear auth tokens/state here
        router.replace('/login');
    };

    // Profile menu items
    const menuItems = [
        {
            icon: 'location-outline',
            title: 'Delivery Addresses',
            subtitle: 'Manage your delivery locations',
            action: () => console.log('Navigate to addresses')
        },
        {
            icon: 'card-outline',
            title: 'Payment Methods',
            subtitle: 'Manage your payment options',
            action: () => console.log('Navigate to payment methods')
        },
        {
            icon: 'heart-outline',
            title: 'Favorite Foods',
            subtitle: 'View your saved favorites',
            action: () => console.log('Navigate to favorites')
        },
        {
            icon: 'star-outline',
            title: 'My Reviews',
            subtitle: 'Manage your food reviews',
            action: () => console.log('Navigate to reviews')
        },
        {
            icon: 'notifications-outline',
            title: 'Notifications',
            subtitle: 'Manage your notifications',
            action: () => console.log('Navigate to notifications')
        },
        {
            icon: 'shield-checkmark-outline',
            title: 'Privacy & Security',
            subtitle: 'Manage your privacy settings',
            action: () => console.log('Navigate to privacy')
        },
        {
            icon: 'help-circle-outline',
            title: 'Help & Support',
            subtitle: 'Get help or contact support',
            action: () => console.log('Navigate to help')
        }
    ];

    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Profile Header */}
                <View className="bg-white p-4 items-center">
                    <View className="relative">
                        <Image
                            source={require('../../assets/images/image-placeholder.png')}
                            className="w-24 h-24 rounded-full"
                            resizeMode="cover"
                        />
                        <TouchableOpacity
                            className="absolute right-0 bottom-0 bg-[#3077e3] p-2 rounded-full border-2 border-white"
                        >
                            <Ionicons name="camera-outline" size={18} color="white" />
                        </TouchableOpacity>
                    </View>

                    <Text className="mt-4 text-xl font-bold text-gray-800">{userData.name}</Text>
                    <Text className="text-gray-500">{userData.email}</Text>

                    <TouchableOpacity
                        className="mt-4 flex-row items-center bg-gray-100 px-4 py-2 rounded-full"
                    >
                        <Ionicons name="create-outline" size={16} color="#666" />
                        <Text className="text-gray-700 ml-1">Edit Profile</Text>
                    </TouchableOpacity>

                    <View className="w-full border-t border-gray-100 mt-6 pt-4">
                        <Text className="text-gray-500 text-center">
                            Member since {formatJoinDate(userData.joinDate)}
                        </Text>
                    </View>
                </View>

                {/* Stats Section */}
                <View className="flex-row justify-around bg-white mt-2 py-4">
                    <View className="items-center">
                        <Text className="text-2xl font-bold text-gray-800">{userData.stats.orders}</Text>
                        <Text className="text-gray-500">Orders</Text>
                    </View>
                    <View className="items-center">
                        <Text className="text-2xl font-bold text-gray-800">{userData.stats.favorites}</Text>
                        <Text className="text-gray-500">Favorites</Text>
                    </View>
                    <View className="items-center">
                        <Text className="text-2xl font-bold text-gray-800">{userData.stats.reviews}</Text>
                        <Text className="text-gray-500">Reviews</Text>
                    </View>
                </View>

                {/* Profile Menu */}
                <View className="mt-2 bg-white">
                    {menuItems.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={item.action}
                            className={`flex-row items-center px-4 py-4 ${index < menuItems.length - 1 ? 'border-b border-gray-100' : ''
                                }`}
                        >
                            <View className="bg-gray-100 w-10 h-10 rounded-full items-center justify-center mr-3">
                                <Ionicons name={item.icon} size={20} color="#666" />
                            </View>
                            <View className="flex-1">
                                <Text className="text-gray-800 font-medium">{item.title}</Text>
                                <Text className="text-gray-500 text-sm">{item.subtitle}</Text>
                            </View>
                            <Ionicons name="chevron-forward" size={20} color="#ccc" />
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Logout Button */}
                <View className="mt-2 mb-8 px-4">
                    <TouchableOpacity
                        className="bg-red-50 py-4 rounded-xl items-center flex-row justify-center"
                        onPress={handleLogout}
                    >
                        <Ionicons name="log-out-outline" size={20} color="#EF4444" />
                        <Text className="text-red-500 font-medium ml-2">Log Out</Text>
                    </TouchableOpacity>
                </View>

                {/* App Version */}
                <View className="items-center mb-8">
                    <Text className="text-gray-400 text-sm">App Version 1.0.0</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}