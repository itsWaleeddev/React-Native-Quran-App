import { View, Text, StyleSheet, FlatList, RefreshControl } from 'react-native';
import React, { useState, useEffect, useCallback, useContext } from 'react';
import { LanguageContext } from '../LanguageContext'; // Import LanguageContext
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

const EnglishData = require('../Data/1- english.json');
const UrduData = require('../Data/2- urdu.json');

const ReadQuran = ({ navigation }) => {
  const { language, showTafseer } = useContext(LanguageContext); // Destructure the context values
  const [groupedSurahs, setGroupedSurahs] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  const combineAyahs = () => {
    if (language === 'urdu') {
      return UrduData.map(ayah => ({
        AyahNumber: ayah.AyahNumber,
        AyahTextMuhammadi: ayah.AyahTextMuhammadi,
        Translation: ayah.Translation,
        Tafseer: ayah.Tafseer,
        ParahNumber: ayah.ParahNumber,
        SurahNumber: ayah.SurahNumber
      }));
    } else {
      return EnglishData.map(ayah => ({
        AyahNumber: ayah.AyahNumber,
        AyahTextMuhammadi: ayah.AyahTextQalam,
        Translation: ayah.Translation,
        Tafseer: ayah.Tafseer,
        SurahNumber: ayah.SurahNumber
      }));
    }
  };
  

  const loadData = async () => {
    try {
      const combinedData = combineAyahs();
      const grouped = groupBySurah(combinedData);
      setGroupedSurahs(grouped);

      const defaultIndex = grouped.findIndex(surah => surah[0].SurahNumber === 105);
      setCurrentIndex(defaultIndex !== -1 ? defaultIndex : 0);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const groupBySurah = (data) => {
    const surahs = {};
    data.forEach(ayah => {
      if (!surahs[ayah.SurahNumber]) {
        surahs[ayah.SurahNumber] = [];
      }
      surahs[ayah.SurahNumber].push(ayah);
    });
    return Object.values(surahs).sort((a, b) => a[0].SurahNumber - b[0].SurahNumber);
  };

  useEffect(() => {
    loadData(); // re-load on language change
  }, [language, showTafseer]);

  const loadNextSurah = () => {
    setCurrentIndex(prev => (prev + 1) % groupedSurahs.length);
  };

  const saveLastReadingPosition = async (surahNumber, ayahNumber) => {
    try {
      const position = { surahNumber, ayahNumber };
      await AsyncStorage.setItem('lastReadingPosition', JSON.stringify(position));
    } catch (error) {
      console.error('Error saving last reading position:', error);
    }
  };
  

  const loadPreviousSurah = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setCurrentIndex(prev => (prev - 1 + groupedSurahs.length) % groupedSurahs.length);
      setRefreshing(false);
    }, 800);
  }, [groupedSurahs.length]);

  return (
    <View style={{ flex: 1 }}>
      {groupedSurahs.length > 0 && (
        <FlatList
          data={groupedSurahs[currentIndex]}
          renderItem={({ item }) => <Item item={item} showTafseer = {showTafseer} />}
          keyExtractor={item => item.AyahNumber.toString()}
          onEndReached={loadNextSurah}
          onEndReachedThreshold={0.5}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={loadPreviousSurah} />
          }
          onScroll={(event) => {
            const contentOffsetY = event.nativeEvent.contentOffset.y;
            const currentSurah = groupedSurahs[currentIndex];
            const ayahNumber = Math.floor(contentOffsetY / 100) + 1; // Assuming each item takes ~100px height
            saveLastReadingPosition(currentSurah[0].SurahNumber, ayahNumber);
          }}
        />
      )}
    </View>
  );
};

export default ReadQuran;

const Item = ({ item , showTafseer}) => {

  return (
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
          <Text style={{ color: '#696969' }}>پارہ {item.ParahNumber} سورة {item.SurahNumber}</Text>
        </View>
      </View>

      {showTafseer && (
  <View style={styles.Tafseer}>
    <Text style={{
      padding: 10,
      textAlign: 'center',
      fontWeight: '500',
      lineHeight: 25
    }}>{item.Tafseer || "null"}</Text>
  </View>
)}

    </View>
  );
};


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
});
