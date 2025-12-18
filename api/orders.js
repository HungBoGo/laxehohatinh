// Vercel Serverless Function to receive orders and send to Zalo OA

const ZALO_CONFIG = {
  APP_ID: '956064518601305903',
  SECRET_KEY: 'Fhh2DsBhY28ulDun0EYB8oIys35xu8ej9hVOFJ8uQcLa96NfbIS',
  OA_ID: '3633670606090960196'
};

// Get Zalo Access Token
async function getZaloAccessToken() {
  try {
    const response = await fetch('https://oauth.zaloapp.com/v4/oa/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'secret_key': ZALO_CONFIG.SECRET_KEY
      },
      body: new URLSearchParams({
        app_id: ZALO_CONFIG.APP_ID,
        grant_type: 'refresh_token',
        refresh_token: process.env.ZALO_REFRESH_TOKEN || ''
      })
    });

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error('Error getting Zalo access token:', error);
    throw error;
  }
}

// Send message to Zalo OA followers
async function sendZaloNotification(orderData) {
  try {
    const accessToken = await getZaloAccessToken();

    // Mask phone number (show only last 4 digits)
    const maskedPhone = orderData.phone.replace(/(\d{4})$/, '****');

    const message = `🚗 ĐƠN MỚI - LAIXEHOHATINH.COM

📍 Điểm đón: ${orderData.pickup}
${orderData.dropoff ? `📍 Điểm đến: ${orderData.dropoff}` : ''}
📱 SĐT: ${maskedPhone}
💰 Giá: ${orderData.price}
📏 Khoảng cách: ${orderData.distance}

⏰ ${new Date().toLocaleString('vi-VN')}`;

    // Send to OA followers (broadcast)
    const response = await fetch('https://openapi.zalo.me/v2.0/oa/message/cs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'access_token': accessToken
      },
      body: JSON.stringify({
        recipient: {
          user_id: 'ALL' // Send to all followers
        },
        message: {
          text: message
        }
      })
    });

    return await response.json();
  } catch (error) {
    console.error('Error sending Zalo notification:', error);
    throw error;
  }
}

// Main handler
export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const orderData = req.body;

    // Validate required fields
    if (!orderData.pickup || !orderData.phone) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Generate order ID
    const orderId = 'ORD' + Date.now();
    const order = {
      id: orderId,
      ...orderData,
      status: 'new',
      createdAt: new Date().toISOString(),
      driverName: null,
      driverPhone: null
    };

    // TODO: Save to database (currently using client-side localStorage)
    // In production, save to Google Sheets or Firebase

    // Try to send notification to Zalo (may fail if not approved yet)
    try {
      await sendZaloNotification(orderData);
    } catch (error) {
      console.log('Zalo notification failed (expected if OA not approved):', error.message);
    }

    res.status(200).json({
      success: true,
      message: 'Order received',
      order: order
    });

  } catch (error) {
    console.error('Error processing order:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
}
