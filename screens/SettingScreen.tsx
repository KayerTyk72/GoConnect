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
                <Text>Chào {user.name}</Text>
                <Text>Role : {user.role}</Text>
                {user.role === 'user' && <TouchableOpacity
                  style={[styles.button, styles.message]} onPress={handleCreateProfile}
                  >
                  <Image
                    style={styles.icon}
                    source={{ uri: 'https://img.icons8.com/color/70/000000/plus.png' }}
                  />
                  <Text style={{ color: 'white' }}> Tạo Profile</Text>
                </TouchableOpacity>}
                <Button
                    title="Logout"
                    onPress={handleLogout}
                />
            </>
            ) : (
            <>
                <Text>Vui lòng đăng nhập để sử dụng</Text>
                <Button
                    title="Login"
                    onPress={() => navigation.navigate('Login')}
                />
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
  button: {
    height: 35,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    width: 150,
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