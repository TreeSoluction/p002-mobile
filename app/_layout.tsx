import { useColorScheme } from "@/hooks/useColorScheme";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import React from "react";
import { StatusBar, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <SafeAreaView style={styles.container}>
        <StatusBar />
        <WebView
          source={{ uri: "https://feirasdepernambuco.com.br/" }}
          style={{ flex: 1 }}
          scalesPageToFit={false}
          scrollEnabled={false}
          bounces={false}
          overScrollMode="never"
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          injectedJavaScript={`
          // Adiciona meta viewport travada
          var meta = document.createElement('meta');
          meta.name = 'viewport';
          meta.content = 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no';
          document.getElementsByTagName('head')[0].appendChild(meta);

          // Trava scroll do body/html, mas permite scroll em elementos internos
          document.body.style.overflowX = 'hidden'; // trava scroll horizontal
          document.body.style.overflowY = 'auto';   // permite scroll vertical

          document.documentElement.style.overflowX = 'hidden';
          document.documentElement.style.overflowY = 'auto';

          // Desabilita zoom por gesto
          document.addEventListener('gesturestart', function(e) { e.preventDefault(); });
          document.addEventListener('wheel', function(e) { 
            if (e.ctrlKey) e.preventDefault(); // Impede zoom por ctrl+scroll
          }, { passive: false });

          // Desabilita seleção de texto
          document.body.style.userSelect = 'none';
          document.body.style.webkitUserSelect = 'none';
          document.body.style.msUserSelect = 'none';
          document.body.style.MozUserSelect = 'none';

          // Desabilita menu de contexto
          document.addEventListener('contextmenu', function(e) { e.preventDefault(); });

          true;
        `}
        />
      </SafeAreaView>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
