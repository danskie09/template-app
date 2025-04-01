import React, { useState } from 'react';
import { View, Text, SafeAreaView, Image, FlatList, TouchableOpacity, ListRenderItem } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

// Define interfaces for type safety
interface FoodItem {
    id: string;
    name: string;
    price: number;
    description: string;
    category: string;
    rating: number;
}

interface CartItems {
    [key: string]: number;
}

// Mock food data
const foodItems: FoodItem[] = [
    {
        id: '1',
        name: 'Classic Burger',
        price: 8.99,
        description: 'Juicy beef patty with lettuce, tomato, and special sauce',
        category: 'Burgers',
        rating: 4.5,
    },
    {
        id: '2',
        name: 'Margherita Pizza',
        price: 12.99,
        description: 'Fresh mozzarella, tomatoes, and basil on our homemade crust',
        category: 'Pizza',
        rating: 4.7,
    },
    {
        id: '3',
        name: 'Chicken Caesar Salad',
        price: 9.99,
        description: 'Grilled chicken with romaine lettuce, croutons, and Caesar dressing',
        category: 'Salads',
        rating: 4.2,
    },
    {
        id: '4',
        name: 'Chocolate Milkshake',
        price: 4.99,
        description: 'Creamy chocolate shake topped with whipped cream',
        category: 'Drinks',
        rating: 4.8,
    },
    {
        id: '5',
        name: 'Veggie Wrap',
        price: 7.99,
        description: 'Fresh vegetables and hummus in a whole wheat wrap',
        category: 'Wraps',
        rating: 4.3,
    },
    {
        id: '6',
        name: 'Spicy Wings',
        price: 10.99,
        description: 'Crispy chicken wings tossed in our spicy buffalo sauce',
        category: 'Appetizers',
        rating: 4.6,
    },
];

// Food categories
const categories: string[] = [
    'All', 'Burgers', 'Pizza', 'Salads', 'Drinks', 'Wraps', 'Appetizers'
];

export default function FoodsScreen(): JSX.Element {
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [cartItems, setCartItems] = useState<CartItems>({});

    // Filter foods by category
    const filteredFoods = selectedCategory === 'All'
        ? foodItems
        : foodItems.filter(item => item.category === selectedCategory);

    // Add to cart function
    const addToCart = (itemId: string): void => {
        setCartItems(prev => ({
            ...prev,
            [itemId]: (prev[itemId] || 0) + 1
        }));
    };

    // Remove from cart function
    const removeFromCart = (itemId: string): void => {
        setCartItems(prev => {
            const newCart = { ...prev };
            if (newCart[itemId] > 1) {
                newCart[itemId]--;
            } else {
                delete newCart[itemId];
            }
            return newCart;
        });
    };

    // Handle checkout
    const handleCheckout = (): void => {
        // Here you would typically navigate to checkout screen
        // For now, just navigate to orders page
        router.push('/dashboard/orders');
    };

    // Calculate total items in cart
    const totalItems: number = Object.values(cartItems).reduce((sum, count) => sum + count, 0);

    // Calculate total price
    const totalPrice: number = Object.entries(cartItems).reduce((sum, [itemId, count]) => {
        const item = foodItems.find(food => food.id === itemId);
        return sum + (item ? item.price * count : 0);
    }, 0);

    // Render category pills
    const renderCategoryItem: ListRenderItem<string> = ({ item }) => (
        <TouchableOpacity
            onPress={() => setSelectedCategory(item)}
            className={`px-4 py-2 mr-2 rounded-full ${selectedCategory === item ? 'bg-[#3077e3]' : 'bg-gray-100'}`}
        >
            <Text className={`${selectedCategory === item ? 'text-white' : 'text-gray-800'}`}>{item}</Text>
        </TouchableOpacity>
    );

    // Render food item
    const renderFoodItem: ListRenderItem<FoodItem> = ({ item }) => (
        <View className="bg-white rounded-xl shadow-sm mb-4 overflow-hidden">
            <Image
                source={require('../../assets/images/image-placeholder.png')}
                className="w-full h-40"
                resizeMode="cover"
            />
            <View className="p-4">
                <View className="flex-row justify-between items-center mb-2">
                    <Text className="text-lg font-bold text-gray-800">{item.name}</Text>
                    <View className="flex-row items-center">
                        <Ionicons name="star" size={16} color="#FFD700" />
                        <Text className="ml-1 text-gray-700">{item.rating}</Text>
                    </View>
                </View>
                <Text className="text-gray-600 mb-3" numberOfLines={2}>{item.description}</Text>
                <View className="flex-row justify-between items-center">
                    <Text className="text-[#3077e3] font-bold text-lg">${item.price.toFixed(2)}</Text>
                    <View className="flex-row items-center">
                        {cartItems[item.id] ? (
                            <View className="flex-row items-center">
                                <TouchableOpacity
                                    onPress={() => removeFromCart(item.id)}
                                    className="bg-gray-100 w-8 h-8 rounded-full items-center justify-center"
                                >
                                    <Ionicons name="remove" size={18} color="#666" />
                                </TouchableOpacity>
                                <Text className="mx-3 font-bold">{cartItems[item.id]}</Text>
                                <TouchableOpacity
                                    onPress={() => addToCart(item.id)}
                                    className="bg-gray-100 w-8 h-8 rounded-full items-center justify-center"
                                >
                                    <Ionicons name="add" size={18} color="#666" />
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <TouchableOpacity
                                onPress={() => addToCart(item.id)}
                                className="bg-[#3077e3] px-4 py-2 rounded-full flex-row items-center"
                            >
                                <Ionicons name="cart-outline" size={16} color="white" />
                                <Text className="text-white ml-1">Add</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </View>
        </View>
    );

    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            {/* Header */}
            <View className="px-4 pt-4 pb-2 flex-row justify-between items-center">
                <View>
                    <Text className="text-gray-800 text-lg font-bold">Food Menu</Text>
                    <Text className="text-gray-500">Find your favorite meal</Text>
                </View>
                <TouchableOpacity className="relative">
                    <Ionicons name="cart-outline" size={28} color="#333" />
                    {totalItems > 0 && (
                        <View className="absolute -top-2 -right-2 bg-red-500 rounded-full w-5 h-5 items-center justify-center">
                            <Text className="text-white text-xs font-bold">{totalItems}</Text>
                        </View>
                    )}
                </TouchableOpacity>
            </View>

            {/* Categories scroll */}
            <View className="mt-2 mb-4">
                <FlatList
                    data={categories}
                    renderItem={renderCategoryItem}
                    keyExtractor={(item) => item}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 16 }}
                />
            </View>

            {/* Food items */}
            <FlatList
                data={filteredFoods}
                renderItem={renderFoodItem}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ padding: 16 }}
            />

            {/* Cart summary - show when items in cart */}
            {totalItems > 0 && (
                <View className="absolute bottom-4 left-4 right-4 bg-white p-4 rounded-xl shadow-md flex-row justify-between items-center">
                    <View>
                        <Text className="text-gray-800 font-bold">{totalItems} {totalItems === 1 ? 'item' : 'items'}</Text>
                        <Text className="text-[#3077e3] font-bold text-lg">${totalPrice.toFixed(2)}</Text>
                    </View>
                    <TouchableOpacity
                        className="bg-[#3077e3] px-6 py-3 rounded-xl"
                        onPress={handleCheckout}
                    >
                        <Text className="text-white font-bold">Checkout</Text>
                    </TouchableOpacity>
                </View>
            )}
        </SafeAreaView>
    );
}