import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FlatList, ListRenderItem, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Colors from "../constants/Colors";
import { db } from "../firebase/firebase";

interface Appointment {
  id: string;
  patientName: string;
  date: string;
  time: string;
  status: string;
}

export default function Appointments({ navigation }: { navigation: any }) {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      const appointmentsCollection = collection(db, "appointments");
      const appointmentsSnapshot = await getDocs(appointmentsCollection);
      const appointmentsList = appointmentsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Appointment[];
      setAppointments(appointmentsList);
    };

    fetchAppointments();
  }, []);

  const handleStatusChange = async (id: string, status: string) => {
    const appointmentRef = doc(db, "appointments", id);
    await updateDoc(appointmentRef, { status });
    setAppointments(appointments.map(appointment => appointment.id === id ? { ...appointment, status } : appointment));
  };

  const renderItem: ListRenderItem<Appointment> = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.text}>Patient: {item.patientName}</Text>
      <Text style={styles.text}>Date: {item.date}</Text>
      <Text style={styles.text}>Time: {item.time}</Text>
      <Text style={styles.text}>Status: {item.status}</Text>
      <View style={styles.buttonGroup}>
        <TouchableOpacity
          style={[styles.button, styles.acceptButton]}
          onPress={() => handleStatusChange(item.id, "confirmé")}
        >
          <Text style={styles.buttonText}>Accepter</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.refuseButton]}
          onPress={() => handleStatusChange(item.id, "refusé")}
        >
          <Text style={styles.buttonText}>Refuser</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={appointments}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.white,
  },
  card: {
    backgroundColor: Colors.light,
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    width: "45%",
  },
  acceptButton: {
    backgroundColor: Colors.green,
  },
  refuseButton: {
    backgroundColor: Colors.red,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 16,
  },
});
