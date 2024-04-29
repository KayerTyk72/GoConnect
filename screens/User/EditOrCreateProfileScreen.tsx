import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Button, Text, TouchableOpacity, Image, TextInput, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { Profile } from '../../models/Profile';

const EditOrCreateProfileScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isCreate, setIsCreate] = useState(true);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const fetchUserId = async () => {
      const currentUser = auth().currentUser;
      if (currentUser) {
        setUserId(currentUser.uid);
      }
    };
    fetchUserId();
  }, []);

  useEffect(() => {
    loadProfileData(userId);
  }, [userId]);

  const loadProfileData = async (userId :string) => {
    try {
      const profileRef = firestore().collection('profiles').doc(userId);
      const snapshot = await profileRef.get();
      if (snapshot.exists) {
        const data = snapshot.data() as Profile;
        setName(data.name);
        setDescription(data.description);
        setIsCreate(false);
      }
    } catch (error) {
      console.error('Error loading profile data:', error);
    }
  };

  const handleSaveProfile = async () => {
    try {
      if(isCreate){
        await firestore().collection('profiles').doc(userId).set({
          name: name,
          description: description,
          is_approved: false
        }, { merge: true }); 
      } else
      {
        await firestore().collection('profiles').doc(userId).update({
          name: name,
          description: description
        }); 
      }
      Alert.alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  return (
    <View style={[styles.container, {backgroundColor : '#fff'}]}>
      <Text style={{marginBottom: 5}}>Name:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={text => setName(text)}
        placeholder="Enter name"
      />
      <Text style={{marginBottom: 5}}>Description:</Text>
      <TextInput
        style={[styles.input, {marginBottom: 15}]}
        value={description}
        onChangeText={text => setDescription(text)}
        placeholder="Enter description"
      />
      <TouchableOpacity style={[styles.button, { backgroundColor: '#4b94f8' }]} onPress={handleSaveProfile}>
        <Text style={styles.buttonText}>Save Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  input: {
    padding: 10,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical:10,
    marginBottom: 10,
    width: '100%',
    backgroundColor: '#ddd',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginRight: 5,
    marginTop: 5,
    marginBottom: 10
  },
});

export default EditOrCreateProfileScreen;