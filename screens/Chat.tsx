import { addDoc, collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Colors from "../constants/Colors";
import { auth, db } from "../firebase/firebase";

export default function Chat({ route }) {
  const { patientId } = route.params;
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<any[]>([]);
  const user = auth.currentUser;

  useEffect(() => {
    if (!user) {
      console.log("No user is logged in");
      return;
    }

    console.log("Fetching messages for user:", user.uid, "and patient:", patientId);

    const q = query(
      collection(db, "messages"),
      where("participants", "array-contains", user.uid),
      orderBy("sentAt", "asc")
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messagesList: any[] = [];
      querySnapshot.forEach((doc) => {
        console.log("Message document:", doc.id, doc.data());
        messagesList.push({ id: doc.id, ...doc.data() });
      });
      setMessages(messagesList);
    });

    return () => unsubscribe();
  }, [patientId, user]);

  const handleSend = async () => {
    if (message.trim()) {
      await addDoc(collection(db, "messages"), {
        participants: [user.uid, patientId],
        senderId: user.uid,
        message,
        read: false,
        sentAt: new Date().toISOString(),
      });
      setMessage("");
    }
  };

  const renderItem = ({ item }) => (
    <View style={item.senderId === user.uid ? styles.myMessage : styles.theirMessage}>
      <Text style={item.senderId === user.uid ? styles.myMessageText : styles.theirMessageText}>
        {item.message}
      </Text>
      <Text style={styles.dateText}>{new Date(item.sentAt).toLocaleString()}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.flatListContent}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Écrire un message..."
          value={message}
          onChangeText={setMessage}
        />
        <TouchableOpacity style={styles.button} onPress={handleSend}>
          <Text style={styles.buttonText}>Envoyer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  flatListContent: {
    flexGrow: 1,
    justifyContent: "flex-end",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  input: {
    flex: 1,
    height: 50,
    borderColor: Colors.light,
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    marginRight: 10,
  },
  button: {
    backgroundColor: Colors.primary,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: Colors.white,
    fontSize: 16,
  },
  myMessage: {
    alignSelf: "flex-end",
    backgroundColor: Colors.light,
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    maxWidth: "70%",
  },
  theirMessage: {
    alignSelf: "flex-start",
    backgroundColor: Colors.dark,
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    maxWidth: "70%",
  },
  myMessageText: {
    color: Colors.dark,
  },
  theirMessageText: {
    color: Colors.white,
  },
  dateText: {
    fontSize: 10,
    color: Colors.gray,
    marginTop: 5,
  },
});
