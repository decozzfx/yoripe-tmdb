import Config from "react-native-config";
const APP_CONSTANT = {
  api_base_url: Config.BASE_URL,
  api_key: `api_key=${Config.API_KEY}`,
  access_token: Config.ACCESS_TOKEN,
  goldenRatio: 1.618,
};

export default APP_CONSTANT;
