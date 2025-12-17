// Vercel Serverless Function to handle Zalo webhooks

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

  // Handle GET request for webhook verification
  if (req.method === 'GET') {
    return res.status(200).json({ message: 'Zalo webhook endpoint active' });
  }

  // Handle POST request for webhook events
  if (req.method === 'POST') {
    try {
      const event = req.body;

      console.log('Zalo webhook event received:', event);

      // Handle different event types
      switch (event.event_name) {
        case 'follow':
          console.log('New follower:', event.follower);
          break;

        case 'unfollow':
          console.log('User unfollowed:', event.follower);
          break;

        case 'user_send_text':
          console.log('Message received:', event.message);
          // TODO: Handle driver responses (e.g., "Done" to mark order complete)
          break;

        default:
          console.log('Unknown event type:', event.event_name);
      }

      // Always return success to Zalo
      res.status(200).json({ success: true });

    } catch (error) {
      console.error('Error processing webhook:', error);
      res.status(200).json({ success: true }); // Still return success to avoid retry
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
