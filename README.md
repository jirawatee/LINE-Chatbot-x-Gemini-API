# LINE Chatbot x Gemini API
A repo of building Gen AI Chatbot with Gemini by using LINE Messaging API and Cloud Functions for Firebase 2nd Gen

## Prerequisites
* [Node.js v18](https://nodejs.org) or higher
* Create a channel and copy the channel access token from [LINE Developers console](https://developers.line.biz/en/docs/messaging-api/getting-started/)
* Create a Firebase project using the [Firebase Console](https://console.firebase.google.com) and select <b>Blaze plan</b>
* Create an API key from [Google AI Studio](https://aistudio.google.com/app/apikey)

## Cloud Functions for Firebase
* Copy credentials and set them in Environment variable (.env)
```
CHANNEL_ACCESS_TOKEN=CHANNEL-ACCESS-TOKEN-OF-LINE-MESSAGING-API
API_KEY=API-KEY-FROM-GOOGLE-AI-STUDIO
```

## Documentation
* [LINE Messaging API](https://developers.line.biz/en/docs/messaging-api/overview)
* [Cloud Functions for Firebase](https://firebase.google.com/docs/functions/get-started)
* [Gemini API](https://ai.google.dev/docs/gemini_api_overview)
