import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, useColorScheme } from 'react-native';

const users = [
  { id: 1, image: 'https://img.freepik.com/free-photo/university-study-abroad-lifestyle-concept-satisfied-happy-asian-male-student-glasses-shirt-showing-thumbs-up-approval-likes-studying-college-holding-laptop-backpack_1258-55849.jpg?t=st=1714370633~exp=1714374233~hmac=2b60da548599f9fca05ffe8a3471ed74092e83d303870ccac40327f47eedab1d&w=360' },
  { id: 2, image: 'https://img.freepik.com/free-photo/woman-reading-book_1098-20029.jpg?w=360&t=st=1714370717~exp=1714371317~hmac=f0217b3ac4e6b579f17c0fb69036059aa1bbc2fb1e55f45d4788026b23a95a58' },
  { id: 3, image: 'https://img.freepik.com/free-photo/portrait-laughing-girl-dress-eyeglasses_171337-1945.jpg?w=360&t=st=1714370753~exp=1714371353~hmac=c28ecb45bfec2764e4df367ce9aeff31c5a132e2fcd2f7f004b6dbaa19659a09 360w, https://img.freepik.com/free-photo/portrait-laughing-girl-dress-eyeglasses_171337-1945.jpg' },
  
]

const ProfileScreen1: React.FC = () => {
  const backgroundColor = useColorScheme() === 'dark' ? '#000' : '#fff';
  return (
    <View style={[styles.container]}>
    <FlatList
      
      data={users}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => {
        return (
          <View style={styles.box}>
            <Image style={styles.image} source={{ uri: item.image }} />
            <View style={styles.boxContent}>
              <Text style={styles.title}>Nguyen Van A</Text>
              <Text style={styles.description}>Lorem ipsum dolor sit amet, elit consectetur</Text>
              <View style={styles.buttons}>
                <TouchableOpacity
                  style={[styles.button, styles.view]}
                  >
                  <Image
                    style={styles.icon}
                    source={{ uri: 'https://img.icons8.com/color/70/000000/filled-like.png' }}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.button, styles.profile]}
                  >
                  <Image
                    style={styles.icon}
                    source={{ uri: 'https://img.icons8.com/color/70/000000/cottage.png' }}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.button, styles.message]}
                  >
                  <Image
                    style={styles.icon}
                    source={{ uri: 'https://img.icons8.com/color/70/000000/plus.png' }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          
        )
      }}
    />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    paddingTop: 20,
  },
  image: {
    width: 130,
    height: 130,
  },
  box: {
    padding: 10,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  boxContent: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginLeft: 10,
  },
  title: {
    color: '#151515',
  },
  description: {
    color: '#646464',
    paddingVertical:10
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
})


export default ProfileScreen1;