import React, { useContext } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { LanguageContext } from '../LanguageContext';

const Settings = () => {
  const { language, toggleLanguage, showTafseer, toggleTafseer } = useContext(LanguageContext);

  return (
    <View style={styles.container}>
      <View style={styles.setting}>
        <Text style={styles.label}>Language: {language}</Text>
        <Switch value={language === 'english'} onValueChange={toggleLanguage} />
      </View>

      <View style={styles.setting}>
        <Text style={styles.label}>Show Tafseer</Text>
        <Switch value={showTafseer} onValueChange={toggleTafseer} />
      </View>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  setting: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 15 },
  label: { fontSize: 16, color: 'black' }
});
