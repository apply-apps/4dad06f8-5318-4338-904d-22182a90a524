// Filename: index.js
// Combined code from all files

import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, StatusBar, View, Dimensions, Button } from 'react-native';

const CELL_SIZE = 20;
const NUM_CELLS_WIDTH = Dimensions.get('window').width / CELL_SIZE;
const NUM_CELLS_HEIGHT = Dimensions.get('window').height / CELL_SIZE;

const getRandomFoodPosition = () => {
    const x = Math.floor(Math.random() * NUM_CELLS_WIDTH);
    const y = Math.floor(Math.random() * NUM_CELLS_HEIGHT);
    return { x, y };
};

const SnakeGame = () => {
    const [snake, setSnake] = useState([{ x: 5, y: 5 }]);
    const [food, setFood] = useState(getRandomFoodPosition);
    const [direction, setDirection] = useState({ x: 1, y: 0 });
    const [isGameOver, setIsGameOver] = useState(false);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowUp') setDirection({ x: 0, y: -1 });
            if (e.key === 'ArrowDown') setDirection({ x: 0, y: 1 });
            if (e.key === 'ArrowLeft') setDirection({ x: -1, y: 0 });
            if (e.key === 'ArrowRight') setDirection({ x: 1, y: 0 });
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

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
                    setFood(getRandomFoodPosition);
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
        setFood(getRandomFoodPosition);
        setDirection({ x: 1, y: 0 });
        setIsGameOver(false);
    };

    return (
        <View>
            {isGameOver && <Button title="Game Over! Restart?" onPress={restartGame} />}
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
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
    },
    grid: {
        position: 'relative',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
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
});

const App = () => {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar hidden />
            <SnakeGame />
        </SafeAreaView>
    );
};

export default App;