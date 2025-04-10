import { useState, useEffect } from 'react';
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

const useQuranData = () => {
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

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

  useEffect(() => {
    const fetchData = async () => {
      const storedData = await getData("Surahs");
      if (storedData) {
        setData(storedData.data.surahs.slice(0, 10));
      } else {
        const newData = await getQuranFromApiAsync();
        if (newData) {
          setData(newData.data.surahs.slice(0, 10));
        }
      }
    };
    fetchData();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    const newData = await getQuranFromApiAsync();
    if (newData) {
      setData(newData.data.surahs.slice(0, 10));
      setPage(1);
    }
    setRefreshing(false);
  };

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

  return {
    data,
    refreshing,
    loading,
    onRefresh,
    loadMoreData,
  };
};

export default useQuranData;
