/**
 * addPost 控制器函數
 * 處理發送到特定路由的 HTTP 請求並返回 JSON 格式的響應。
 */
export const addPost = (req, res) => {
    // 使用 res.json() 方法發送 JSON 格式的響應。
    res.json("from controller");
  };

