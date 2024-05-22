import React from 'react';
import { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, Dimensions, TouchableOpacity, Button, Image, ActivityIndicator } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Audio } from 'expo-av';
import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';




const { width, height } = Dimensions.get("window");

const MusicPlayer = () => {

    const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Audio.setAudioModeAsync({
      staysActiveInBackground: true,
      playsInSilentModeIOS: true,
      // interruptionModeIOS: InterruptionModeIOS.DuckOthers,
      // interruptionModeAndroid: InterruptionModeAndroid.DuckOthers,
      shouldDuckAndroid: true,
      playThroughEarpieceAndroid: true,
  });
    const loadSound = async () => {
      setLoading(true);
      const { sound } = await Audio.Sound.createAsync(
        { uri: 'https://canada.startradio.in:8010/radio.mp3' },
        { shouldPlay: false }
      );
      setSound(sound);
      setLoading(false);
    };

    loadSound();
  }, []);

  const play = async () => {
    
    if (sound!== null) {
      await sound.playAsync();
      setIsPlaying(true);
    }
  };

  const pause = async () => {
    if (sound!== null) {
      await sound.pauseAsync();
     // await sound.stopAsync();
      setIsPlaying(false);
    }
  };


    return (
        <SafeAreaView style={styles.container}>
        <View style={styles.mainContainer}>
            <View style={styles.artwork}>
                <Image source={require('../assets/logoImage.png')} style={styles.artworkImage}/>
            </View> 
        </View>
        <View style={styles.adsContainer}>
        {/* <GoogleAds /> */}
        <Text style={{color: '#000', textAlign: 'center', fontSize: 20}}>WELCOME TO INDI RADIO</Text>
        </View>

        
        <View style={{
            borderTopColor: "#393E46",
            borderTopWidth: 1,
            width: width,
            alignItems: 'center',
            paddingVertical: 15,
        }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '80%' }}></View>
        {loading ? (
          <ActivityIndicator size="large" color="#fff" />
        ) : (
          isPlaying ? (
            <TouchableOpacity onPress={pause}>
              <Ionicons name="pause-outline" size={80} color="#ffffff" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={play}>
              <Ionicons name="play-outline" size={80} color="#ffffff" />
            </TouchableOpacity>
          )
        )}
      </View>

        <View style={styles.footerContainer}>
            
        <TouchableOpacity onPress={() => Linking.openURL('https://indiradio.ca')}>
               <Ionicons name="home-outline" size={30} color="#f3f7d7" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Linking.openURL('https://linktr.ee/Indi.jaswal')}>
               <Ionicons name="earth-outline" size={30} color="#f3f7d7" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Linking.openURL('https://indiradio.ca/contact-us/')}>
               <Ionicons name="call-outline" size={30} color="#f3f7d7" />
            </TouchableOpacity>
            
        </View>
        
        

        </SafeAreaView>
        
    );

};

export default MusicPlayer;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#222831',

    },
    adsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#cfcfcf', 
        width: width,
        padding: 40,
    },
    mainContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    footerContainer: {
        flexDirection: 'row',
        borderTopColor: "#393E46",
        borderTopWidth: 1,
        width: width,
        paddingVertical: 15,
        width: '100%',
        justifyContent: 'space-between',
        padding: 20,
        
    },
    artworkImage: {
        borderRadius: 250,
    },
    
    loadingText: { position: 'absolute', top: '50%', left: '50%', transform: [{ translateX: -75 }, { translateY: -20 }], fontSize: 16, color: '#fff', fontWeight: 'bold', },
});