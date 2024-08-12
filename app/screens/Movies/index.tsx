import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { Heading, Divider, Box, IconButton } from "native-base";
import Icon from "react-native-vector-icons/Ionicons";

import { useTheme } from "../../themes/useTheme";

import Layout from "../../components/Layout";
import CardMovie from "../../components/CardMovie";

import { getMoviesPopular } from "../../services";

const Movies = ({ navigation }: any) => {
  const { theme } = useTheme();

  const [movies, setMovies] = useState<any>([]);

  const [gridType, setGridType] = useState<number>(2);

  const [loading, setLoading] = useState<boolean>(false);

  const moveToDetail = (id: number) => {
    navigation.navigate("Details", { id });
  };

  useEffect(() => {
    const fetchMovie = async () => {
      setLoading(true);
      try {
        const { data } = await getMoviesPopular();

        setMovies(data?.results);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    if (movies.length < 1) {
      fetchMovie();
    }
  }, []);

  return (
    <Layout>
      <ScrollView
        style={[styles.contentContainer, { backgroundColor: theme.layoutBg }]}>
        <Box mb={4} px={3} pt={3}>
          <Heading size="lg" style={{ color: theme.color }} mb={2}>
            TMDB Movies Apps
          </Heading>
        </Box>

        <Box
          mb={4}
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          px={3}>
          <Box>
            <Heading size="md" style={{ color: theme.color }} mb={2}>
              Popular
            </Heading>
          </Box>
          <Box display="flex" flexDirection="row" alignItems="center">
            <IconButton
              onPress={() => setGridType(1)}
              size={`md`}
              variant={`ghost`}
              mr={1}
              icon={<Icon name="list-sharp" size={28} color={theme.color} />}
            />
            <IconButton
              onPress={() => setGridType(2)}
              size={`md`}
              variant={`ghost`}
              icon={<Icon name="grid" size={20} color={theme.color} />}
            />
          </Box>
        </Box>

        <Box px={3}>
          <Divider mb={6} />
        </Box>

        <CardMovie
          grid={gridType}
          data={movies}
          isLoading={loading}
          onPress={moveToDetail}
        />
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
  },
});

export default Movies;
