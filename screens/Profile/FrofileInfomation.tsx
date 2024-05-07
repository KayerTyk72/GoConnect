import React, { useEffect, useState, } from 'react';
import { View, StyleSheet, Button, Text, TouchableOpacity, Image, TextInput, Alert, ScrollView } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { launchImageLibrary } from 'react-native-image-picker'; 
import { Profile } from '../../models/Profile';
import storage from '@react-native-firebase/storage';
import { opacity } from 'react-native-reanimated/lib/typescript/reanimated2/Colors';

const ProfileInfomation: React.FC<{ navigation: any;route:any }> = ({ navigation,route }) => {
  const [userId,setUserId] = useState('');
  const [name,setName] = useState('');
  const [image, setImage] = useState<string >(); 
  const [description, setDescription] = useState('');
  const [hometown,setHomeTown] = useState('');
  const [major,setMajor] = useState('');
  const [school,setScholl] = useState('');
  const [ethinicity,setEthinicity] = useState('');
  const { profileId } = route.params;

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
    if (profileId) {
      loadProfileData(profileId);
    }
  }, [profileId]);

  const loadProfileData = async (profileId: string) => {
    try {
      const profileRef = firestore().collection('profiles').doc(profileId);
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
      }
    } catch (error) {
      console.error('Error loading profile data:', error);
    }
  };


  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
    <View style={[styles.container, { backgroundColor: '#fff' }]}>
        <View style={{flexDirection:'row',marginBottom:30}}>
            <View style={{flex:2}}>
                {image && <Image source={{ uri: image }} style={{ width: 200, height: 240,alignSelf:'center'}} />}
            </View>
            <View style={{flex:2,marginLeft:40}}>
                <Text style={{textAlign:'center',fontWeight:'bold',fontSize:20,marginBottom:10}}>Thông tin cá nhân</Text>
                <Text style={[styles.infomation]}><Text style={{fontWeight:'bold'}}>Tên: </Text>{name}</Text>
                <Text style={[styles.infomation]}><Text style={{fontWeight:'bold'}}>Quê quán: </Text>{hometown}</Text>
                <Text style={[styles.infomation]}><Text style={{fontWeight:'bold'}}>Email: </Text>{}</Text>
                <Text style={[styles.infomation]}><Text style={{fontWeight:'bold'}}>Dân tộc: </Text>{ethinicity}</Text>
                <Text style={[styles.infomation]}><Text style={{fontWeight:'bold'}}>Trường: </Text>{school}</Text>
                <Text style={[styles.infomation]}><Text style={{fontWeight:'bold'}}>Chuyên ngành: </Text>{major}</Text>
            </View>
        </View>
        <View>
            <Text style={{textAlign:'center',fontWeight:'bold',fontSize:20,marginBottom:10}}>Tóm tắt về bản thân</Text>
            <Text style={{fontSize:15}}>{description}</Text>
        </View>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop:40,
  },
  infomation:{
    marginBottom:10,
  },
  column: {
    flex:1,
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

export default ProfileInfomation;
