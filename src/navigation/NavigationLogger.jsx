import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "@rneui/base";

// Asegúrate de que estas importaciones sean correctas y apunten a los archivos donde están definidos tus componentes.
import HomeStack from "./stack/navigationLoggerStack/HomeStack"; // ACTUALIZAAAAAARRRRRR
import ProductosStack from "./Productos"; // Cambia la ruta según sea necesario
import PerfilStack from "../modules/auth/screens/Profile"; // Cambia la ruta según sea necesario

const Tab = createBottomTabNavigator();

export default function NavigationLogger(){
    return(
        <NavigationContainer>
            <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                  const { iconName, iconType } = getIconName(route.name, focused);
                  return (
                    <Icon name={iconName} type={iconType} size={size} color={color} />
                  );
                },
                tabBarActiveTintColor: "tomato",
                tabBarInactiveTintColor: "gray",
                headerShown: false,
              })}
            >
                <Tab.Screen
                name="Home"
                component={HomeStack}
                options={{title: "Home"}}
                />
                <Tab.Screen
                name="Top5"
                component={ProductosStack}
                options={{title: "Productos"}}
                />
                <Tab.Screen
                name="Profile"
                component={PerfilStack}
                options={{title: "Perfil"}}
                />
            </Tab.Navigator>
        </NavigationContainer>
    )
}

const getIconName = (routeName, focused) => {
    let iconName = "";
    let iconType = "material-community";
  
    switch (routeName) {
      case "Home":
        iconName = focused ? "home" : "home-outline";
        break;
        case "Profile":
        iconName = focused ? "account" : "account-outline";
        break;
        case "Top5":
        iconName = focused ? "trophy" : "trophy-outline";
        break;
    }
    return { iconName, iconType };
  };