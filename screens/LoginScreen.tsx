import { NavigationProp } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, TouchableOpacity, Text } from 'react-native';
import { useAuth } from '../components/Auth/AuthContext';

const LoginScreen : React.FC<{ navigation: NavigationProp<any> }> = ({navigation}) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { login } = useAuth();

  const handleLogin = () => {
    if(!login(username, password)){
      Alert.alert("Username hoặc mật khẩu không đúng !")
    } else {
      navigation.navigate('MainBottomTabs')
    }
  };

  function handleGoogleLogin(): void {
  }

  function handleFacebookLogin(): void {
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={[styles.button, { backgroundColor: '#4b94f8' }]} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <View style={styles.divider}></View>
      <TouchableOpacity style={[styles.button, { backgroundColor: '#DB4437' }]} onPress={handleGoogleLogin}>
        <Text style={styles.buttonText}>Login with Google</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, { backgroundColor: '#4267B2' }]} onPress={handleFacebookLogin}>
        <Text style={styles.buttonText}>Login with Facebook</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '80%',
  },
  button: {
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  divider: {
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    width: '80%',
    marginTop: 20,
    marginBottom: 20,
  },
});

export default LoginScreen;