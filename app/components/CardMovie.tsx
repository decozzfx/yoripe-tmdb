import React from "react";
import { StyleSheet, View, Dimensions, Pressable } from "react-native";
import { Box, AspectRatio, Image, Skeleton, Heading, Text } from "native-base";

import { useTheme } from "../themes/useTheme";

const checkIndexIsEven = (n: number) => {
  return n % 2 == 0;
};

const CardMovie = (props: any) => {
  const { theme } = useTheme();
  const { grid, data, isLoading, onPress } = props;
  return isLoading ? (
    <View style={styles.row}>
      {[1, 2, 3].map((item: any, idx: number) => (
        <Box
          key={`items-${idx}`}
          style={[
            styles.cols,
            { paddingLeft: checkIndexIsEven(idx) ? 12 : 0 },
            { paddingRight: checkIndexIsEven(idx) ? 0 : 12 },
          ]}>
          <AspectRatio
            ratio={{
              base: 3 / 4,
            }}
            borderRadius="lg"
            bg="gray.100"
            overflow={"hidden"}
            position={`relative`}>
            <Skeleton h="80" w="100%" />
          </AspectRatio>
        </Box>
      ))}
    </View>
  ) : grid === 2 ? (
    <View style={styles.row}>
      {data.map((item: any, idx: number) => (
        <Box
          key={`items-${idx}`}
          style={[
            styles.cols,
            { paddingLeft: checkIndexIsEven(idx) ? 12 : 0 },
            { paddingRight: checkIndexIsEven(idx) ? 0 : 12 },
          ]}>
          <Pressable onPress={() => onPress(item.id)}>
            <AspectRatio
              ratio={{
                base: 3 / 4,
              }}
              borderRadius="lg"
              bg="gray.100"
              overflow={"hidden"}
              position={`relative`}>
              <Image
                resizeMode="cover"
                borderRadius="lg"
                source={{
                  uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}`,
                }}
                alt={item.title}
              />
            </AspectRatio>
          </Pressable>
        </Box>
      ))}
    </View>
  ) : (
    <Box px={3}>
      {data.map((item: any, idx: number) => (
        <Box key={`items-${idx}`} mb="2" display={`flex`} flexDirection="row">
          <Box w={90} mr={3}>
            <AspectRatio
              ratio={{
                base: 3 / 4,
              }}
              borderRadius="lg"
              bg="gray.100"
              overflow={"hidden"}
              position={`relative`}>
              <Image
                resizeMode="cover"
                borderRadius="lg"
                source={{
                  uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}`,
                }}
                alt={item.title}
              />
            </AspectRatio>
          </Box>
          <Box>
            <Pressable onPress={() => onPress(item.id)}>
              <Heading
                size="sm"
                mb={1}
                style={{ color: theme.color }}
                isTruncated
                maxW="280"
                w="100%">
                {item.title}
              </Heading>
            </Pressable>
            <Text style={{ color: theme.color }}>
              Rate: <Text bold>{item.vote_average}</Text>
            </Text>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

const gap = 8;
const itemPerRow = 2;
const totalGapSize = (itemPerRow - 1) * gap;
const windowWidth = Dimensions.get("window").width;
const childWidth = (windowWidth - totalGapSize) / itemPerRow;

const styles = StyleSheet.create<any>({
  row: {
    flexWrap: "wrap",
    flexDirection: "row",
    marginVertical: -(gap / 2),
    marginHorizontal: -(gap / 2),
  },
  cols: {
    width: childWidth,
    marginVertical: gap / 2,
    marginHorizontal: gap / 2,
  },
});

export default CardMovie;
