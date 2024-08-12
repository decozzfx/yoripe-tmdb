import React from "react";
import { StyleSheet, ScrollView, Pressable } from "react-native";
import { connect, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { moviewDelete } from "../../store/wishlistSlice";

import {
  Heading,
  Text,
  Divider,
  Box,
  Flex,
  IconButton,
  AspectRatio,
  Image,
} from "native-base";
import Icon from "react-native-vector-icons/Ionicons";

import { useTheme } from "../../themes/useTheme";

import Layout from "../../components/Layout";
import Card from "../../components/Card";

const WishList = ({ navigation, wishlistData }: any) => {
  const { theme } = useTheme();

  const dispatch = useDispatch();

  const moveToDetail = (id: number) => {
    navigation.navigate("Details", { id });
  };

  return (
    <Layout>
      <ScrollView
        style={[styles.contentContainer, { backgroundColor: theme.layoutBg }]}>
        <Box mb={4} px={3} pt={3}>
          <Card>
            <Heading fontSize="xl" mb={3} style={{ color: theme.color }}>
              My Wish list movies
            </Heading>
            <Divider mb={3} />
            {wishlistData.length > 0 &&
              wishlistData.map((item: any, idx: number) => (
                <Flex
                  key={`wishlist-item-${idx}`}
                  w={`100%`}
                  py={2}
                  direction="row"
                  alignItems={"center"}
                  borderBottomWidth={wishlistData.length - 1 !== idx ? 1 : 0}
                  borderBottomColor={theme.layoutBg}
                  justifyContent={"space-between"}>
                  <Box pr={2}>
                    <Pressable onPress={() => moveToDetail(item.id)}>
                      <Flex direction="row" alignItems={"center"}>
                        <Box w={30} mr={3}>
                          <AspectRatio
                            ratio={{
                              base: 3 / 4,
                            }}
                            bg="gray.100"
                            overflow={"hidden"}
                            position={`relative`}>
                            <Image
                              resizeMode="cover"
                              source={{
                                uri: `https://image.tmdb.org/t/p/w500/${item.img_poster}`,
                              }}
                              alt={item.title}
                            />
                          </AspectRatio>
                        </Box>
                        <Box>
                          <Heading
                            size="sm"
                            mb={1}
                            style={{ color: theme.color }}
                            isTruncated
                            maxW="280"
                            w="100%">
                            {item.title}
                          </Heading>
                        </Box>
                      </Flex>
                    </Pressable>
                  </Box>
                  <Box pl={2}>
                    <IconButton
                      onPress={() => dispatch(moviewDelete(item.id))}
                      size={`md`}
                      variant={`ghost`}
                      icon={
                        <Icon
                          name={"trash-sharp"}
                          size={20}
                          color={theme.error}
                        />
                      }
                    />
                  </Box>
                </Flex>
              ))}
          </Card>
        </Box>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
  },
});

const mapStateToProps = (state: RootState) => {
  const { wishlist } = state;
  return { wishlistData: wishlist || [] };
};

export default connect(mapStateToProps)(WishList);
