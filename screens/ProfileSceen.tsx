import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, useColorScheme, RefreshControl, Touchable, Alert } from 'react-native';
import { Profile } from '../models/Profile';
import firestore from '@react-native-firebase/firestore';

const ProfileScreen: React.FC <{ navigation: any }> = ({ navigation }) => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadProfiles();
  }, []);

  const loadProfiles = async () => {
    try {
      const profilesSnapshot = await firestore().collection('profiles').get();
      const profilesData = profilesSnapshot.docs.map(doc => {
        const profile = doc.data() as Profile;
        profile.Id = doc.id; // Assigning document name as userId
        return profile;
      });
      setProfiles(profilesData);
    } catch (error) {
      console.error("Error fetching profiles:", error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadProfiles();
    setRefreshing(false);
  };

  const handleProfileInfomation = (profileId: string) => {
    navigation.navigate('ProfileInfomation', { profileId: profileId });
  };

  const backgroundColor = useColorScheme() === 'dark' ? '#000' : '#fff';
  return (
    <View style={[styles.container]}>
      <FlatList
        data={profiles}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleProfileInfomation(item.Id)}>
            <View style={styles.box}>
              <Image style={styles.image} source={{ uri:item.image }} />
              <View style={styles.boxContent}>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.description}>{item.description}</Text>
                <View style={styles.buttons}>
                  <TouchableOpacity style={[styles.button, styles.view]}>
                    <Image style={styles.icon} source={{ uri: 'https://img.icons8.com/color/70/000000/filled-like.png' }} />
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.button, styles.profile]}>
                    <Image style={styles.icon} source={{ uri: 'https://img.icons8.com/color/70/000000/cottage.png' }} />
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.button, styles.message]}>
                    <Image style={styles.icon} source={{ uri: 'https://img.icons8.com/color/70/000000/plus.png' }} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    paddingTop: 20,
  },
  image: {
    width: 130,
    height: 130,
  },
  box: {
    padding: 10,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  boxContent: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginLeft: 10,
  },
  title: {
    color: '#151515',
  },
  description: {
    color: '#646464',
    paddingVertical: 10,
  },
  buttons: {
    flexDirection: 'row',
  },
  button: {
    height: 22,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    width: 40,
    marginRight: 5,
    marginTop: 5,
  },
  icon: {
    width: 10,
    height: 10,
  },
  view: {
    backgroundColor: '#eee',
  },
  profile: {
    backgroundColor: '#1E90FF',
  },
  message: {
    backgroundColor: '#228B22',
  },
});

export default ProfileScreen;
