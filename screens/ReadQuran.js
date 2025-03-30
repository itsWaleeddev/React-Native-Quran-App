import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Button } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Store data in AsyncStorage
const storeData = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error('Error saving data', error);
    }
};

// Retrieve data from AsyncStorage
const getData = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        return value ? JSON.parse(value) : null;
    } catch (error) {
        console.error('Error reading data', error);
    }
};

const ReadQuran = ({ navigation }) => {
    // State variables
    const [data, setData] = useState([]);  // Stores the Quran data
    const [refreshing, setRefreshing] = useState(false); // Pull to refresh state
    const [loading, setLoading] = useState(false); // Infinite Scroll loading state
    const [page, setPage] = useState(1); // Current page number
    const flatListRef = useRef(null); // Reference for FlatList scrolling

    // Fetch Quran data from API
    const getQuranFromApiAsync = async () => {
        try {
            const response = await fetch('https://api.alquran.cloud/v1/quran/en.asad');
            const json = await response.json();
            await storeData("Surahs", json);
            return json;
        } catch (error) {
            console.error(error);
        }
    };

    // Load initial data
    useEffect(() => {
        const fetchData = async () => {
            const storedData = await getData("Surahs");
            if (storedData) {
                console.log("Using stored data");
                setData(storedData.data.surahs.slice(0, 10)); // Load first 10 surahs
            } else {
                console.log("Fetching from API");
                const newData = await getQuranFromApiAsync();
                if (newData) {
                    setData(newData.data.surahs.slice(0, 10));
                }
            }
        };
        fetchData();
    }, []);

    // Pull to refresh function
    const onRefresh = async () => {
        setRefreshing(true);
        const newData = await getQuranFromApiAsync();
        if (newData) {
            setData(newData.data.surahs.slice(0, 10));
            setPage(1);
        }
        setRefreshing(false);
    };

    // Load more data for pagination (infinite scroll)
    const loadMoreData = async () => {
        if (loading) return;
        setLoading(true);

        const storedData = await getData("Surahs");
        if (storedData) {
            const newPage = page + 1;
            const moreData = storedData.data.surahs.slice(0, newPage * 10);
            setData(moreData);
            setPage(newPage);
        }

        setLoading(false);
    };

    // Scroll to a specific index (e.g., Surah number)
    const scrollToIndex = (index) => {
        if (flatListRef.current) {
            flatListRef.current.scrollToIndex({ index, animated: true });
        }
    };

    return (
        <View style={{ flex: 1, paddingBottom: 20 }}>
            {/* Button to scroll to a specific Surah */}
            <Button title="Go to Surah 5" onPress={() => scrollToIndex(4)} />

            <FlatList
                ref={flatListRef}
                data={data}
                renderItem={({ item }) => <Item item={item} navigation={navigation} />}
                keyExtractor={item => item.number.toString()}
                
                // Pull to refresh
                refreshing={refreshing}
                onRefresh={onRefresh}

                // Infinite scroll (pagination)
                onEndReached={loadMoreData}
                onEndReachedThreshold={0.5}

                // Handle scroll errors when using scrollToIndex
                getItemLayout={(data, index) => ({
                    length: 80, // Height of each item
                    offset: 80 * index,
                    index
                })}
            />

            {loading && <ActivityIndicator size="large" color="blue" />}
        </View>
    );
};

export default ReadQuran;

// Item Component
const Item = ({ item, navigation }) => (
    <TouchableOpacity 
        style={styles.item} 
        onPress={() => navigation.navigate('Surah Screen', { selectedSurah: item })}
    >
        <View style={styles.Arabic}>
            <Text style={styles.text}> ({item.englishName})  {item.name}</Text>
        </View>
        <View style={styles.ParahRakuh}>
            <Text style={styles.text}> سورة {item.number}</Text>
        </View>
    </TouchableOpacity>
);

// Styles
const styles = StyleSheet.create({
    item: {
        flex: 1,
        backgroundColor: '#FFE4E1',
        height: 80,
        flexDirection: 'row',
        borderWidth: 1,
        borderRadius: 30,
        margin: 5,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    Arabic: {
        flex: 0.75,
        alignItems: 'center',
        justifyContent: 'center',
    },
    ParahRakuh: {
        flex: 0.25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: '#7851A9',
        fontSize: 17,
        fontWeight: '800',
    },
});
