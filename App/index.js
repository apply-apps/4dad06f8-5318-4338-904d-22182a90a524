// Filename: index.js
// Combined code from all files

import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, StatusBar, View, Dimensions, Button, TouchableOpacity } from 'react-native';

const CELL_SIZE = 20;
const NUM_CELLS_WIDTH = Math.floor(Dimensions.get('window').width / CELL_SIZE);
const NUM_CELLS_HEIGHT = Math.floor(Dimensions.get('window').height / CELL_SIZE);

const getRandomFoodPosition = () => {
    const x = Math.floor(Math.random() * NUM_CELLS_WIDTH);
    const y = Math.floor(Math.random() * NUM_CELLS_HEIGHT);
    return { x, y };
};

const SnakeGame = () => {
    const [snake, setSnake] = useState([{ x: 5, y: 5 }]);
    const [food, setFood] = useState(getRandomFoodPosition());
    const [direction, setDirection] = useState({ x: 1, y: 0 });
    const [isGameOver, setIsGameOver] = useState(false);

    useEffect(() => {
        if (isGameOver) return;

        const interval = setInterval(() => {
            setSnake((prevSnake) => {
                const newHead = {
                    x: prevSnake[0].x + direction.x,
                    y: prevSnake[0].y + direction.y,
                };

                // Check if snake collides with walls
                if (
                    newHead.x < 0 ||
                    newHead.x >= NUM_CELLS_WIDTH ||
                    newHead.y < 0 ||
                    newHead.y >= NUM_CELLS_HEIGHT
                ) {
                    setIsGameOver(true);
                    return prevSnake;
                }

                // Check if snake collides with itself
                if (prevSnake.some(cell => cell.x === newHead.x && cell.y === newHead.y)) {
                    setIsGameOver(true);
                    return prevSnake;
                }

                let newSnake = [newHead, ...prevSnake];

                // Check if the snake eats the food
                if (newHead.x === food.x && newHead.y === food.y) {
                    setFood(getRandomFoodPosition());
                } else {
                    newSnake.pop();
                }

                return newSnake;
            });
        }, 200);

        return () => clearInterval(interval);
    }, [direction, food, isGameOver]);

    const restartGame = () => {
        setSnake([{ x: 5, y: 5 }]);
        setFood(getRandomFoodPosition());
        setDirection({ x: 1, y: 0 });
        setIsGameOver(false);
    };

    const handleSwipe = (dx, dy) => {
        setDirection({ x: dx, y: dy });
    };

    return (
        <View style={styles.gameContainer}>
            {isGameOver ? (
                <Button title="Game Over! Restart?" onPress={restartGame} />
            ) : (
                <View style={styles.grid}>
                    {snake.map((cell, index) => (
                        <View key={index} style={[styles.cell, {
                            left: cell.x * CELL_SIZE,
                            top: cell.y * CELL_SIZE,
                        }]} />
                    ))}
                    <View style={[styles.food, {
                        left: food.x * CELL_SIZE,
                        top: food.y * CELL_SIZE,
                    }]} />
                </View>
            )}
            <View style={styles.controls}>
                <TouchableOpacity style={styles.controlButton} onPress={() => handleSwipe(0, -1)}>
                    <View style={styles.controlArrow} />
                </TouchableOpacity>
                <View style={styles.controlRow}>
                    <TouchableOpacity style={styles.controlButton} onPress={() => handleSwipe(-1, 0)}>
                        <View style={[styles.controlArrow, styles.leftArrow]} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.controlButton} onPress={() => handleSwipe(1, 0)}>
                        <View style={[styles.controlArrow, styles.rightArrow]} />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.controlButton} onPress={() => handleSwipe(0, 1)}>
                    <View style={[styles.controlArrow, styles.downArrow]} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default function App() {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar hidden />
            <SnakeGame />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
    },
    gameContainer: {
        flex: 1,
    },
    grid: {
        position: 'relative',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height - 120,
        backgroundColor: '#000',
    },
    cell: {
        position: 'absolute',
        width: CELL_SIZE,
        height: CELL_SIZE,
        backgroundColor: 'green',
    },
    food: {
        position: 'absolute',
        width: CELL_SIZE,
        height: CELL_SIZE,
        backgroundColor: 'red',
    },
    controls: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    controlRow: {
        flexDirection: 'row',
    },
    controlButton: {
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        backgroundColor: '#555',
        borderRadius: 50,
    },
    controlArrow: {
        width: 20,
        height: 20,
        backgroundColor: '#fff',
    },
    leftArrow: {
        transform: [{ rotate: '90deg' }],
    },
    rightArrow: {
        transform: [{ rotate: '-90deg' }],
    },
    downArrow: {
        transform: [{ rotate: '180deg' }],
    },
});