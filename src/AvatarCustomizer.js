// /src/screens/AvatarCustomizer.js
import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Slider,          // expo install @react-native-community/slider
  StyleSheet,
  SafeAreaView,
  ScrollView
} from 'react-native';

/**
 * A super-light avatar customiser.
 *  • Colour – over-lays a tint on top of the base avatar
 *  • Size   – simple scaling slider (0.5× – 1.5×)
 *  • Dress  – swaps a transparent PNG layer
 *
 * Put your PNG parts in /assets/avatar/
 *   base.png       – head + body (no clothes, no colour)
 *   tshirt.png
 *   hoodie.png
 *   blazer.png
 */
const dresses = [
  { id: 'tshirt', label: 'T-Shirt', src: require('../../assets/avatar/tshirt.png') },
  { id: 'hoodie', label: 'Hoodie',  src: require('../../assets/avatar/hoodie.png') },
  { id: 'blazer', label: 'Blazer',  src: require('../../assets/avatar/blazer.png') }
];

export default function AvatarCustomizer({ navigation }) {
  const [tint, setTint]       = useState('#FFB6C1'); // light pink
  const [scale, setScale]     = useState(1);
  const [dress, setDress]     = useState(dresses[0]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.h1}>Build your Avatar</Text>

        {/* Live preview */}
        <View style={styles.previewBox}>
          <Image
            source={require('../../assets/avatar/base.png')}
            style={[
              styles.layer,
              { tintColor: tint, transform: [{ scale }] }
            ]}
            resizeMode="contain"
          />
          <Image
            source={dress.src}
            style={[styles.layer, { transform: [{ scale }] }]}
            resizeMode="contain"
          />
        </View>

        {/* ---------  COLOUR  --------- */}
        <Text style={styles.label}>Skin / Accent Colour</Text>
        <View style={styles.paletteRow}>
          {['#FFB6C1', '#F9C44F', '#C68642', '#8D5524', '#282828'].map(c => (
            <TouchableOpacity
              key={c}
              onPress={() => setTint(c)}
              style={[
                styles.swatch,
                { backgroundColor: c, borderWidth: tint === c ? 3 : 0 }
              ]}
            />
          ))}
        </View>

        {/* ---------  SIZE  --------- */}
        <Text style={styles.label}>Avatar Size</Text>
        <Slider
          minimumValue={0.5}
          maximumValue={1.5}
          step={0.05}
          value={scale}
          onValueChange={setScale}
        />
        <Text style={{ textAlign: 'center', marginBottom: 16 }}>
          {scale.toFixed(2)}×
        </Text>

        {/* ---------  DRESS  --------- */}
        <Text style={styles.label}>Outfit</Text>
        <View style={styles.paletteRow}>
          {dresses.map(d => (
            <TouchableOpacity
              key={d.id}
              onPress={() => setDress(d)}
              style={[
                styles.dressBtn,
                { borderColor: dress.id === d.id ? '#2b6' : '#ccc' }
              ]}
            >
              <Image source={d.src} style={{ width: 40, height: 40 }} />
              <Text style={{ fontSize: 12 }}>{d.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* SAVE OR CLOSE  */}
        <TouchableOpacity
          style={styles.doneBtn}
          onPress={() => navigation.goBack()}
        >
          <Text style={{ color: '#fff', fontSize: 16 }}>Done</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, alignItems: 'center' },
  h1:        { fontSize: 22, fontWeight: '600', marginBottom: 12 },
  previewBox:{ width: 220, height: 260, marginBottom: 20 },
  layer:     { position: 'absolute', width: '100%', height: '100%' },
  label:     { alignSelf: 'flex-start', marginBottom: 6, fontWeight: '600' },
  paletteRow:{ flexDirection: 'row', marginBottom: 20 },
  swatch:    { width: 32, height: 32, borderRadius: 16, marginRight: 8 },
  dressBtn:  {
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 8,
    padding: 4,
    marginRight: 8
  },
  doneBtn:   {
    marginTop: 30,
    backgroundColor: '#0066ff',
    paddingHorizontal: 28,
    paddingVertical: 10,
    borderRadius: 12
  }
});