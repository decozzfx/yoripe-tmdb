import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { movieAdded, moviewDelete } from "../../store/wishlistSlice";
import { StyleSheet, ScrollView } from "react-native";
import {
  Heading,
  Text,
  Box,
  HStack,
  Spinner,
  Center,
  Image,
  Flex,
  AspectRatio,
  IconButton,
} from "native-base";
import Icon from "react-native-vector-icons/Ionicons";

import { useTheme } from "../../themes/useTheme";

import Layout from "../../components/Layout";

import { getMovieDetail } from "../../services";

const Detail = ({ route, wishlistData }: any) => {
  const { theme } = useTheme();

  const dispatch = useDispatch();

  const { id } = route.params;

  const [loading, setLoading] = useState<boolean>(true);

  const [hasBookMark, setHasBookMark] = useState<boolean>(true);

  const [movie, setMovie] = useState<any>({});

  useEffect(() => {
    const fetchMovie = async () => {
      setLoading(true);
      try {
        const { data } = await getMovieDetail(id);

        setMovie(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  useEffect(() => {
    const hasMovie = wishlistData.filter((item: any) => item.id === id).length;
    setHasBookMark(hasMovie > 0 ? true : false);
  }, [wishlistData]);

  const handleBookMark = () => {
    if (hasBookMark) {
      dispatch(moviewDelete(id));
    } else {
      dispatch(
        movieAdded({
          id: movie.id,
          title: movie.title,
          img_poster: movie.poster_path,
        }),
      );
    }
  };

  return (
    <Layout>
      {loading ? (
        <Center mt="24">
          <HStack space={2} alignItems="center">
            <Spinner size="lg" />
            <Heading color="primary.500" fontSize="lg">
              Loading
            </Heading>
          </HStack>
        </Center>
      ) : (
        <ScrollView
          style={[
            styles.contentContainer,
            { backgroundColor: theme.layoutBg },
          ]}>
          <Box mb={2}>
            <AspectRatio
              ratio={{
                base: 16 / 9,
              }}
              bg="gray.100"
              overflow={"hidden"}
              position={`relative`}>
              <Image
                resizeMode="cover"
                source={{
                  uri: `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`,
                }}
                alt={movie.title}
              />
            </AspectRatio>
          </Box>
          <Box mb={4} px={3} pt={3}>
            <Flex
              mb={1}
              width={`100%`}
              maxW={`100%`}
              justifyContent={`space-between`}
              alignItems={`center`}
              direction="row">
              <Box pr={1}>
                <Heading fontSize="lg" style={{ color: theme.color }}>
                  {movie.title}
                </Heading>
                <Text style={{ color: theme.color }} fontSize={"sm"}>
                  {movie.tagline}
                </Text>
              </Box>
              <Box pl={1}>
                <IconButton
                  onPress={() => handleBookMark()}
                  size={`md`}
                  variant={`ghost`}
                  mr={1}
                  icon={
                    <Icon
                      name={hasBookMark ? "heart-sharp" : "heart-outline"}
                      size={28}
                      color={hasBookMark ? theme.error : theme.color}
                    />
                  }
                />
              </Box>
            </Flex>
            <Box mb={3}>
              <Text style={{ color: theme.color }} fontSize={"md"}>
                {movie.overview}
              </Text>
            </Box>
            <Box mb={3}>
              <Text style={{ color: theme.color }} fontSize={"md"} bold>
                Gendres:
              </Text>
              <Text style={{ color: theme.color }} fontSize={"sm"}>
                {movie.genres.map((genre: any, idx: number) =>
                  idx + 1 !== movie.genres.length
                    ? `${genre.name}, `
                    : genre.name,
                )}
              </Text>
            </Box>
            <Box mb={3}>
              <Text style={{ color: theme.color }} fontSize={"md"} bold>
                Rate:
              </Text>
              <Text style={{ color: theme.color }} fontSize={"sm"}>
                <Icon name="star-sharp" size={16} color={theme.primary} />{" "}
                {movie.vote_average}
              </Text>
            </Box>
            <Box mb={3}>
              <Text style={{ color: theme.color }} fontSize={"md"} bold>
                Release Date:
              </Text>
              <Text style={{ color: theme.color }} fontSize={"sm"}>
                {movie.release_date}
              </Text>
            </Box>
            <Box mb={3}>
              <Text style={{ color: theme.color }} fontSize={"md"} bold>
                Production By:
              </Text>
              <Text style={{ color: theme.color }} fontSize={"sm"}>
                {movie.production_companies.map((genre: any, idx: number) =>
                  idx + 1 !== movie.production_companies.length
                    ? `${genre.name}, `
                    : genre.name,
                )}
              </Text>
            </Box>
          </Box>
        </ScrollView>
      )}
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

export default connect(mapStateToProps)(Detail);
