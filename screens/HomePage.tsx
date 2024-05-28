import { collection, onSnapshot, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../constants/Colors';
import { auth, db } from '../firebase/firebase';

export default function HomePage({ navigation }) {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    if (auth.currentUser) {
      const q = query(collection(db, 'users'));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setPatients(data);
        console.log(data);
      });
      return () => unsubscribe();
    }
  }, []);

  const startVideoCall = (patientId) => {
    navigation.navigate('VideoCall', { roomName: patientId });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Liste des patients</Text>
      {patients.map((patient) => (
        <View key={patient.id} style={styles.card}>
          <Text>{patient.Name}</Text>
          <Text>{patient.Email}</Text>
          <Text>{patient.PhoneNumber}</Text>
          
          <TouchableOpacity onPress={() => navigation.navigate('Profile', { patientId: patient.id })}>
            <Text style={{ color: Colors.lightBlue, fontSize: 20 }}>Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Prescription', { patientId: patient.id })}>
            <Text style={{ color: Colors.lightBlue, fontSize: 20 }}>Prescription</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Appointment', { patientId: patient.id })}>
            <Text style={{ color: Colors.lightBlue, fontSize: 20 }}>Appointment</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => startVideoCall(patient.id)}>
            <Text style={{ color: Colors.lightBlue, fontSize: 20 }}>Start Video Call</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: Colors.gray,
  },
  title: {
    fontSize: 25,
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: Colors.white,
    padding: 10,
    borderRadius: 8,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: Colors.lightBlue,
  }
});
