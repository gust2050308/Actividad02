import react from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Productos from "../modules/productos/Productos";

const Stack = createStackNavigator();

export default function Top5Stack(){
    return(
        <Stack.Navigator>
            <Stack.Screen name="Productos" component={Productos} options={{title: "Productos"}}/>
        </Stack.Navigator>
    );
}