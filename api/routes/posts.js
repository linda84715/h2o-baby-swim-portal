import express from "express"
import { addPost } from "../controllers/post.js" // 確保導入了 addPost 控制器

const router = express.Router()

router.get("/test", addPost)  // 使用 addPost 控制器來處理 /add 路由的 POST 請求

//TODO

export default router
