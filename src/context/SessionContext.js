import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
    const [sessionCount, setSessionCount] = useState(0);
    const [history, setHistory] = useState([]);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const storedCount = await AsyncStorage.getItem('sessionCount');
            const storedHistory = await AsyncStorage.getItem('sessionHistory');

            if (storedCount) setSessionCount(parseInt(storedCount));
            if (storedHistory) setHistory(JSON.parse(storedHistory));
        } catch (error) {
            console.error('Failed to load data', error);
        }
    };

    const completeSession = async () => {
        const newCount = sessionCount + 1;
        const newHistory = [...history, new Date().toISOString()];

        setSessionCount(newCount);
        setHistory(newHistory);

        try {
            await AsyncStorage.setItem('sessionCount', newCount.toString());
            await AsyncStorage.setItem('sessionHistory', JSON.stringify(newHistory));
        } catch (error) {
            console.error('Failed to save data', error);
        }
    };

    return (
        <SessionContext.Provider value={{ sessionCount, history, completeSession }}>
            {children}
        </SessionContext.Provider>
    );
};
