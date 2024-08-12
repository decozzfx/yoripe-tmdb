import React, { useEffect, useState, useMemo } from "react";
import { StyleSheet, ScrollView, TextInput } from "react-native";

import { Box } from "native-base";

import { debounce } from "lodash";

import { useTheme } from "../../themes/useTheme";

import Layout from "../../components/Layout";
import Card from "../../components/Card";
import CardMovie from "../../components/CardMovie";

import { searchMovie } from "../../services";

const Search = ({ navigation }: any) => {
  const { theme } = useTheme();

  const [query, setQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [results, setResults] = useState<any>([]);

  const fetchMovie = async (query: any) => {
    setLoading(true);
    try {
      const { data } = await searchMovie(query);

      setResults(data?.results);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const moveToDetail = (id: number) => {
    navigation.navigate("Details", { id });
  };

  const changeHandler = (text: any) => {
    setQuery(text);
  };

  const debouncedChangeHandler = useMemo(
    () => debounce(changeHandler, 300),
    [],
  );

  useEffect(() => {
    if (query.length >= 2) {
      fetchMovie(query);
    } else if (query.length === 0) {
      setResults([]);
    }
  }, [query]);

  useEffect(() => {
    if (query.length === 0) {
      setResults([]);
    }

    return () => {
      debouncedChangeHandler.cancel();
    };
  }, []);

  return (
    <Layout>
      <ScrollView
        style={[styles.contentContainer, { backgroundColor: theme.layoutBg }]}>
        <Box mb={4} px={3} pt={3}>
          <Box mb={3}>
            <Card>
              <TextInput
                placeholder="Search Movies ..."
                placeholderTextColor={theme?.color}
                style={[
                  styles.input,
                  {
                    color: theme?.color,
                    backgroundColor: theme?.layoutBg,
                    borderColor: theme?.layoutBg,
                  },
                ]}
                onChangeText={t => debouncedChangeHandler(t)}
              />
            </Card>
          </Box>
        </Box>
        <CardMovie
          grid={2}
          data={results}
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
  input: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#f0f0f0",
    flex: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 14,
    height: 38,
    backgroundColor: "#f6f6f6",
  },
  inputCard: {
    borderTopWidth: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
});

export default Search;
