import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PostScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>Welcome to Post Screen!</Text>
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

export default PostScreen;