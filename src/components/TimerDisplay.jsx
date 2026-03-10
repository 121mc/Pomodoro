import React, { useEffect } from 'react';

export default function TimerDisplay({ timeLeft, totalTime, mode }) {
    // 将秒数转换为供人类阅读的 分:秒 格式，例如 25:00
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    // 计算 SVG 圆环进度条的偏移量 (stroke-dashoffset)
    // 根据当前剩余时间和总时间的比例进行计算
    const radius = 130;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (timeLeft / totalTime) * circumference;

    // 当计时器更新时，同步更新浏览器的标签网页标题
    useEffect(() => {
        document.title = `${formattedTime} - 番茄钟`;
    }, [formattedTime]);

    // 根据当前所处的模式获取进度条的颜色
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
