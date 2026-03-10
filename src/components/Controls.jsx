import React from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

export default function Controls({ isActive, onToggle, onReset }) {
    return (
        <div className="controls">
            {/* 重置按钮 */}
            <button
                className="control-btn"
                onClick={onReset}
                title="重置倒计时"
            >
                <RotateCcw size={24} />
            </button>

            {/* 播放/暂停 核心控制按钮 */}
            <button
                className="control-btn main"
                onClick={onToggle}
                title={isActive ? '暂停倒计时' : '开始倒计时'}
            >
                {isActive ? <Pause size={32} /> : <Play size={32} style={{ marginLeft: '4px' }} />}
            </button>

            {/* 空白占位符：用于平衡页面布局，使播放按钮居中对齐 */}
            <div style={{ width: '64px' }}></div>
        </div>
    );
}
