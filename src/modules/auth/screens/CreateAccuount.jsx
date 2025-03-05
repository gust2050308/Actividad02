import React, { useState } from "react";
import { View, StyleSheet } from 'react-native';
import { Image, Input, Button, Icon } from "@rneui/base";
import { isEmpty } from "lodash";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../kernel/utils/FirebaseConnection"; // Asegúrate de importar correctamente la configuración de Firebase

export default function CreateAccount(props) {
    const { navigation } = props;
    const [showPassword, setShowPassword] = useState(true);
    const [showPassword2, setShowPassword2] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState({ email: "", password: "", confirmPassword: "" });

    const handleCreateAccount = () => {
        if (isEmpty(email) || isEmpty(password) || isEmpty(confirmPassword)) {
            setError({
                email: isEmpty(email) ? "El correo electrónico es requerido" : "",
                password: isEmpty(password) ? "La contraseña es requerida" : "",
                confirmPassword: isEmpty(confirmPassword) ? "La confirmación de la contraseña es requerida" : ""
            });
        } else if (password !== confirmPassword) {
            setError({
                email: "",
                password: "Las contraseñas no coinciden",
                confirmPassword: "Las contraseñas no coinciden"
            });
        } else {
            setError({ email: "", password: "", confirmPassword: "" });
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Registro exitoso
                    const user = userCredential.user;
                    console.log("User registered successfully:", user);
                    navigation.navigate("Home"); // Navegar a la pantalla Home después del registro
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.error("Error registering user:", errorCode, errorMessage);
                    // Manejar errores específicos
                    if (errorCode === "auth/email-already-in-use") {
                        setError({ email: "El correo electrónico ya está en uso" });
                    } else if (errorCode === "auth/invalid-email") {
                        setError({ email: "El correo electrónico no es válido" });
                    } else if (errorCode === "auth/weak-password") {
                        setError({ password: "La contraseña es muy débil" });
                    } else {
                        setError({ email: "", password: "", confirmPassword: errorMessage });
                    }
                });
        }
    };

    return (
        <View style={styles.container}>
            <Image
                source={{ uri: "https://reactnative.dev/img/tiny_logo.png" }}
                style={{ width: 50, height: 50 }}
            />
            <View style={{ margin: 16 }}>
                <Input
                    placeholder="Correo electrónico"
                    label="Correo Electrónico"
                    keyboardType="email-address"
                    inputContainerStyle={{ width: '100%' }}
                    onChange={({ nativeEvent: { text } }) => setEmail(text)}
                    errorMessage={error.email}
                />
                <Input
                    placeholder="Contraseña"
                    label="Contraseña"
                    secureTextEntry={showPassword}
                    inputContainerStyle={{ width: '100%' }}
                    rightIcon={
                        <Icon
                            name={showPassword ? "eye" : "eye-off"}
                            type="material-community"
                            onPress={() => setShowPassword(!showPassword)}
                        />
                    }
                    onChange={({ nativeEvent: { text } }) => setPassword(text)}
                    errorMessage={error.password}
                />
                <Input
                    placeholder="Confirmar Contraseña"
                    label="Confirmar contraseña"
                    secureTextEntry={showPassword2}
                    inputContainerStyle={{ width: '100%' }}
                    rightIcon={
                        <Icon
                            name={showPassword2 ? "eye" : "eye-off"}
                            type="material-community"
                            onPress={() => setShowPassword2(!showPassword2)}
                        />
                    }
                    onChange={({ nativeEvent: { text } }) => setConfirmPassword(text)}
                    errorMessage={error.confirmPassword}
                />
                <Button
                    title={"Crear Cuenta"}
                    onPress={handleCreateAccount}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
