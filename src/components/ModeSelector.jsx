import React from 'react';

// 定义三种番茄工作法模式及其对应的时间时长（秒）
const modes = [
    { id: 'pomodoro', label: '番茄钟', duration: 25 * 60 },
    { id: 'shortBreak', label: '短休息', duration: 5 * 60 },
    { id: 'longBreak', label: '长休息', duration: 15 * 60 },
];

export default function ModeSelector({ currentMode, onModeChange }) {
    return (
        <div className="mode-selector">
            {modes.map((mode) => (
                <button
                    key={mode.id}
                    className={`mode-btn ${currentMode === mode.id ? 'active' : ''}`}
                    onClick={() => onModeChange(mode.id, mode.duration)}
                >
                    {mode.label}
                </button>
            ))}
        </div>
    );
}
