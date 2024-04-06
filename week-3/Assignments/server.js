const express = require('express');
const cors = require('cors');
const axios = require('axios');
const https = require('https');

const app = express();

// 使用 CORS 中間件，允許所有來源的請求
app.use(cors());

// 設定一個路由處理 GET 請求
app.get('/api/proxy', async (req, res) => {
  try {
    // 在這裡指定你想要代理的目標網址
    const targetUrl = 'https://rate.bot.com.tw/xrt?Lang=zh-TW';
    
    // 使用 Axios 進行 HTTPS 請求，並設置合適的代理
    const response = await axios.get(targetUrl, {
      httpsAgent: new https.Agent({ rejectUnauthorized: false })
    });
    
    // 將目標伺服器的回應返回給請求方
    res.json(response.data);
  } catch (error) {
    // 如果出現錯誤，返回錯誤訊息
    console.error('Proxy request error:', error);
    res.status(500).json({ error: 'Proxy request failed' });
  }
});

// 監聽在指定的端口上
const port = 3000;
app.listen(port, () => {
  console.log(`Proxy server is running on port ${port}`);
});
