import tw from "@/src/core/tailwind";
import { Badge } from "@/src/main/base/Flowbite/Badge";
import { Text } from "@/src/main/base/Text";
import { MovieType } from "@/src/main/recoil/movie/phimnguonc/types";
import React, { useMemo } from "react";
import { View } from "react-native";

type Props = {
  movie: MovieType;
};

const MoviesPhimNguonCAbout = (props: Props) => {
  const { movie } = props;

  const countries = useMemo(
    () =>
      movie.taxonomies
        .filter((item) => ["quoc-gia"].includes(item.group.slug))
        .map((item) => item.categories)
        .flat(),
    [movie.taxonomies],
  );

  return (
    <View style={tw`grow min-h-full gap-5 p-3`}>
      {countries.length > 0 && (
        <View style={tw`gap-3`}>
          <Text size={15} style={tw`font-bold`}>
            Quốc Gia
          </Text>
          <View style={tw`flex-row flex-wrap gap-2`}>
            {countries.map((director, index) => (
              <Badge key={index} label={director.name} />
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

export default MoviesPhimNguonCAbout;
