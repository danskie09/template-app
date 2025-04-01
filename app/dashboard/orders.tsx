import React, { useState } from 'react';
import { View, Text, SafeAreaView, FlatList, TouchableOpacity, Image, ListRenderItem } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Define interfaces for type safety
interface OrderItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

interface Order {
    id: string;
    date: string;
    status: 'pending' | 'processing' | 'completed' | 'delivered' | 'cancelled';
    total: number;
    items: OrderItem[];
}

// Mock orders data
const orders: Order[] = [
    {
        id: 'ORD-001',
        date: '2025-03-30T14:30:00',
        status: 'delivered',
        total: 27.97,
        items: [
            { id: '1', name: 'Classic Burger', price: 8.99, quantity: 2 },
            { id: '4', name: 'Chocolate Milkshake', price: 4.99, quantity: 2 },
        ]
    },
    {
        id: 'ORD-002',
        date: '2025-03-29T12:15:00',
        status: 'completed',
        total: 23.98,
        items: [
            { id: '2', name: 'Margherita Pizza', price: 12.99, quantity: 1 },
            { id: '5', name: 'Veggie Wrap', price: 7.99, quantity: 1 },
            { id: '4', name: 'Chocolate Milkshake', price: 4.99, quantity: 1 },
        ]
    },
    {
        id: 'ORD-003',
        date: '2025-03-31T18:45:00',
        status: 'processing',
        total: 32.97,
        items: [
            { id: '6', name: 'Spicy Wings', price: 10.99, quantity: 2 },
            { id: '3', name: 'Chicken Caesar Salad', price: 9.99, quantity: 1 },
        ]
    },
    {
        id: 'ORD-004',
        date: '2025-04-01T10:30:00',
        status: 'pending',
        total: 16.98,
        items: [
            { id: '3', name: 'Chicken Caesar Salad', price: 9.99, quantity: 1 },
            { id: '4', name: 'Chocolate Milkshake', price: 4.99, quantity: 1 },
            { id: '5', name: 'Veggie Wrap', price: 7.99, quantity: 1 },
        ]
    },
    {
        id: 'ORD-005',
        date: '2025-03-28T20:15:00',
        status: 'cancelled',
        total: 12.99,
        items: [
            { id: '2', name: 'Margherita Pizza', price: 12.99, quantity: 1 },
        ]
    }
];

// Filter types
type FilterType = 'all' | 'pending' | 'processing' | 'completed' | 'delivered' | 'cancelled';

export default function OrdersScreen(): JSX.Element {
    const [activeFilter, setActiveFilter] = useState<FilterType>('all');
    const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

    // Filter orders based on active filter
    const filteredOrders = activeFilter === 'all'
        ? orders
        : orders.filter(order => order.status === activeFilter);

    // Format date to a more readable format
    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // Get status color
    const getStatusColor = (status: Order['status']): string => {
        switch (status) {
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'processing': return 'bg-blue-100 text-blue-800';
            case 'completed': return 'bg-green-100 text-green-800';
            case 'delivered': return 'bg-purple-100 text-purple-800';
            case 'cancelled': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    // Toggle order expansion
    const toggleOrderExpansion = (orderId: string): void => {
        if (expandedOrder === orderId) {
            setExpandedOrder(null);
        } else {
            setExpandedOrder(orderId);
        }
    };

    // Render filter tabs
    const renderFilterItem: ListRenderItem<FilterType> = ({ item }) => (
        <TouchableOpacity
            onPress={() => setActiveFilter(item)}
            className={`px-4 py-2 mr-2 rounded-full ${activeFilter === item ? 'bg-[#3077e3]' : 'bg-gray-100'}`}
        >
            <Text
                className={`capitalize ${activeFilter === item ? 'text-white' : 'text-gray-800'}`}
            >
                {item}
            </Text>
        </TouchableOpacity>
    );

    // Render order item
    const renderOrderItem: ListRenderItem<Order> = ({ item }) => {
        const isExpanded = expandedOrder === item.id;
        const statusColorClass = getStatusColor(item.status);

        return (
            <TouchableOpacity
                className="bg-white rounded-xl shadow-sm mb-4 overflow-hidden"
                onPress={() => toggleOrderExpansion(item.id)}
                activeOpacity={0.9}
            >
                <View className="p-4">
                    <View className="flex-row justify-between items-center mb-2">
                        <Text className="text-lg font-bold text-gray-800">{item.id}</Text>
                        <View className={`px-2 py-1 rounded-full ${statusColorClass.split(' ')[0]}`}>
                            <Text className={`text-xs font-medium capitalize ${statusColorClass.split(' ')[1]}`}>
                                {item.status}
                            </Text>
                        </View>
                    </View>

                    <View className="flex-row justify-between items-center mb-2">
                        <Text className="text-gray-600">{formatDate(item.date)}</Text>
                        <Text className="text-[#3077e3] font-bold">${item.total.toFixed(2)}</Text>
                    </View>

                    <View className="flex-row">
                        <Text className="text-gray-600">
                            {item.items.length} {item.items.length === 1 ? 'item' : 'items'}
                        </Text>
                        <Text className="text-gray-600 ml-auto">
                            {isExpanded ? 'Hide details' : 'View details'}
                            <Ionicons
                                name={isExpanded ? "chevron-up" : "chevron-down"}
                                size={14}
                                color="#666"
                                style={{ marginLeft: 4 }}
                            />
                        </Text>
                    </View>

                    {isExpanded && (
                        <View className="mt-4 pt-4 border-t border-gray-100">
                            <Text className="text-gray-800 font-bold mb-2">Order Items:</Text>
                            {item.items.map((orderItem, index) => (
                                <View key={index} className="flex-row justify-between py-2">
                                    <View className="flex-row items-center">
                                        <Image
                                            source={require('../../assets/images/image-placeholder.png')}
                                            className="w-10 h-10 rounded"
                                            resizeMode="cover"
                                        />
                                        <View className="ml-2">
                                            <Text className="text-gray-800">{orderItem.name}</Text>
                                            <Text className="text-gray-500 text-xs">
                                                ${orderItem.price.toFixed(2)} x {orderItem.quantity}
                                            </Text>
                                        </View>
                                    </View>
                                    <Text className="text-gray-800 font-medium">
                                        ${(orderItem.price * orderItem.quantity).toFixed(2)}
                                    </Text>
                                </View>
                            ))}

                            <View className="mt-4 pt-4 border-t border-gray-100 flex-row justify-between">
                                <Text className="text-gray-800 font-bold">Total</Text>
                                <Text className="text-[#3077e3] font-bold">${item.total.toFixed(2)}</Text>
                            </View>

                            {(item.status === 'pending' || item.status === 'processing') && (
                                <View className="mt-4 flex-row">
                                    <TouchableOpacity className="bg-[#3077e3] px-4 py-2 rounded-lg flex-1 mr-2 items-center">
                                        <Text className="text-white">Track Order</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity className="border border-red-500 px-4 py-2 rounded-lg flex-1 ml-2 items-center">
                                        <Text className="text-red-500">Cancel</Text>
                                    </TouchableOpacity>
                                </View>
                            )}

                            {item.status === 'delivered' && (
                                <TouchableOpacity className="mt-4 bg-[#3077e3] px-4 py-2 rounded-lg items-center">
                                    <Text className="text-white">Reorder</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    )}
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            {/* Header */}
            <View className="px-4 pt-4 pb-2">
                <Text className="text-gray-800 text-lg font-bold">My Orders</Text>
                <Text className="text-gray-500">Track your recent orders</Text>
            </View>

            {/* Filters */}
            <View className="mt-2 mb-4">
                <FlatList
                    data={['all', 'pending', 'processing', 'completed', 'delivered', 'cancelled'] as FilterType[]}
                    renderItem={renderFilterItem}
                    keyExtractor={(item) => item}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 16 }}
                />
            </View>

            {/* Orders list */}
            {filteredOrders.length > 0 ? (
                <FlatList
                    data={filteredOrders}
                    renderItem={renderOrderItem}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ padding: 16 }}
                />
            ) : (
                <View className="flex-1 justify-center items-center px-4">
                    <Ionicons name="receipt-outline" size={64} color="#ccc" />
                    <Text className="text-xl font-bold text-gray-800 mt-4">No Orders Found</Text>
                    <Text className="text-gray-600 text-center mt-2">
                        You don't have any {activeFilter !== 'all' ? activeFilter : ''} orders yet.
                    </Text>
                    <TouchableOpacity
                        className="mt-6 bg-[#3077e3] px-6 py-3 rounded-xl"
                        onPress={() => setActiveFilter('all')}
                    >
                        <Text className="text-white font-bold">View All Orders</Text>
                    </TouchableOpacity>
                </View>
            )}
        </SafeAreaView>
    );
}