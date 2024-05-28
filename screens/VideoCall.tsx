import React, { useEffect, useRef, useState } from 'react';
import { Image, PermissionsAndroid, Platform, Text, TouchableOpacity, View } from 'react-native';
import { RNCamera } from 'react-native-camera';

const VideoCall = () => {
  const [hasPermission, setHasPermission] = useState(false);
  const cameraRef = useRef(null);

  useEffect(() => {
    checkCameraPermission();
  }, []);

  const checkCameraPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
      setHasPermission(granted === PermissionsAndroid.RESULTS.GRANTED);
    } else {
      setHasPermission(true);
    }
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      const options = { quality: 0.5, base64: true };
      const data = await cameraRef.current.takePictureAsync(options);
      console.log(data.uri);
    }
  };

  if (!hasPermission) {
    return (
      <View>
        <Text>Camera permission not granted</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <RNCamera
        ref={cameraRef}
        style={{ flex: 1 }}
        type={RNCamera.Constants.Type.back}
        captureAudio={false}
      />
      <TouchableOpacity onPress={takePicture} style={{ position: 'absolute', bottom: 20, alignSelf: 'center' }}>
        <Image source={require('./camera_icon.png')} style={{ width: 50, height: 50 }} />
      </TouchableOpacity>
    </View>
  );
};

export default VideoCall;
