import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useLayoutEffect, useState, useEffect } from 'react';
import { Audio } from 'expo-av';

const SurahScreen = ({ navigation, route }) => {
    const { selectedSurah } = route.params;
    const [ayahsWithAudio, setAyahsWithAudio] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sound, setSound] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentAyah, setCurrentAyah] = useState(null); // Track currently playing Ayah

    // Fetch Surah audio
    const fetchSurahAudio = async () => {
        try {
            const response = await fetch(`https://api.alquran.cloud/v1/surah/${selectedSurah.number}/ar.alafasy`);
            const json = await response.json();
            setAyahsWithAudio(json.data.ayahs);
        } catch (error) {
            console.error("Error fetching Surah audio:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSurahAudio();
    }, []);

    // Set dynamic header title
    useLayoutEffect(() => {
        navigation.setOptions({ title: selectedSurah.englishName });
    }, [navigation, selectedSurah]);

    // Function to play audio
    const playAudio = async (audioUrl, ayahNumber) => {
        try {
            if (sound) {
                await sound.unloadAsync(); // Stop previous audio
            }
            const { sound: newSound } = await Audio.Sound.createAsync({ uri: audioUrl });
            setSound(newSound);
            setCurrentAyah(ayahNumber);
            setIsPlaying(true);
            await newSound.playAsync();
        } catch (error) {
            console.error("Error playing audio:", error);
        }
    };

    // Function to pause audio
    const pauseAudio = async () => {
        if (sound) {
            await sound.pauseAsync();
            setIsPlaying(false);
        }
    };

    // Function to resume audio
    const resumeAudio = async () => {
        if (sound) {
            await sound.playAsync();
            setIsPlaying(true);
        }
    };

    // Function to stop audio
    const stopAudio = async () => {
        if (sound) {
            await sound.stopAsync();
            setIsPlaying(false);
            setCurrentAyah(null);
        }
    };

    if (loading) {
        return <ActivityIndicator size="large" color="blue" />;
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={ayahsWithAudio}
                keyExtractor={(ayah) => ayah.number.toString()}
                renderItem={({ item }) => (
                    <Item item={item} playAudio={playAudio} currentAyah={currentAyah} />
                )}
            />

            {/* 🎵 Audio Player Controls */}
            {currentAyah && (
                <View style={styles.audioControls}>
                    <Text style={styles.audioText}>Playing Ayah {currentAyah}</Text>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={isPlaying ? pauseAudio : resumeAudio}>
                            <Text style={styles.buttonText}>{isPlaying ? "Pause" : "Play"}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={stopAudio}>
                            <Text style={styles.buttonText}>Stop</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </View>
    );
};

export default SurahScreen;

// ✅ Updated Item Component with Highlighting Feature
const Item = ({ item, playAudio, currentAyah }) => {
    return (
        <TouchableOpacity
            style={[
                styles.item,
                currentAyah === item.number && styles.activeItem, // Highlight if playing
            ]}
            onPress={() => playAudio(item.audio, item.number)}
        >
            <View style={styles.ayatNumber}>
                <Text style={styles.text}>Ayat: {item.number}</Text>
            </View>
            <View style={styles.ayat}>
                <Text style={styles.text}>{item.text}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    item: {
        backgroundColor: '#FFE4E1',
        flex: 1,
        flexDirection: 'row',
        borderWidth: 1,
        borderRadius: 30,
        marginTop: 12,
        marginHorizontal: 5,
        padding: 10,
    },
    activeItem: {
        backgroundColor: '#C0E6A5', // Highlight when playing
        borderColor: '#4CAF50',
        borderWidth: 2,
    },
    ayatNumber: {
        flex: 0.30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    ayat: {
        flex: 0.70,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: '#7851A9',
        fontSize: 17,
        fontWeight: '800',
    },
    audioControls: {
        position: 'absolute',
        bottom: 20,
        left: 10,
        right: 10,
        backgroundColor: '#eee',
        borderRadius: 10,
        padding: 15,
        alignItems: 'center',
        elevation: 5,
    },
    audioText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    button: {
        backgroundColor: '#7851A9',
        padding: 10,
        borderRadius: 5,
        width: 80,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});
