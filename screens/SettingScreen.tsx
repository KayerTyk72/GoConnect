import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useAuth } from '../components/Auth/AuthContext';

const SettingScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
    const { user, logout } = useAuth();

    return (
        <View style={styles.container}>
            {user ? (
            <Button
                title="Logout"
                onPress={logout}
            />
            ) : (
            <Button
                title="Login"
                onPress={() => navigation.navigate('Login')}
            />
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
});

export default SettingScreen;