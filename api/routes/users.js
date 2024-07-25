import express from "express"
import { getUserInfo } from '../controllers/user.js';
import { getSchedule } from '../controllers/user.js';
import { getAvailableCourses} from '../controllers/user.js';
import { bookCourse} from '../controllers/user.js';
import { getStudentsList, addStudent, updateStudent, updateUserProfile } from '../controllers/user.js';
const router = express.Router()

router.get("/userinfo", getUserInfo);
router.get("/schedule", getSchedule);
router.get("/available-courses", getAvailableCourses);
router.post("/bookCourse", bookCourse);

router.get("/students", getStudentsList);
router.post('/students', addStudent);
router.put('/students/:id', updateStudent); //更新特定用戶資料

router.put('/profile', updateUserProfile);



export default router