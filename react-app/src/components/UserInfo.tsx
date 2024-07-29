import { useEffect, useState } from 'react';
import axios from 'axios';
import { API } from '../../config.tsx';

const UserInfo = () => {
  // 定義狀態變數，用於存儲使用者資訊
  const [user, setUser] = useState({ firstname: '', lastname: '' });

  useEffect(() => {
    // 定義異步函數來獲取使用者資訊
    const fetchUserInfo = async () => {
      try {
        // 發送 GET 請求到後端 API 來獲取使用者資訊
        const res = await axios.get(API.USERS.GET_USERINFO, { withCredentials: true });
        // 將獲取到的使用者資訊設置到狀態變數中
        setUser(res.data); //將user 的值更新為 [firstname: 'Linda', lastname: 'Lin']
      } catch (err) {
        // 如果請求失敗，打印錯誤訊息
        console.log(err);
      }
    };

    // 調用函數來獲取使用者資訊
    fetchUserInfo();
  }, []);

  return (
    <div className='user-info'>
      <h2>Member info</h2>
      <p>Member: {user.firstname} {user.lastname} ~</p>
    </div>
  );
};

export default UserInfo;