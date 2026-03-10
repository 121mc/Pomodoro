import { useState, useEffect, useCallback } from 'react';
import TimerDisplay from './components/TimerDisplay';
import Controls from './components/Controls';
import ModeSelector from './components/ModeSelector';

function App() {
    const [mode, setMode] = useState('pomodoro'); // 当前模式：番茄钟、短休息、长休息
    const [timeLeft, setTimeLeft] = useState(25 * 60); // 剩余的秒数
    const [totalTime, setTotalTime] = useState(25 * 60); // 当前模式的总秒数（用于计算进度条）
    const [isActive, setIsActive] = useState(false); // 计时器是否正在运行

    // 根据当前的模式更新全局的 CSS 主题颜色主题
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

    // 切换模式处理函数
    const handleModeChange = (newMode, duration) => {
        setMode(newMode);
        setTimeLeft(duration);
        setTotalTime(duration);
        setIsActive(false);
    };

    // 暂停/继续计时器
    const toggleTimer = () => {
        setIsActive(!isActive);
    };

    // 重置当前计时器
    const resetTimer = () => {
        setIsActive(false);
        setTimeLeft(totalTime);
    };

    // 使用 Web Audio API 播放时间到的嘟嘟声 (无需外部音频文件)
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
            console.error("Audio play failed", e); // 音频播放失败处理 (部分浏览器可能需要用户交互授权)
        }
    }, []);

    // 核心倒计时逻辑
    useEffect(() => {
        let interval = null;

        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft(time => time - 1);
            }, 1000);
        } else if (isActive && timeLeft === 0) {
            // 时间到：停止计时并播放声音
            setIsActive(false);
            playBeep();
        }

        // 清除定时器，避免内存泄漏或倒计时倍速
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
