import { calculatePerItemSize } from "@/src/core/commonFuncs";
import tw from "@/src/core/tailwind";
import React, { useCallback, useState } from "react";
import {
  LayoutChangeEvent,
  Pressable,
  ScrollView,
  View,
} from "react-native";
import { Image } from "expo-image";
import { useSafeAreaInsetsStyle } from "../../hooks/useSafeAreaInsetsStyle";
import { Text } from "../../base/Text";

const DATA = [
  {
    name: "Mặc Vũ Vân Gian",
    slug: "mac-vu-van-gian",
    originName: "The Double",
    thumbUrl: "https://img.ophim.live/uploads/movies/mac-vu-van-gian-thumb.jpg",
    posterUrl:
      "https://img.ophim.live/uploads/movies/mac-vu-van-gian-poster.jpg",
  },
  {
    name: "Phượng Lạc Giang Hồ",
    slug: "phuong-lac-giang-ho",
    originName: "Phoenix Lands in the World",
    thumbUrl: "https://img.ophim.live/uploads/movies/凤落江湖-thumb.jpg",
    posterUrl: "https://img.ophim.live/uploads/movies/凤落江湖-poster.jpg",
  },
  {
    name: "Thách Mà Dám Yêu",
    slug: "thach-ma-dam-yeu",
    originName: "Dare to Love Me",
    thumbUrl:
      "https://img.ophim.live/uploads/movies/thach-ma-dam-yeu-thumb.jpg",
    posterUrl:
      "https://img.ophim.live/uploads/movies/thach-ma-dam-yeu-poster.jpg",
  },
  {
    name: "Ngộ Tình",
    slug: "ngo-tinh",
    originName: "误情",
    thumbUrl: "https://img.ophim.live/uploads/movies/ngo-tinh-thumb.jpg",
    posterUrl: "https://img.ophim.live/uploads/movies/ngo-tinh-poster.jpg",
  },
  {
    name: "Dữ Quân Hành",
    slug: "du-quan-hanh",
    originName: "Walk with You",
    thumbUrl: "https://img.ophim.live/uploads/movies/du-quan-hanh-thumb.jpg",
    posterUrl: "https://img.ophim.live/uploads/movies/du-quan-hanh-poster.jpg",
  },
  {
    name: "Cuộc đời Đức Phật",
    slug: "cuoc-doi-duc-phat",
    originName: "Buddha",
    thumbUrl:
      "https://img.ophim.live/uploads/movies/cuoc-doi-duc-phat-thumb.jpg",
    posterUrl:
      "https://img.ophim.live/uploads/movies/cuoc-doi-duc-phat-poster.jpg",
  },
  {
    name: "Đặc Vụ Ngầm",
    slug: "dac-vu-ngam",
    originName: "Treadstone",
    thumbUrl: "https://img.ophim.live/uploads/movies/dac-vu-ngam-thumb.jpg",
    posterUrl: "https://img.ophim.live/uploads/movies/dac-vu-ngam-poster.jpg",
  },
  {
    name: "Bạo Chúa (Phần 3)",
    slug: "bao-chua-phan-3",
    originName: "Tyrant (Season 3)",
    thumbUrl: "https://img.ophim.live/uploads/movies/bao-chua-phan-3-thumb.jpg",
    posterUrl:
      "https://img.ophim.live/uploads/movies/bao-chua-phan-3-poster.jpg",
  },
  {
    name: "Bạo Chúa (Phần 2)",
    slug: "bao-chua-phan-2",
    originName: "Tyrant (Season 2)",
    thumbUrl: "https://img.ophim.live/uploads/movies/bao-chua-phan-2-thumb.jpg",
    posterUrl:
      "https://img.ophim.live/uploads/movies/bao-chua-phan-2-poster.jpg",
  },
  {
    name: "Bạo Chúa (Phần 1)",
    slug: "bao-chua-phan-1",
    originName: "Tyrant (Season 1)",
    thumbUrl: "https://img.ophim.live/uploads/movies/bao-chua-phan-1-thumb.jpg",
    posterUrl:
      "https://img.ophim.live/uploads/movies/bao-chua-phan-1-poster.jpg",
  },
  {
    name: "Những Tay Chơi Siêu Đẳng (Phần 2)",
    slug: "nhung-tay-choi-sieu-dang-phan-2",
    originName: "Player (Season 2)",
    thumbUrl:
      "https://img.ophim.live/uploads/movies/nhung-tay-choi-sieu-dang-phan-2-thumb.jpg",
    posterUrl:
      "https://img.ophim.live/uploads/movies/nhung-tay-choi-sieu-dang-phan-2-poster.jpg",
  },
  {
    name: "Hồ Yêu Tiểu Hồng Nương Nguyệt Hồng Thiên",
    slug: "ho-yeu-tieu-hong-nuong-nguyet-hong-thien",
    originName: "Fox Spirit Matchmaker 1",
    thumbUrl:
      "https://img.ophim.live/uploads/movies/ho-yeu-tieu-hong-nuong-nguyet-hong-thien-thumb.jpg",
    posterUrl:
      "https://img.ophim.live/uploads/movies/ho-yeu-tieu-hong-nuong-nguyet-hong-thien-poster.jpg",
  },
  {
    name: "Câu Chuyện Của Hoa Hồng",
    slug: "cau-chuyen-hoa-hong",
    originName: "The Tale of Rose",
    thumbUrl:
      "https://img.ophim.live/uploads/movies/cau-chuyen-hoa-hong-thumb.jpg",
    posterUrl:
      "https://img.ophim.live/uploads/movies/cau-chuyen-hoa-hong-poster.jpg",
  },
  {
    name: "Thế Giới Võ Hiệp: Kim Dung",
    slug: "the-gioi-vo-hiep-kim-dung",
    originName: "The Legend of Heroes",
    thumbUrl:
      "https://img.ophim.live/uploads/movies/the-gioi-vo-hiep-kim-dung-thumb.jpg",
    posterUrl:
      "https://img.ophim.live/uploads/movies/the-gioi-vo-hiep-kim-dung-poster.jpg",
  },
  {
    name: "Sát Nhân Giấu Mặt: Chương 1",
    slug: "sat-nhan-giau-mat-chuong-1",
    originName: "The Strangers: Chapter 1",
    thumbUrl:
      "https://img.ophim.live/uploads/movies/sat-nhan-giau-mat-chuong-1-thumb.jpg",
    posterUrl:
      "https://img.ophim.live/uploads/movies/sat-nhan-giau-mat-chuong-1-poster.jpg",
  },
  {
    name: "Hoa Máu",
    slug: "hoa-mau",
    originName: "Kan Cicekleri",
    thumbUrl: "https://img.ophim.live/uploads/movies/hoa-mau-thumb.jpg",
    posterUrl: "https://img.ophim.live/uploads/movies/hoa-mau-poster.jpg",
  },
  {
    name: "Cầm Tù",
    slug: "cam-tu",
    originName: "Esaret",
    thumbUrl: "https://img.ophim.live/uploads/movies/cam-tu-thumb.jpg",
    posterUrl: "https://img.ophim.live/uploads/movies/cam-tu-poster.jpg",
  },
  {
    name: "Con Gái Ngài Đại Sứ",
    slug: "con-gai-ngai-dai-su",
    originName: "Sefirin Kizi",
    thumbUrl:
      "https://img.ophim.live/uploads/movies/con-gai-ngai-dai-su-thumb.jpg",
    posterUrl:
      "https://img.ophim.live/uploads/movies/con-gai-ngai-dai-su-poster.jpg",
  },
  {
    name: "Trò Chơi Của Thần",
    slug: "tro-choi-cua-than",
    originName: "Gods' Game We Play",
    thumbUrl:
      "https://img.ophim.live/uploads/movies/tro-choi-cua-than-thumb.jpg",
    posterUrl:
      "https://img.ophim.live/uploads/movies/tro-choi-cua-than-poster.jpg",
  },
  {
    name: "Án Mạng Bí Ẩn",
    slug: "an-mang-bi-an",
    originName: "Amazing Story",
    thumbUrl: "https://img.ophim.live/uploads/movies/an-mang-bi-an-thumb.jpg",
    posterUrl: "https://img.ophim.live/uploads/movies/an-mang-bi-an-poster.jpg",
  },
  {
    name: "Hậu Tây Du Ký",
    slug: "hau-tay-du-ky",
    originName: "Hậu Tây Du Ký",
    thumbUrl: "https://img.ophim.live/uploads/movies/hau-tay-du-ky-thumb.jpg",
    posterUrl: "https://img.ophim.live/uploads/movies/hau-tay-du-ky-poster.jpg",
  },
  {
    name: "Thiên Hạ Đệ Nhất Kiếm",
    slug: "thien-ha-de-nhat-kiem",
    originName: "World's Finest",
    thumbUrl:
      "https://img.ophim.live/uploads/movies/thien-ha-de-nhat-kiem-thumb.jpg",
    posterUrl:
      "https://img.ophim.live/uploads/movies/thien-ha-de-nhat-kiem-poster.jpg",
  },
  {
    name: "Chuyển sinh thành đệ thất hoàng tử, tôi quyết định tự do tự tại trau dồi ma thuật",
    slug: "chuyen-sinh-thanh-de-that-hoang-tu-toi-quyet-dinh-tu-do-tu-tai-trau-doi-ma-thuat",
    originName:
      "I Was Reincarnated as the 7th Prince So I Can Take My Time Perfecting My Magical Ability",
    thumbUrl:
      "https://img.ophim.live/uploads/movies/chuyen-sinh-thanh-de-that-hoang-tu-toi-quyet-dinh-tu-do-tu-tai-trau-doi-ma-thuat-thumb.jpg",
    posterUrl:
      "https://img.ophim.live/uploads/movies/chuyen-sinh-thanh-de-that-hoang-tu-toi-quyet-dinh-tu-do-tu-tai-trau-doi-ma-thuat-poster.jpg",
  },
  {
    name: "Nguyệt Đạo Dị Giới (Phần 2)",
    slug: "nguyet-dao-di-gioi-phan-2",
    originName: "Tsukimichi -Moonlit Fantasy- Season 2 / Tsuki ga Michibiku 2",
    thumbUrl:
      "https://img.ophim.live/uploads/movies/nguyet-dao-di-gioi-phan-2-thumb.jpg",
    posterUrl:
      "https://img.ophim.live/uploads/movies/nguyet-dao-di-gioi-phan-2-poster.jpg",
  },
];

const gapSize = 15;

const OPhim = () => {
  const [perItemSize, setPerItemSize] = useState(0);

  const onLayout = useCallback((event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    setPerItemSize(calculatePerItemSize(width, gapSize));
  }, []);

  const insets = useSafeAreaInsetsStyle(["bottom"]);

  return (
    <View style={tw`flex-1 px-3`}>
      <View onLayout={onLayout}>
        <ScrollView
          overScrollMode="never"
          contentContainerStyle={insets}
          showsVerticalScrollIndicator={false}
        >
          <View style={tw`flex-row flex-wrap gap-[${gapSize}px] py-3`}>
            {DATA.map((item) => (
              <Pressable
                key={item.name}
                style={tw`w-[${perItemSize - 0.01}px] gap-1`}
                onPress={() => console.log('test')}
              >
                <Image
                  style={tw`w-full h-[${perItemSize + 50}px]`}
                  source={item.thumbUrl}
                  contentFit="cover"
                />
                <Text size={13} style={tw`font-semibold`} numberOfLines={1}>
                  {item.name}
                </Text>
              </Pressable>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default OPhim;
