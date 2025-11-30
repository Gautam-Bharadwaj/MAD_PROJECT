import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';

const BreathingCircle = ({ phase }) => {
    const scaleAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        if (phase === 'Inhale') {
            Animated.timing(scaleAnim, {
                toValue: 1.5,
                duration: 4000,
                useNativeDriver: true,
            }).start();
        } else if (phase === 'Exhale') {
            Animated.timing(scaleAnim, {
                toValue: 1,
                duration: 4000,
                useNativeDriver: true,
            }).start();
        }
    }, [phase]);

    return (
        <View style={styles.container}>
            <Animated.View
                style={[
                    styles.circle,
                    {
                        transform: [{ scale: scaleAnim }],
                    },
                ]}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 300,
    },
    circle: {
        width: 150,
        height: 150,
        borderRadius: 75,
        backgroundColor: '#87CEEB',
        opacity: 0.8,
    },
});

export default BreathingCircle;
