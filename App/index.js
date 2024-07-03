// Filename: index.js
// Combined code from all files

import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, StatusBar, Text, View, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';

const ReminderApp = () => {
    const [reminders, setReminders] = useState([]);
    const [text, setText] = useState('');

    const addReminder = () => {
        if (text.trim().length === 0) return;
        setReminders([...reminders, { id: (new Date()).getTime().toString(), text }]);
        setText('');
    };

    const deleteReminder = (id) => {
        setReminders(reminders.filter(reminder => reminder.id !== id));
    };

    return (
        <View style={styles.appContainer}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Введите напоминание..."
                    value={text}
                    onChangeText={setText}
                />
                <Button title="Добавить" onPress={addReminder} />
            </View>
            <FlatList
                data={reminders}
                renderItem={({ item }) => (
                    <View style={styles.reminderItem}>
                        <Text style={styles.reminderText}>{item.text}</Text>
                        <TouchableOpacity onPress={() => deleteReminder(item.id)}>
                            <Text style={styles.deleteText}>Удалить</Text>
                        </TouchableOpacity>
                    </View>
                )}
                keyExtractor={item => item.id}
            />
        </View>
    );
};

export default function App() {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar hidden />
            <Text style={styles.title}>Напоминания</Text>
            <ReminderApp />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginVertical: 20,
        textAlign: 'center',
    },
    appContainer: {
        flex: 1,
        paddingHorizontal: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10,
    },
    input: {
        flex: 1,
        borderBottomWidth: 1,
        borderColor: '#ccc',
        marginRight: 10,
        paddingVertical: 5,
    },
    reminderItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        marginVertical: 5,
    },
    reminderText: {
        fontSize: 16,
    },
    deleteText: {
        color: 'red',
        fontWeight: 'bold',
    },
});