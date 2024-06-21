import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Appointments from "../screens/Appointments";
import Chat from "../screens/Chat"; // Import the Chat component
import Dashboard from "../screens/Dashboard";
import HomePage from "../screens/HomePage";
import Personal from "../screens/Personal";
import Prescription from "../screens/Prescription";
import Profile from "../screens/Profile";
import Appointment from "../screens/Rappel";
import VideoCall from "../screens/VideoCall";

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Liste"
        component={HomePage}
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="Personal"
        component={Personal}
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="Prescription"
        component={Prescription}
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="Appointment"
        component={Appointment}
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="VideoCall"
        component={VideoCall}
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="Prescriptions"
        component={Prescription}
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="Appointments"
        component={Appointments}
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="Chat" // Add the Chat screen to the navigation stack
        component={Chat}
        options={{
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
}
