import React, { useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { SessionContext } from '../context/SessionContext';

const breathingModes = [
    { id: '1', title: 'Box Breathing', description: '4-4-4-4 pattern for focus' },
    { id: '2', title: 'Relaxing Breath', description: '4-7-8 pattern for sleep' },
    { id: '3', title: 'Calm Breath', description: '5-5 pattern for anxiety' },
];

const HomeScreen = ({ navigation }) => {
    const { sessionCount } = useContext(SessionContext);

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('Breathing', { mode: item })}
        >
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardDescription}>{item.description}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Welcome Back</Text>
            <Text style={styles.subHeader}>Total Sessions: {sessionCount}</Text>

            <FlatList
                data={breathingModes}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.list}
            />

            <TouchableOpacity
                style={styles.statsButton}
                onPress={() => navigation.navigate('Stats')}
            >
                <Text style={styles.statsButtonText}>View Stats</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    header: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    subHeader: {
        fontSize: 18,
        marginBottom: 30,
        color: '#666',
    },
    list: {
        paddingBottom: 20,
    },
    card: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 15,
        marginBottom: 15,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 5,
        color: '#333',
    },
    cardDescription: {
        fontSize: 14,
        color: '#666',
    },
    statsButton: {
        backgroundColor: '#4a90e2',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
    },
    statsButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default HomeScreen;
