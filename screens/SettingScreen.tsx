import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Button, Text, TouchableOpacity, Image } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { User } from '../models/user';
import { useAuth } from '../contexts/AuthContext';
import UserProfile from '../components/UserProfile';

const SettingScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
    const [user, setUser] = useState<User | null>(null);
    const { logout, authUser } = useAuth(); 

    useEffect(() => {
      if (authUser) {
        // Nếu người dùng đã đăng nhập, lấy thông tin người dùng từ Firestore
        firestore().collection('users').doc(authUser.uid).get().then(doc => {
          if (doc.exists) {
            setUser(doc.data() as User); // Chú ý: Kiểm tra null trước khi sử dụng
          } else {
            console.log('No such document!');
          }
        }).catch(error => {
          console.log('Error getting document:', error);
        });
      } else {
        setUser(null); // Người dùng không đăng nhập
      }
    }, [authUser]);

    const handleLogout = async () => {
        const res = await logout();
        if(res){
          navigation.navigate('Login');
        }
    };

    const handleCreateProfile = () => {
        navigation.navigate('EditOrCreateProfile');
    }
    
    return (
        <>
            {user ? <UserProfile user={user} email={authUser?.email || ''} handleLogout={handleLogout} handleCreateProfile={handleCreateProfile} /> : (
            <View style={styles.container}>
                <Text style={{marginBottom: 14}}>Vui lòng đăng nhập để sử dụng</Text>
                <TouchableOpacity style={[styles.button, { backgroundColor: '#4b94f8' }]} onPress={() => navigation.navigate('Login')}>
                  <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
            </View>
            )}
        </>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    width: 100,
    marginRight: 5,
    marginTop: 5,
    marginBottom: 10
  },
  icon: {
    width: 20,
    height: 20,
  },
  message: {
    backgroundColor: '#228B22',
  },
});

export default SettingScreen;