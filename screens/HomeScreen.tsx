import moment from 'moment';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Platform, useColorScheme, TextInput } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface Post {
  id: number;
  title: string;
  urlToImage: string;
  publishedAt: string;
  url: string;
  author: string;
}

const HomeScreen: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    // Fetch posts from API or local storage
    const fetchData = async () => {
      try {
        // Code to fetch posts
        const fetchedPosts = await fetchPosts();
        setPosts(fetchedPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchData();
  }, []);

  const fetchPosts = async (): Promise<Post[]> => {
    // Simulate fetching posts from an API or local storage
    return [
      { id: 1, title: 'Quỹ Cấp Học Bổng Hằng Tháng Sinh Viên GoSchool', urlToImage :'https://goschoolvietnam.com/wp-content/uploads/2024/01/IMG_9199-060-768x512.jpg', publishedAt: '2024-1-4', url:'', author :'' },
      { id: 2, title: 'GoSchool Đà Nẵng – Chương Trình Phát Quà Đường Phố', urlToImage :'https://goschoolvietnam.com/wp-content/uploads/2024/01/z5025523237316_e1404ed5b7ee73a76e68fe0cb3adf35e-768x576.jpg', publishedAt: '2024-1-4', url:'', author :'' },
      { id: 3, title: 'Quỹ Cấp Học Bổng Hằng Tháng Sinh Viên GoSchool', urlToImage :'https://goschoolvietnam.com/wp-content/uploads/2024/01/IMG_9199-060-768x512.jpg', publishedAt: '2024-1-4', url:'', author :'' },
      { id: 4, title: 'Chạm Tới Ước Mơ – Sùng Thị Lừ', urlToImage :'https://goschoolvietnam.com/wp-content/uploads/2023/11/z4922679698659_c4b44d36509e18eaa3478a88cfdfb3ea-768x1024.jpg', publishedAt: '2024-1-4', url:'', author :'' },
      { id: 5, title: 'Quỹ Cấp Học Bổng Hằng Tháng Sinh Viên GoSchool', urlToImage :'https://goschoolvietnam.com/wp-content/uploads/2024/01/IMG_9199-060-768x512.jpg', publishedAt: '2024-1-4', url:'', author :'' },
      { id: 6, title: 'Quỹ Cấp Học Bổng Hằng Tháng Sinh Viên GoSchool', urlToImage :'https://goschoolvietnam.com/wp-content/uploads/2024/01/IMG_9199-060-768x512.jpg', publishedAt: '2024-1-4', url:'', author :'' },
      { id: 7, title: 'GoSchool Đà Nẵng – Chương Trình Phát Quà Đường Phố', urlToImage :'https://goschoolvietnam.com/wp-content/uploads/2024/01/z5025523237316_e1404ed5b7ee73a76e68fe0cb3adf35e-768x576.jpg', publishedAt: '2024-1-4', url:'', author :'' },
      { id: 8, title: 'Quỹ Cấp Học Bổng Hằng Tháng Sinh Viên GoSchool', urlToImage :'https://goschoolvietnam.com/wp-content/uploads/2024/01/IMG_9199-060-768x512.jpg', publishedAt: '2024-1-4', url:'', author :'' },
      { id: 9, title: 'Chạm Tới Ước Mơ – Sùng Thị Lừ', urlToImage :'https://goschoolvietnam.com/wp-content/uploads/2023/11/z4922679698659_c4b44d36509e18eaa3478a88cfdfb3ea-768x1024.jpg', publishedAt: '2024-1-4', url:'', author :'' },
      { id: 10, title: 'Quỹ Cấp Học Bổng Hằng Tháng Sinh Viên GoSchool', urlToImage :'https://goschoolvietnam.com/wp-content/uploads/2024/01/IMG_9199-060-768x512.jpg', publishedAt: '2024-1-4', url:'', author :'' },
      // Add more posts as needed
    ];
  };

  const NewsArticle: React.FC<{
    post: Post;
  }> = ({post}) => {
    return (
      <TouchableOpacity activeOpacity={1} style={styles.itemcontainer}>
        <Image
          source={{
            uri: post?.urlToImage ?? 'https://picsum.photos/800',
            cache: 'force-cache',
          }}
          resizeMode={'cover'}
          style={styles.image}
        />
        <LinearGradient
          colors={['#0000', '#000A', '#000']}
          style={styles.titleContainer}>
          <Text style={styles.text}>{post?.title}</Text>
          <Text style={styles.timestamp}>
            2024-1-1
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  const backgroundColor = useColorScheme() === 'dark' ? '#000' : '#fff';
  return (
    <View style={[styles.container, {backgroundColor}]}>
      <TextInput
        style={styles.searchinput}
        placeholder="Search..."
        placeholderTextColor="#777"
      />
      <FlatList
        data={posts}
        renderItem={({item, index}: any) => (
          <NewsArticle post={item} />
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ flexGrow: 1 }}
        style={styles.list}
      />
    </View>
  );
};

const boxShadow: any = Platform.select({
  ios: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.4,
    shadowRadius: 4,
  },
  android: {elevation: 6},
});

const styles =  StyleSheet.create({
  searchinput: {
    backgroundColor: '#ddd',
    borderRadius: 50,
    paddingHorizontal: 15,
    padding: 6,
    marginHorizontal:8,
    marginBottom:12
  },
  itemcontainer: {
    marginBottom: 18,
    backgroundColor: '#eee',
    borderRadius: 20,
    marginHorizontal: 16,
    ...boxShadow,
  },
  imageContainer: {
    flex: 1
  },
  image: {
    flex: 1,
    borderRadius: 20,
    height: 200,
  },
  titleContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    paddingLeft: 16,
    paddingRight: 10,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  text: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
    color: '#fff',
    marginBottom: 24
  },
  timestamp: {
    position: 'absolute',
    color: '#eee',
    fontSize: 12,
    fontWeight: '300',
    right: 16,
    bottom: 8,
  },
  container: {
    flex: 1,
    flexGrow: 1,
    paddingTop: 12,
  },
  list: {
    flex: 1,
    flexGrow: 1,
  },
});

export default HomeScreen;
