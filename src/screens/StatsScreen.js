import React, { useContext, useMemo } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { SessionContext } from '../context/SessionContext';

const StatsScreen = () => {
    const { history } = useContext(SessionContext);

    const last7Days = useMemo(() => {
        const now = new Date();
        const sevenDaysAgo = new Date(now.setDate(now.getDate() - 7));

        return history.filter(date => new Date(date) > sevenDaysAgo).reverse();
    }, [history]);

    const renderItem = ({ item }) => (
        <View style={styles.historyItem}>
            <Text style={styles.dateText}>
                {new Date(item).toLocaleDateString()}
            </Text>
            <Text style={styles.timeText}>
                {new Date(item).toLocaleTimeString()}
            </Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Your Progress</Text>

            <View style={styles.summaryCard}>
                <Text style={styles.summaryTitle}>Last 7 Days</Text>
                <Text style={styles.summaryCount}>{last7Days.length} Sessions</Text>
            </View>

            <Text style={styles.historyHeader}>Recent Activity</Text>

            <FlatList
                data={last7Days}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={styles.list}
                ListEmptyComponent={
                    <Text style={styles.emptyText}>No sessions yet. Start breathing!</Text>
                }
            />
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
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    summaryCard: {
        backgroundColor: '#4a90e2',
        padding: 20,
        borderRadius: 15,
        marginBottom: 30,
        alignItems: 'center',
    },
    summaryTitle: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: 16,
        marginBottom: 5,
    },
    summaryCount: {
        color: 'white',
        fontSize: 36,
        fontWeight: 'bold',
    },
    historyHeader: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 15,
        color: '#333',
    },
    list: {
        paddingBottom: 20,
    },
    historyItem: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    dateText: {
        fontSize: 16,
        color: '#333',
    },
    timeText: {
        fontSize: 14,
        color: '#666',
    },
    emptyText: {
        textAlign: 'center',
        color: '#999',
        marginTop: 20,
        fontSize: 16,
    },
});

export default StatsScreen;
