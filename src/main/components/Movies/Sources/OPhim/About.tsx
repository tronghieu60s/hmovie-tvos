import tw from "@/src/core/tailwind";
import { Badge } from "@/src/main/base/Flowbite/Badge";
import { Text } from "@/src/main/base/Text";
import { MovieType } from "@/src/main/recoil/movie/ophim/types";
import React from "react";
import { View } from "react-native";

type Props = {
  movie: MovieType;
};

const MoviesOPhimAbout = (props: Props) => {
  const { movie } = props;

  return (
    <View style={tw`grow min-h-full gap-5 p-3`}>
      {movie.countries.length > 0 && (
        <View style={tw`gap-3`}>
          <Text size={15} style={tw`font-bold`}>
            Quốc Gia
          </Text>
          <View style={tw`flex-row flex-wrap gap-2`}>
            {movie.countries.map((director, index) => (
              <Badge key={index} label={director} />
            ))}
          </View>
        </View>
      )}
      <View style={tw`gap-3`}>
        <Text size={15} style={tw`font-bold`}>
          Nội Dung
        </Text>
        <Text>
          {movie.content.replace(/<[^>]*>?/gm, "") ||
            "Không có mô tả cho bộ phim này."}
        </Text>
      </View>
      {movie.directors.length > 0 && (
        <View style={tw`gap-3`}>
          <Text size={15} style={tw`font-bold`}>
            Đạo Diễn
          </Text>
          <View style={tw`flex-row flex-wrap gap-2`}>
            {movie.directors.map((director, index) => (
              <Badge key={index} label={director} />
            ))}
          </View>
        </View>
      )}
      {movie.casts.length > 0 && (
        <View style={tw`gap-3`}>
          <Text size={15} style={tw`font-bold`}>
            Diễn Viên
          </Text>
          <View style={tw`flex-row flex-wrap gap-2`}>
            {movie.casts.map((cast, index) => (
              <Badge key={index} label={cast} />
            ))}
          </View>
        </View>
      )}
    </View>
  );
};

export default MoviesOPhimAbout;
