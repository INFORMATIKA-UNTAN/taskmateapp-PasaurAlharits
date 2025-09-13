import { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, FlatList, View, Button, TouchableOpacity } from 'react-native';
import TaskItem from '../src/components/TaskItem';
import { dummyTasks } from '../src/data/dummyTasks';
export default function HomeScreen() {
    const [tasks, setTasks] = useState(dummyTasks);
    const [filter, setFilter] = useState("All");
    const [showFilter, setshowFilter] = useState(false);

    const handleToggle = (task) => {
        setTasks(prev =>
            prev.map(t => t.id === task.id
                ? { ...t, status: t.status === 'done' ? 'pending' : 'done' }
                : t
            )
        );
    };

    const filteredTasks = tasks.filter((task) => {
        if (filter === "All") return true;
        return task.status === filter;
    });

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>TaskMate – Daftar Tugas</Text>
            <Button
                title={showFilter ? "Hide Filter" : "Show Filter"}
                onPress={() => setshowFilter((show) => !show)}
            />

            {/* filter button */}
            {showFilter && (
                <View style={styles.buttonRow}>
                    <TouchableOpacity
                        style={[styles.filterButton, filter === "All" && styles.activeButton]}
                        onPress={() => setFilter("All")}>
                        <Text style={[styles.filterText, filter === "All" && styles.activeText]}>
                            All
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.filterButton, filter === "pending" && styles.activeButton]}
                        onPress={() => setFilter("pending")}>
                        <Text
                            style={[
                                styles.filterText,
                                filter === "pending" && styles.activeText,
                            ]}>
                            Todo
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.filterButton, filter === "done" && styles.activeButton]}
                        onPress={() => setFilter("done")}>
                        <Text style={[styles.filterText, filter === "done" && styles.activeText]}>
                            Done
                        </Text>
                    </TouchableOpacity>
                </View>
            )}

            <FlatList
                data={filteredTasks}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ padding: 16 }}
                renderItem={({ item }) => <TaskItem task={item}
                    onToggle={handleToggle} />}
            />

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f8fafc' },
    header: { fontSize: 20, fontWeight: '700', padding: 16 },
    buttonRow: {
        flexDirection: "column",
        justifyContent: "space-around",
        marginVertical: 10,
    },
    filterButton: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
        backgroundColor: "#e0e0e0", 
    },
    activeButton: {
        backgroundColor: "#007AFF",
    },
    filterText: {
        fontSize: 14,
        color: "#333",
    },
    activeText: {
        color: "#fff",
        fontWeight: "bold",
    },
});
