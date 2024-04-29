import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Button, Text, TouchableOpacity, Image } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { User } from '../models/user';

const SettingScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = auth().onAuthStateChanged(authUser => {
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
        });
    
        return () => unsubscribe();
    }, []);

    const handleLogout = () => {
        auth().signOut()
          .then(() => {
            console.log('User signed out');
            navigation.navigate('Login');
          })
          .catch(error => console.error('Error signing out: ', error));
    };

    const handleCreateProfile = () => {
        navigation.navigate('EditOrCreateProfile');
    }
    
    return (
        <View style={styles.container}>
            {user ? (
            <>
                <Text style={{marginBottom: 4}}>Chào {user.name}</Text>
                <Text style={{marginBottom: 8}}>Role : {user.role}</Text>
                {user.role === 'user' && <TouchableOpacity
                  style={[styles.button, styles.message, {marginBottom: 6, width: 150}]} onPress={handleCreateProfile}
                  >
                  <Image
                    style={styles.icon}
                    source={{ uri: 'https://img.icons8.com/color/70/000000/plus.png' }}
                  />
                  <Text style={{ color: 'white' }}> Tạo Profile</Text>
                </TouchableOpacity>}
                <TouchableOpacity style={[styles.button, { backgroundColor: '#4b94f8', width: 150}]} onPress={handleLogout}>
                  <Text style={styles.buttonText}>Logout</Text>
                </TouchableOpacity>
            </>
            ) : (
            <>
                <Text style={{marginBottom: 14}}>Vui lòng đăng nhập để sử dụng</Text>
                <TouchableOpacity style={[styles.button, { backgroundColor: '#4b94f8' }]} onPress={() => navigation.navigate('Login')}>
                  <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
            </>
            )}
        </View>
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