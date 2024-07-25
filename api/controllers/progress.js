import { db } from "../db.js";

export const getStudentProgress = (req, res) => {
    const studentId = req.params.studentId;

    const query = `
        SELECT 
            m.milestone_name,
            i.item_name,
            i.description AS item_description,
            p.completion_date,
            p.coach_signature,
            p.notes
        FROM 
            milestones m
        JOIN 
            items i ON m.milestone_id = i.milestone_id
        LEFT JOIN 
            progress p ON i.item_id = p.item_id AND p.student_id = ?
        ORDER BY 
            m.milestone_id, i.item_id`;

    db.query(query, [studentId], (err, results) => {
        if (err) {
            return res.status(500).json(err);
        }
        return res.json(results);
    });
};
