import React from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

export default function Controls({ isActive, onToggle, onReset }) {
    return (
        <div className="controls">
            <button
                className="control-btn"
                onClick={onReset}
                title="Reset Timer"
            >
                <RotateCcw size={24} />
            </button>

            <button
                className="control-btn main"
                onClick={onToggle}
                title={isActive ? 'Pause Timer' : 'Start Timer'}
            >
                {isActive ? <Pause size={32} /> : <Play size={32} style={{ marginLeft: '4px' }} />}
            </button>

            {/* Empty space to balance the reset button, or we can add a skip button later */}
            <div style={{ width: '64px' }}></div>
        </div>
    );
}
