import React, { useEffect, useState, } from 'react';
import { View, StyleSheet, Button, Text, TouchableOpacity, Image, TextInput, Alert, ScrollView } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { launchImageLibrary } from 'react-native-image-picker'; 
import { Profile } from '../../models/Profile';




const EditOrCreateProfileScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [editable, setEditable] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<string >(); 
  const [isCreate, setIsCreate] = useState(true);
  const [userId, setUserId] = useState('');
  const [hometown,setHomeTown] = useState('');
  const [major,setMajor] = useState('');
  const [school,setScholl] = useState('');
  const [ethinicity,setEthinicity] = useState('');

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
    if (userId) {
      loadProfileData(userId);
    }
  }, [userId]);

  const loadProfileData = async (userId: string) => {
    try {
      const profileRef = firestore().collection('profiles').doc(userId);
      const snapshot = await profileRef.get();
      if (snapshot.exists) {
        const data = snapshot.data() as Profile;
        setName(data.name);
        setDescription(data.description);
        setImage(data.image); 
        setEthinicity(data.ethinicity);
        setHomeTown(data.hometown);
        setMajor(data.major);
        setScholl(data.school);
        setIsCreate(false);
      }
    } catch (error) {
      console.error('Error loading profile data:', error);
    }
  };

  const handleSaveProfile = async () => {
    try {
      let profileData = {
        name: name,
        description: description,
        image: image ,
        ethinicity:ethinicity,
        hometown:hometown,
        school:school,
        major:major,
      };
      if (isCreate) {
        await firestore().collection('profiles').doc(userId).set(profileData, { merge: true });
      } else {
        await firestore().collection('profiles').doc(userId).update(profileData);
      }
      Alert.alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  // Hàm để chọn hình ảnh từ thư viện
  const chooseImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, response => {
      if (response && response.assets && response.assets.length > 0) { 
        const uri = response.assets[0].uri;
        setImage(uri); 
      }
    });
  };
  
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
    <View style={[styles.container, { backgroundColor: '#fff' }]}>
      {/* Profile Image */}
      {image && <Image source={{ uri: image }} style={{ width: 100, height: 120 ,alignSelf:'center'}} />}
      <TouchableOpacity style={[styles.button, { backgroundColor: '#4b94f8',width:'30%',alignSelf:'center', }]} onPress={chooseImage}>
        <Text style={styles.buttonText}>Choose Image</Text>
      </TouchableOpacity>
      {/* Profile Name */}
      <Text style={{ marginBottom: 5 }}>Name:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={text => setName(text)}
        placeholder="Enter name"
        editable={editable}
      />
      <Text/>
      {/* Profile DayOfBirth
      {/* Profile homtown */}
      <Text style={{marginBottom:5}}>Quê quán:</Text>
      <TextInput
        style={styles.input}
        value={hometown}
        onChangeText={text => setHomeTown(text)}
        placeholder="Quê quán"
        editable={editable}
      />
      {/* Profile ethinicity */}
      <Text style={{marginBottom:5}}>Sắc tộc:</Text>
      <TextInput
        style={styles.input}
        value={ethinicity}
        onChangeText={text => setEthinicity(text)}
        placeholder="Sắc tộc"
        editable={editable}
      />
      {/* Profile school */}
      <Text style={{marginBottom:5}}>Trường học:</Text>
      <TextInput
        style={styles.input}
        value={school}
        onChangeText={text => setScholl(text)}
        placeholder="Trường học"
        editable={editable}
      />
      {/* Profile major */}
      <Text style={{marginBottom:5}}>Chuyên ngành:</Text>
      <TextInput
        style={styles.input}
        value={major}
        onChangeText={text => setMajor(text)}
        placeholder="Chuyên ngành"
        editable={editable}
      />
      {/* Profile Description */}
      <Text style={{ marginBottom: 5 }}>Description:</Text>
      <TextInput
        multiline={true}
        numberOfLines={5}
        maxLength={500}
        style={[styles.input, { marginBottom: 15, }]}
        value={description}
        onChangeText={text => setDescription(text)}
        placeholder="Enter description"
        textAlignVertical='top'
        textAlign='left'
        editable={editable}
      />
      <Button
        title={editable ? 'Save' : 'Edit'}
        onPress={() =>{if (editable) {
          handleSaveProfile();
        }
        setEditable(prevState => !prevState);
            }      
          }
      />
    </View>
    </ScrollView>
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
    paddingVertical: 10,
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
