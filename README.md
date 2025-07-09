# Courage Computer 🖥️

A retro-futuristic AI chat interface inspired by the computer from Courage the Cowardly Dog. Experience the nostalgic, glowing green terminal-style interface while chatting with AI models that respond in character as the Courage Computer.

## Features ✨

- **Authentic Courage Computer UI**: Full-screen green terminal with glowing text and retro aesthetics
- **Multi-AI Support**: Choose between OpenAI (GPT-4o, GPT-4.1) and Google Gemini (2.5 Pro, 2.5 Flash)
- **Character Personality**: AI responds in character with British accent, sarcasm, and calls users "twit"
- **Streaming Responses**: Real-time text generation for both OpenAI and Gemini
- **Conversation Transcript**: Save, view, and export your chat history
- **Local Storage**: API keys stored securely in your browser
- **Responsive Design**: Works on desktop and mobile devices
- **Markdown Support**: Bold, italic, and lists in AI responses

## Quick Start 🚀

### 1. Get API Keys

**OpenAI:**
1. Visit [OpenAI API Keys](https://platform.openai.com/api-keys)
2. Create an account or sign in
3. Generate a new API key (starts with `sk-`)

**Google Gemini:**
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Create a new API key

### 2. Run the Application

**Option 1: Direct (Simple)**
- Double-click `index.html` to open in your browser

**Option 2: Local Server (Recommended)**
```bash
# Python 3
python -m http.server 8000

# Node.js
npx http-server

# PHP
php -S localhost:8000
```
Then visit `http://localhost:8000`

### 3. Setup
1. Click the settings gear icon (top-right)
2. Select your AI provider (OpenAI or Gemini)
3. Enter your API key
4. Choose your preferred model
5. Click "Save Settings"
6. Start chatting with the Courage Computer!

## Available Models 🤖

### OpenAI Models
- **GPT-4o**: Most capable, latest generation
- **GPT-4o Mini**: Fast and cost-effective
- **GPT-4.1**: High performance
- **GPT-4.1 Mini**: Fast and efficient

### Gemini Models
- **Gemini 2.5 Pro**: Most capable, complex reasoning
- **Gemini 2.5 Flash**: Fast and capable, best balance
- **Gemini 2.5 Flash-Lite**: Lightweight, cost-effective
- **Gemini 1.5 Pro**: Previous gen, high performance
- **Gemini 1.5 Flash**: Previous gen, fast
- **Gemini 1.5 Flash-8B**: Smallest, fastest

## Usage Guide 📖

### Chat Interface
- **Type your message** in the bottom text area
- **Press Enter** to send (Shift+Enter for new line)
- **Watch the response** appear in real-time streaming
- **Enjoy the character** - the AI responds as the Courage Computer!

### Settings & Controls
- **Settings** (⚙️): Configure API keys and models
- **Transcript** (📄): View conversation history
- **Download TXT**: Save conversation as text file
- **Download JSON**: Export for AI fine-tuning
- **Copy**: Copy transcript to clipboard

### Character Features
The Courage Computer will:
- Speak with a British accent
- Call you a "twit" and show disdain for humans
- Be sarcastic and cynical
- Help solve problems despite the attitude
- Reference being "armed with a full hard drive of knowledge"

## Technical Details ⚙️

### Technologies
- **HTML5/CSS3**: Structure and retro styling
- **JavaScript ES6+**: Application logic
- **Fetch API**: Direct API calls to AI providers
- **LocalStorage**: Settings and transcript persistence
- **Web Speech API**: Voice input (planned)

### File Structure
```
courage-computer/
├── index.html          # Main application
├── styles.css          # Retro-futuristic styling
├── script.js           # Application logic
└── README.md           # This file
```

### API Integration
- **OpenAI**: Streaming chat completions
- **Gemini**: Simulated streaming responses
- **No Backend**: Runs entirely in your browser
- **Secure**: API keys stored locally only

## Security & Privacy 🔒

- **Local Storage Only**: API keys stored in your browser
- **No Server**: Application runs entirely client-side
- **Direct API Calls**: Messages go directly to AI providers
- **No Data Collection**: We don't store your conversations
- **Privacy First**: Your data stays on your device

## Browser Support 🌐

- **Chrome/Edge**: Full support
- **Firefox**: Full support
- **Safari**: Full support
- **Mobile**: Responsive design works on all devices

## Troubleshooting 🔧

### API Issues
- Verify your API key is correct
- Check your provider's status page
- Ensure you have sufficient credits
- Try switching between providers

### Display Problems
- Clear browser cache
- Try a different browser
- Ensure JavaScript is enabled
- Use a modern browser

### No Response
- Check API key in settings
- Verify internet connection
- Try refreshing the page

## Customization 🎨

### Colors
Edit `styles.css` to change the color scheme:
```css
/* Main green theme */
--primary-green: #baffb0;
--background-green: #3dbb6a;
--text-green: #eaffd0;
```

### Models
Add new AI providers in `script.js`:
1. Add provider to the model selection
2. Implement API call function
3. Update the `sendMessage` method

## Contributing 🤝

Contributions welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License 📄

MIT License - feel free to use and modify!

## Credits 🙏

- **Inspiration**: Courage Computer from "Courage the Cowardly Dog"
- **Icons**: Font Awesome
- **Fonts**: Share Tech Mono (Google Fonts)
- **Built with**: Modern web technologies

---

**"Ah, another human seeking the wisdom of superior artificial intelligence, eh? Well, you've come to the right place, you twit!"** 🐕💻 