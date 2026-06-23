import { View, Text, Button, Image } from 'react-native';
import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';

export default function Camara() {
  const [image, setImage] = useState<string | null>(null);

    const openGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: false,
        aspect: [1, 1],
        quality: 1,
    });

    if (!result.canceled) {
        setImage(result.assets[0].uri);
    }
    };

    const openCamera = async () => {
    const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
    });
    // ...
    };

  return (
    <View style={{ padding: 20 }}>
      <Text>Camara</Text>
      <Button title="Abrir Galeria" onPress={openGallery} />
      <Button title="Abrir Camara" onPress={openCamera} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200, marginTop: 10 }} />}
    </View>
  );
}