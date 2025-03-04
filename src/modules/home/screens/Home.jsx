import { StyleSheet, Text, View, FlatList } from "react-native";
import { collection, getDocs } from "firebase/firestore"; 
import { useEffect, useState } from "react";
import React from "react";
import CardListHouses from "../../../kernel/components/CardListHouses";
import { db } from "../../../kernel/config/firebaseConfig"; // Asegúrate de importar la configuración de Firebase

export default function Home() {
  const [useHouse, setUseHouse] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const houses = [];
        querySnapshot.forEach((doc) => {
          houses.push({ id: doc.id, ...doc.data() });
        });
        setUseHouse(houses);
      } catch (error) {
        console.error("Error fetching documents: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList 
          data={useHouse}
          renderItem={({ item }) => (
            <CardListHouses
              image="https://placehold.co/600x400.png"
              title={item.name}
              description="dhghgdjshkjhskjdhkjhkjshkhdkjshk"
              precio={1000}
              rating={3.5}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});

/*
// Pines del display de 7 segmentos
const int segA = 9;
const int segB = 8;
const int segC = 7;
const int segD = 6;
const int segE = 5;
const int segF = 4;
const int segG = 3;

// Tabla de segmentos para los números del 0 al 9 (en cátodo común)

*/