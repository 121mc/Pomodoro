import React, { useEffect } from 'react';

export default function TimerDisplay({ timeLeft, totalTime, mode }) {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    // Calculate SVG stroke-dashoffset for the progress circle
    const radius = 130;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (timeLeft / totalTime) * circumference;

    useEffect(() => {
        document.title = `${formattedTime} - Pomodoro`;
    }, [formattedTime]);

    // Set the correct accent color based on mode
    const getStrokeColor = () => {
        switch (mode) {
            case 'pomodoro': return 'var(--accent-pomodoro)';
            case 'shortBreak': return 'var(--accent-short)';
            case 'longBreak': return 'var(--accent-long)';
            default: return 'var(--primary)';
        }
    };

    return (
        <div className="timer-container">
            <svg className="timer-svg" viewBox="0 0 280 280">
                <circle
                    className="timer-track"
                    cx="140" cy="140" r={radius}
                />
                <circle
                    className="timer-progress"
                    cx="140" cy="140" r={radius}
                    style={{
                        strokeDasharray: circumference,
                        strokeDashoffset: strokeDashoffset,
                        stroke: getStrokeColor()
                    }}
                />
            </svg>
            <div className="timer-text">
                <div className="timer-time">{formattedTime}</div>
            </div>
        </div>
    );
}
