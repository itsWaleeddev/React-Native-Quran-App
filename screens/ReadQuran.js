import { View, Text, StyleSheet, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react';


const ReadQuran = () => {

    // State to store the ayah data
    const [data, setData] = useState([]);

    const getQuranFromApiAsync = async () => {
        try {
          const response = await fetch(
            'https://api.alquran.cloud/v1/quran/en.asad',
          );
          const json = await response.json();
          setData(json.data.surahs);
        } catch (error) {
          console.error(error);
        }
      };    
      
    // Load data on component mount
    useEffect(() => {
        getQuranFromApiAsync();
    }, []);

    return (
        <View>
            <FlatList
                data={data}
                renderItem={({item}) => <Item item={item} />}
                keyExtractor={item => item.number}
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
                    <Text style={{ color: 'black', fontWeight: '600', textAlign: 'right' }}>{item.name}</Text>
                </View>

                <View style={styles.Arabic}>
                    <Text style={{ color: 'black', fontWeight: '700', textAlign: 'right' }}>{item.englishName}</Text>
                </View>

            </View>

            <View style={styles.ParahRakuh}>
                <Text style={{ color: '#696969' }}> سورة {item.number}</Text>
            </View>
        </View>
       {/* <View style={styles.Tafseer}>
            <Text style={{
                padding: 10,
                textAlign: 'center',
                fontWeight: '500',
                lineHeight: 25
            }}>{item.Tafseer}</Text>
        </View>
        */}

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