import { View, Text, StyleSheet, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react';
const ayahData = require('./ayah.json');


const ReadQuran = () => {

    // State to store the ayah data
    const [data, setData] = useState([]);

    // Load data on component mount
    useEffect(() => {
        setData(ayahData); // Assuming ayahData is an array
    }, []);

    return (
        <View>
            <FlatList
                data={data}
                renderItem={Item}
                keyExtractor={item => item.Id}
            />
        </View>
    )
}

export default ReadQuran

const Item = ({ item }) => (
    <View style={styles.item} >
        <View style={{ backgroundColor: 'white', flex: 0.40 }}>
            <View style={{ backgroundColor: 'white', flex: 0.70, flexDirection: 'row' }}>

                <View style={styles.Translation}>
                    <Text style={{ color: 'black', fontWeight: '600', textAlign: 'right' }}>{item.Translation}</Text>
                </View>

                <View style={styles.Arabic}>
                    <Text style={{ color: 'black', fontWeight: '700', textAlign: 'right' }}>{item.AyahTextMuhammadi}</Text>
                </View>

            </View>

            <View style={styles.ParahRakuh}>
                <Text style={{ color: '#696969' }}>پارہ {item.ParahNumber} سورةرکوع {item.SurahNumber}</Text>
            </View>
        </View>
        <View style={styles.Tafseer}>
            <Text style={{
                padding: 10,
                textAlign: 'center',
                fontWeight: '500',
                lineHeight: 25
            }}>{item.Tafseer}</Text>
        </View>

    </View>
)
const styles = StyleSheet.create({
    item: {
        flex: 1,
        backgroundColor: 'grey',
        height: 'auto'
    },
    Translation: {
        backgroundColor: 'lavender',
        flex: 0.50,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    },
    Arabic: {
        backgroundColor: 'lavender',
        flex: 0.50,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    },
    ParahRakuh: {
        backgroundColor: 'white',
        flex: 0.30,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5
    },
    Tafseer: {
        backgroundColor: '#F5F5F5',
        flex: 0.60,
        alignItems: 'center',
        justifyContent: 'center'
    }
})