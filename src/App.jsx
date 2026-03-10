import { useState, useEffect, useCallback } from 'react';
import TimerDisplay from './components/TimerDisplay';
import Controls from './components/Controls';
import ModeSelector from './components/ModeSelector';

function App() {
    const [mode, setMode] = useState('pomodoro');
    const [timeLeft, setTimeLeft] = useState(25 * 60);
    const [totalTime, setTotalTime] = useState(25 * 60);
    const [isActive, setIsActive] = useState(false);

    // Update theme color based on mode
    useEffect(() => {
        const root = document.documentElement;
        if (mode === 'pomodoro') {
            root.style.setProperty('--primary', '#FF6B6B');
        } else if (mode === 'shortBreak') {
            root.style.setProperty('--primary', '#4ECDC4');
        } else if (mode === 'longBreak') {
            root.style.setProperty('--primary', '#45B7D1');
        }
    }, [mode]);

    const handleModeChange = (newMode, duration) => {
        setMode(newMode);
        setTimeLeft(duration);
        setTotalTime(duration);
        setIsActive(false);
    };

    const toggleTimer = () => {
        setIsActive(!isActive);
    };

    const resetTimer = () => {
        setIsActive(false);
        setTimeLeft(totalTime);
    };

    // Play a simple beep sound when timer ends using Web Audio API
    const playBeep = useCallback(() => {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;

        try {
            const audioCtx = new AudioContext();
            const oscillator = audioCtx.createOscillator();
            const gainNode = audioCtx.createGain();

            oscillator.type = 'sine';
            oscillator.frequency.value = 800;

            gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
            gainNode.gain.linearRampToValueAtTime(0.5, audioCtx.currentTime + 0.1);
            gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.5);

            oscillator.connect(gainNode);
            gainNode.connect(audioCtx.destination);

            oscillator.start();
            oscillator.stop(audioCtx.currentTime + 0.5);
        } catch (e) {
            console.error("Audio play failed", e);
        }
    }, []);

    useEffect(() => {
        let interval = null;

        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft(time => time - 1);
            }, 1000);
        } else if (isActive && timeLeft === 0) {
            setIsActive(false);
            playBeep();
            // Optionally auto-switch to break or pomodoro, but keeping it simple
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isActive, timeLeft, playBeep]);

    return (
        <div className="app-container">
            <h1>Pomodoro</h1>
            <ModeSelector currentMode={mode} onModeChange={handleModeChange} />
            <TimerDisplay timeLeft={timeLeft} totalTime={totalTime} mode={mode} />
            <Controls isActive={isActive} onToggle={toggleTimer} onReset={resetTimer} />
        </div>
    );
}

export default App;
