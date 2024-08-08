import React from 'react';
import medal from '../images/medal.png';
import medalEmpty from '../images/medal_empty.png';
import littleFunTime from '../images/little_fun_time.png';
import littleFloater from '../images/little_floater.png';
import littleExplorer from '../images/little_explorer.png';
import littleSwimmer from '../images/little_swimmer.png';

// 定義 progressData 項目的類型
interface ProgressDataItem {
    milestone_name: string;
    completion_date?: string;
}

interface MilestonesProps {
    progressData?: ProgressDataItem[];
    studentName: string;
}

const Milestones: React.FC<MilestonesProps> = ({ progressData = [], studentName }) => {
    // 確保 progressData 是一個有效的數組
    if (!Array.isArray(progressData) || progressData.length === 0) {
        return <div>No progress data available</div>;
    }

    // 將進度數據按里程碑分組
    const groupedProgress = progressData.reduce((acc: { [key: string]: ProgressDataItem[] }, item) => {
        if (!acc[item.milestone_name]) {
            acc[item.milestone_name] = [];
        }
        acc[item.milestone_name].push(item);
        return acc;
    }, {});

    const getMedalCount = (milestone: string): number => {
        return groupedProgress[milestone]?.filter(item => item.completion_date).length || 0;
    };

    // 用於獲取里程碑圖片
    const milestoneImages: { [key: string]: string } = {
        'little fun time': littleFunTime,
        'little floater': littleFloater,
        'little explorer': littleExplorer,
        'little swimmer': littleSwimmer,
    };

    return (
        <div className="milestones-container">
            <div className="header">
                <h2>{studentName}'s Milestone</h2>
                <h3>H20 Baby Swim</h3>
            </div>
            <div className="milestone-row">
                {Object.keys(groupedProgress).map(milestone => (
                    <div key={milestone} className="milestone-col">
                        <img src={milestoneImages[milestone.toLowerCase()]} alt={milestone} />
                        <div className="milestone-name">{milestone}</div>
                    </div>
                ))}
            </div>
            <div className="medals-row">
                {Object.keys(groupedProgress).map(milestone => (
                    <div key={milestone} className="milestone-col">
                        <div className="medals-grid">
                            {[...Array(4)].map((_, index) => (
                                <img 
                                    key={index}
                                    src={index < getMedalCount(milestone) ? medal : medalEmpty} 
                                    alt={`Medal ${index + 1}`} 
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <div className="approval-row">
                {Object.keys(groupedProgress).map(milestone => (
                    <div key={milestone} className="milestone-col">
                        {getMedalCount(milestone) === 4 && <div className="approved">Approved!</div>}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Milestones;
