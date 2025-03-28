import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


//store data
const storeData = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error('Error saving data', error);
    }
};

// Retrieve data
const getData = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        return value ? JSON.parse(value) : null;
    } catch (error) {
        console.error('Error reading data', error);
    }
};

const ReadQuran = ({navigation}) => {

    // State to store the ayah data
    const [data, setData] = useState([]);

    const getQuranFromApiAsync = async () => {
        try {
            const response = await fetch(
                'https://api.alquran.cloud/v1/quran/en.asad',
            );
            const json = await response.json();
            await storeData("Surahs", json);
            return json;
        } catch (error) {
            console.error(error);
        }
    };

    // Load data on component mount
    useEffect(() => {
        const fetchData = async()=>{
            const storedData = await getData("Surahs");
            if(storedData){
                console.log("Using stored Data");
                setData(storedData.data.surahs);
            }
            else{
                console.log("Fetching from API");
                const newData = await getQuranFromApiAsync();
                if(newData){
                    setData(newData.data.surahs);
                }
            }
        }
        fetchData();
    }, []);

    return (
        <View>
            <FlatList
                data={data}
                renderItem={({item}) => <Item item={item} navigation={navigation}  />}
                keyExtractor={item => item.number}
            />
        </View>
    )
}

export default ReadQuran


const Item = ({ item, navigation }) => (
    <TouchableOpacity style = {{backgroundColor: 'white', flex: 1}} 
    onPress={()=>navigation.navigate('Surah Screen', {selectedSurah: item})}
    >
        <View style={styles.item}>
            <View style={styles.Arabic}>
                <Text style={{ color: '#7851A9', fontSize: 17, fontWeight: '800' }}> ({item.englishName})  {item.name}</Text>
            </View>

            <View style={styles.ParahRakuh}>
                <Text style={{ color: '#7851A9', fontSize: 17, fontWeight: '700' }}> سورة {item.number}</Text>
            </View>
        </View>
    </TouchableOpacity>
)



const styles = StyleSheet.create({
    item: {
        flex: 1,
        backgroundColor: '#FFE4E1',
        height: '90',
        flexDirection: 'row',
        borderWidth: 1,
        borderRadius: 30,
        marginTop: 12,
        marginStart: 5,
        marginEnd: 5,
    },
    Arabic: {
        flex: 0.75,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        marginStart: 5,
        marginEnd: 5,
        marginBottom: 10,
    },
    ParahRakuh: {
        flex: 0.25,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        marginStart: 5,
        marginEnd: 5,
        marginBottom: 10,
        padding: 10
    },
})