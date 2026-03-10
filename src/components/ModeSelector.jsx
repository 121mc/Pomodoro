import React from 'react';

const modes = [
    { id: 'pomodoro', label: 'Pomodoro', duration: 25 * 60 },
    { id: 'shortBreak', label: 'Short Break', duration: 5 * 60 },
    { id: 'longBreak', label: 'Long Break', duration: 15 * 60 },
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
