import React from "react";
import { Provider } from "react-redux";
import { store } from "./app/store/store";
import { ThemeProvider } from "./app/themes/useTheme";
import { NativeBaseProvider, Box } from "native-base";

// Navigation
import RootNavigation from "./app/routes/RootNavigation";

const App = () => {
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <ThemeProvider>
          <RootNavigation />
        </ThemeProvider>
      </NativeBaseProvider>
    </Provider>
  );
};

export default App;
