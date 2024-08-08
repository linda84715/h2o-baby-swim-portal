import React from 'react';

// 定義 progressData 項目的類型
interface ProgressDataItem {
    milestone_name: string;
    item_name: string;
    item_description: string;
    completion_date?: string;
    coach_signature?: string;
    notes?: string;
}

// 定義組件的 props 類型
interface ProgressTableProps {
    progressData: ProgressDataItem[];
    studentName: string;
}

const ProgressTable: React.FC<ProgressTableProps> = ({ progressData, studentName }) => {
    // 將進度數據按里程碑分組
    const groupedProgress = progressData.reduce((acc: { [key: string]: ProgressDataItem[] }, item: ProgressDataItem) => {
        if (!acc[item.milestone_name]) {
            acc[item.milestone_name] = [];
        }
        acc[item.milestone_name].push(item);
        return acc;
    }, {});

    // 格式化日期
    const formatDate = (dateString: string | undefined): string => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    return (
        <div>
            <h1>{studentName}'s Progress Table</h1>
            {Object.keys(groupedProgress).map(milestone => (
                <div key={milestone}>
                    <h2>{milestone}</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th>Description</th>
                                <th>Completion Date</th>
                                <th>Coach's Signature</th>
                                <th>Notes</th>
                            </tr>
                        </thead>
                        <tbody>
                            {groupedProgress[milestone].map((item: ProgressDataItem, index: number) => (
                                <tr key={index}>
                                    <td>{item.item_name}</td>
                                    <td>{item.item_description}</td>
                                    <td>{formatDate(item.completion_date)}</td>
                                    <td>{item.coach_signature || ''}</td>
                                    <td>{item.notes || ''}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ))}
        </div>
    );
};

export default ProgressTable;