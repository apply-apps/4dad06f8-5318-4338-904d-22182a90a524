// Filename: index.js
// Combined code from all files

// App.js
import React from 'react';
import { SafeAreaView, StyleSheet, StatusBar, Text, View, TextInput, Button, ActivityIndicator } from 'react-native';

const TranslatorApp = () => {
    const [text, setText] = useState('');
    const [translatedText, setTranslatedText] = useState('');
    const [loading, setLoading] = useState(false);

    const translateText = async () => {
        if (text.trim().length === 0) return;

        setLoading(true);
        try {
            const response = await fetch('https://libretranslate.com/translate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    q: text,
                    source: 'en',
                    target: 'ru'
                })
            });
            const data = await response.json();
            setTranslatedText(data.translatedText);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Введите текст на английском..."
                value={text}
                onChangeText={setText}
            />
            <Button title="Перевести" onPress={translateText} />
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <Text style={styles.translatedText}>{translatedText}</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        justifyContent: 'center',
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        paddingHorizontal: 10,
        marginVertical: 10,
    },
    translatedText: {
        fontSize: 18,
        marginVertical: 20,
    },
});

export default function App() {
    return (
        <SafeAreaView style={appStyles.container}>
            <StatusBar hidden />
            <Text style={appStyles.title}>Переводчик</Text>
            <TranslatorApp />
        </SafeAreaView>
    );
}

const appStyles = StyleSheet.create({
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
});