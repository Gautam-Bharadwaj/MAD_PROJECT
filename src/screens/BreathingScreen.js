import React, { useState, useEffect, useContext, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SessionContext } from '../context/SessionContext';
import BreathingCircle from '../components/BreathingCircle';

const BreathingScreen = ({ navigation, route }) => {
    const { mode } = route.params;
    const { completeSession } = useContext(SessionContext);

    const [phase, setPhase] = useState('Ready');
    const [timeLeft, setTimeLeft] = useState(0);
    const [isActive, setIsActive] = useState(false);

    const startSession = () => {
        setIsActive(true);
        setPhase('Inhale');
        setTimeLeft(4);
    };

    const endSession = useCallback(() => {
        setIsActive(false);
        setPhase('Ready');
        completeSession();
        navigation.goBack();
    }, [completeSession, navigation]);

    useEffect(() => {
        let interval = null;

        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (isActive && timeLeft === 0) {
            if (phase === 'Inhale') {
                setPhase('Hold');
                setTimeLeft(4);
            } else if (phase === 'Hold') {
                setPhase('Exhale');
                setTimeLeft(4);
            } else if (phase === 'Exhale') {
                setPhase('Inhale');
                setTimeLeft(4);
            }
        }

        return () => clearInterval(interval);
    }, [isActive, timeLeft, phase]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{mode.title}</Text>

            <BreathingCircle phase={phase} />

            <Text style={styles.phaseText}>{phase}</Text>
            <Text style={styles.timerText}>{isActive ? timeLeft : ''}</Text>

            {!isActive ? (
                <TouchableOpacity style={styles.button} onPress={startSession}>
                    <Text style={styles.buttonText}>Start Breathing</Text>
                </TouchableOpacity>
            ) : (
                <TouchableOpacity style={[styles.button, styles.endButton]} onPress={endSession}>
                    <Text style={styles.buttonText}>End Session</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 40,
        color: '#333',
    },
    phaseText: {
        fontSize: 36,
        fontWeight: '600',
        marginTop: 40,
        color: '#4a90e2',
    },
    timerText: {
        fontSize: 24,
        marginTop: 10,
        color: '#666',
    },
    button: {
        marginTop: 50,
        backgroundColor: '#4a90e2',
        paddingHorizontal: 40,
        paddingVertical: 15,
        borderRadius: 30,
    },
    endButton: {
        backgroundColor: '#ff6b6b',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default BreathingScreen;
