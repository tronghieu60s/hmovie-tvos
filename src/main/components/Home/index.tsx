import tw from "@/src/core/tailwind";
import { router, useLocalSearchParams } from "expo-router";
import React, { useCallback } from "react";
import { Button, View } from "react-native";
import { Tabs } from "../../base/Flowbite/Tabs";
import { useSafeAreaInsetsStyle } from "../../hooks/useSafeAreaInsetsStyle";
import HomeTabAnimeHay from "./Tabs/AnimeHay";
import HomeTabKKPhim from "./Tabs/KKPhim";
import HomeTabOPhim from "./Tabs/OPhim";
import HomeTabPhimNguonC from "./Tabs/PhimNguonC";
import { addDoc, collection } from "firebase/firestore";
import { fireStore } from "@/src/core/firebase";

const HomeScreen = () => {
  const { tab } = useLocalSearchParams();

  const onChangeTab = useCallback((index: number) => {
    router.setParams({ tab: `${index}`, page: `1` });
  }, []);

  const onAddData = useCallback(async () => {
    const docRef = await addDoc(collection(fireStore, "users"), {
      first: "Ada",
      last: "Lovelace",
      born: 1815,
    });
    console.log("Document written with ID: ", docRef.id);
  }, []);

  const insets = useSafeAreaInsetsStyle(["top"]);

  return (
    <View style={[tw`grow bg-white`, insets]}>
      <View style={[tw`grow pt-0 web:pt-3`]}>
        <Button title="Test" onPress={onAddData} />
        <Tabs
          items={[
            { title: "Ổ Phim", children: <HomeTabOPhim /> },
            { title: "KK Phim", children: <HomeTabKKPhim /> },
            { title: "Phim Nguồn C", children: <HomeTabPhimNguonC /> },
            { title: "Anime Hay", children: <HomeTabAnimeHay /> },
          ]}
          currentTab={tab ? Number(tab) : 0}
          onChangeTab={onChangeTab}
        />
      </View>
    </View>
  );
};

export default HomeScreen;
