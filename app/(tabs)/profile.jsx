import {  TouchableOpacity, View, Image, FlatList } from 'react-native'
import React from 'react'
import { useGlobalContext } from '../../context/GlobalProvider'
import useAppwrite from '../../lib/useAppwrite';
import { getUserPosts, signOut } from '../../lib/appwrite';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from "expo-router"
import { icons } from "../../constants"
import { EmptyState, InfoBox, VideoCard } from "../../components"


const Profile = () => {
  const { user, setUser, setIsLogged } = useGlobalContext();
  const { data: posts } = useAppwrite(() => getUserPosts(user.$id));

  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLogged(false);

    router.replacee("/sign-in")
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList 
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard
            title={item.title}
            thumbnail={item.thumbnail}
            video={item.video}
            creator={item.creator.username}
            avator={item.creator.avator}
            />
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No videos found for this profile" />
        )}
        ListHeaderComponent={() => (
          <View className="w-full flex justify-center items-center mt-6 mb-12 px-4">
            <TouchableOpacity
              onPress={logout}
              className="flex w-full items-eend mb-10">
              <Image 
                source={icons.logout}
                resizeMode="contain"
                className="covw-6 h-6"
                />
            </TouchableOpacity>

            <View className="w-16 h-16 border border-secondary rounded-1g flex justify-center items-center">
              <Image
                source={{ uri: user?.avatar }}
                className="w-[90%] h-[90%] rounded-1g"
                resizeMode="cover" />
            </View>

            <Infobox
            title={user?.username}
            containerStyles="mt-5"
            titleStyles="text-1g" />
            <View className="mt-5 flex flex-row">
              <Infobox
                title={posts.length || 0}
                subtitle="Posts"
                titleStyles="text-xl"
                containerStyles="mr-10" />
              <Infobox
                title="1.2k"
                subtitle="Followeres"
                titleStyles="text-xl" />
            </View>
          </View>
        )}/>
    </SafeAreaView>
  )
}

export default Profile