

const ProgressTable = ({ progressData }) => {
    // 將進度數據按里程碑分組
    const groupedProgress = progressData.reduce((acc, item) => {
        if (!acc[item.milestone_name]) {
            acc[item.milestone_name] = [];
        }
        acc[item.milestone_name].push(item);
        return acc;
    }, {});

    // 格式化日期
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    return (
        <div>
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
                            {groupedProgress[milestone].map((item, index) => (
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
