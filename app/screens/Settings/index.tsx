import React from "react";
import { connect, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { resetMovie } from "../../store/wishlistSlice";
import { StyleSheet, ScrollView, Switch } from "react-native";
import { Heading, Text, Divider, Box, Button } from "native-base";

import { useTheme } from "../../themes/useTheme";

import Layout from "../../components/Layout";
import Card from "../../components/Card";

const Settings = ({ wishlistData }: any) => {
  const { theme, toggleTheme } = useTheme();

  const dispatch = useDispatch();

  return (
    <Layout>
      <ScrollView
        style={[styles.contentContainer, { backgroundColor: theme.layoutBg }]}>
        <Card style={{ backgroundColor: theme.cardBg }}>
          <Box>
            <Heading size="md" style={{ color: theme.color }}>
              General Setting
            </Heading>
          </Box>
          <Divider my={4} />
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            py={4}>
            <Box>
              <Text bold style={{ color: theme.color }}>
                Clear Wishlist
              </Text>
            </Box>
            <Box>
              <Button
                size={`sm`}
                colorScheme="secondary"
                isDisabled={wishlistData.length < 1}
                onPress={() => dispatch(resetMovie())}>
                Clear
              </Button>
            </Box>
          </Box>
          <Divider mt={8} mb={4} />
        </Card>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    paddingVertical: 16,
    paddingHorizontal: 12,
  },
});

const mapStateToProps = (state: RootState) => {
  const { wishlist } = state;
  return { wishlistData: wishlist || [] };
};

export default connect(mapStateToProps)(Settings);
