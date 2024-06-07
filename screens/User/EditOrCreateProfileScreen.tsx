import React, { useEffect, useState, } from 'react';
import { View, StyleSheet, Button, Text, TouchableOpacity, Image, TextInput, Alert, ScrollView } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { launchImageLibrary } from 'react-native-image-picker'; 
import { Profile } from '../../models/Profile';
import storage from '@react-native-firebase/storage';
import { Picker } from '@react-native-picker/picker';
import Ethinicity from '../../models/Ethinicity';
import Hometown from '../../models/Homtown';

const EditOrCreateProfileScreen: React.FC<{ navigation: any }> = () => {
  const [editable, setEditable] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<string >(); 
  const [isCreate, setIsCreate] = useState(true);
  const [isChangeImage, setIsChangeImage] = useState(false);
  const [userId, setUserId] = useState('');
  const [hometown,setHomeTown] = useState('');
  const [major,setMajor] = useState('');
  const [school,setScholl] = useState('');
  const [ethinicity,setEthinicity] = useState('');
  const [nameError, setNameError] = useState(false);
  const [schoolError, setSchoolError] = useState(false);
  const [majorError, setMajorError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);


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
    if(!name||name.length>30){
      setNameError(true);
      return;
    }else if(!school||school.length>50){
      setSchoolError(true);
      return;
    }else if(!major||major.length>50){
      setMajorError(true);
      return;
    }else if(!description||description.length>300){
      setDescriptionError(true);
      return;
    }else{
      setNameError(false);
      setSchoolError(false);
      setMajorError(false);
      setDescriptionError(false);
    try {
      let profileData = {
        name: name,
        image : image,
        description: description,
        ethinicity:ethinicity,
        hometown:hometown,
        school:school,
        major:major,
      };
      let userData = {
        name:name
      };

      // upload image lên storage
      if(isChangeImage && image){
        const timestamp = new Date().getTime();
        const fileName = `${timestamp}.jpg`;
        const imageRef = storage().ref('images').child(fileName);
        await imageRef.putFile(image);
        const imageUrl = await imageRef.getDownloadURL();
        profileData.image = imageUrl;
      }

      // lưu dữ liệu
      if (isCreate) {
        await firestore().collection('profiles').doc(userId).set(profileData, { merge: true });
        await firestore().collection('users').doc(userId).set(userData, { merge: true });
      } else {
        await firestore().collection('profiles').doc(userId).update(profileData);
        await firestore().collection('users').doc(userId).update(userData);
      }
      Alert.alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error saving profile:', error);
    }
    }
  };

  // Hàm để chọn hình ảnh từ thư viện
  const chooseImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, response => {
      if (response && response.assets && response.assets.length > 0) { 
        const uri = response.assets[0].uri;
        setImage(uri); 
        setIsChangeImage(true);
      }
    });
  };
  
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
    <View style={[styles.container, { backgroundColor: '#fff' }]}>
      {/* Profile Image */}
      {image && <Image source={{ uri: image }} style={[styles.image]} />}
      <TouchableOpacity style={[styles.button, { backgroundColor: '#4b94f8',width:'50%',alignSelf:'center', }]} onPress={chooseImage}>
        <Text style={styles.buttonText}>Choose Image</Text>
      </TouchableOpacity>
      {/* Profile Name */}
      <Text style={[styles.label]}>Name:{nameError && <Text style={[styles.alert]}>(* Tên không được để trống hoặc quá 30 ký tự)</Text>}</Text>
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
      <Text style={[styles.label]}>Quê quán:</Text>
      <Picker
        selectedValue={hometown}
        onValueChange={(itemValue) => setHomeTown(itemValue)}
        style={styles.input}
        enabled={editable}
      >
        {Hometown.map((item, index) => (
          <Picker.Item key={index} label={item} value={item} />
        ))}
      </Picker>
      {/* Profile ethinicity */}
      <Text style={[styles.label]}>Sắc tộc:</Text>
      <Picker
        selectedValue={ethinicity}
        onValueChange={(itemValue) => setEthinicity(itemValue)}
        style={styles.input}
        enabled={editable}
      >
        {Ethinicity.map((item, index) => (
          <Picker.Item key={index} label={item} value={item} />
        ))}
      </Picker>


      {/* Profile school */}
      <Text style={[styles.label]}>Trường học:{schoolError && <Text style={[styles.alert]}>(* Trường học không được để trống)</Text>}      </Text>
      <TextInput
        style={styles.input}
        value={school}
        onChangeText={text => setScholl(text)}
        placeholder="Trường học"
        editable={editable}
      />
      {/* Profile major */}
      <Text style={[styles.label]}>Chuyên ngành:</Text>
      <TextInput
        style={styles.input}
        value={major}
        onChangeText={text => setMajor(text)}
        placeholder="Chuyên ngành"
        editable={editable}
      />
      {majorError && <Text style={[styles.alert]}>(* Chuyên ngành không được để trống)</Text>}
      {/* Profile Description */}
      <Text style={[styles.label]}>Description:{descriptionError && <Text style={[styles.alert]}>(* Thông tin không được để trống)</Text>}</Text>
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
  alert:{
    color: 'red',
    marginBottom: 5 
  },
  image:{
    width: 200,
    height: 300,
    alignSelf:'center'
  },
  label:{
    marginBottom:5,
    fontWeight:'bold',
    color:'black'
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
