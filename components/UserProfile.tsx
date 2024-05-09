import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { User } from '../models/user';

const UserProfile: React.FC<{user : User, email: string, handleLogout: () => void, handleCreateProfile: () => void}>  = ({ user, email, handleLogout, handleCreateProfile }) => {
  return (
    <View style={styles.container}>
        <View style={styles.top}>
            <View style={styles.leftColumn}>
                {/* Hiển thị hình ảnh của người dùng */}
                <Image
                style={styles.userImage}
                source={{ uri: 'https://img.icons8.com/bubbles/300/user.png' }}
                />
            </View>
            <View style={styles.rightColumn}>
                {/* Hiển thị thông tin tên và email của người dùng */}
                <Text style={styles.userName}>{user?.name}</Text>
                <Text >{email}</Text>
            </View>
        </View>
        <TouchableOpacity style={styles.menuItem} onPress={handleCreateProfile}>
            <Image
                style={styles.icon}
                source={{ uri: 'https://img.icons8.com/color/70/000000/plus.png' }}
                />
            <Text >Tạo / edit Profile</Text>
        </TouchableOpacity>
        <View style={{alignItems:'center'}}>
            <TouchableOpacity style={[styles.button, { backgroundColor: '#4b94f8', width: 150}]} onPress={handleLogout}>
                <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  icon: {
    width: 20,
    height: 20,
  },
  top:{
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    marginBottom: 6,
    backgroundColor: '#fff'
  },
  leftColumn: {
    marginRight: 20,
  },
  rightColumn: {
    flex: 1,
  },
  userImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  userName: {
    fontSize: 17,
    color: '#000',
    marginBottom: 4,
  },
  menuItem :{
    flexDirection: 'row',
    rowGap: 10,
    color:'#000',
    backgroundColor:'#fff',
    borderBottomColor: '#ddd',
    padding: 10,
    borderBottomWidth: 1
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
});

export default UserProfile;