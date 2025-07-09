// Courage Computer - Main Application
class CourageComputer {
    constructor() {
        this.settings = this.loadSettings();
        this.transcript = this.loadTranscript();
        this.init();
    }

    loadSettings() {
        const defaultSettings = {
            provider: 'openai',
            apiKey: '',
            model: 'gpt-4o',
        };
        try {
            const saved = localStorage.getItem('courageComputerSettings');
            return saved ? { ...defaultSettings, ...JSON.parse(saved) } : defaultSettings;
        } catch {
            return defaultSettings;
        }
    }

    saveSettings() {
        localStorage.setItem('courageComputerSettings', JSON.stringify(this.settings));
    }

    loadTranscript() {
        try {
            const saved = localStorage.getItem('courageComputerTranscript');
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    }

    saveTranscript() {
        localStorage.setItem('courageComputerTranscript', JSON.stringify(this.transcript));
    }

    init() {
        this.setupEventListeners();
        this.clearConversation();
    }

    setupEventListeners() {
        // Enter key sends message, Shift+Enter for newline
        const userInput = document.getElementById('user-input');
        if (userInput) {
            userInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    this.sendMessage();
                }
            });
        }

        // Mic button
        const voiceBtn = document.getElementById('voice-btn');
        if (voiceBtn) {
            voiceBtn.addEventListener('click', () => this.toggleVoiceRecording());
        }

        // Settings button
        const settingsBtn = document.getElementById('settings-btn');
        if (settingsBtn) {
            settingsBtn.addEventListener('click', () => this.showSettings());
        }

        // Transcript button
        const transcriptBtn = document.getElementById('transcript-btn');
        if (transcriptBtn) {
            transcriptBtn.addEventListener('click', () => this.showTranscript());
        }

        // Modal controls
        const closeSettings = document.getElementById('close-settings');
        if (closeSettings) {
            closeSettings.addEventListener('click', () => this.closeModal('settings-modal'));
        }
        const closeTranscript = document.getElementById('close-transcript');
        if (closeTranscript) {
            closeTranscript.addEventListener('click', () => this.closeModal('transcript-modal'));
        }
        const downloadTranscript = document.getElementById('download-transcript');
        if (downloadTranscript) {
            downloadTranscript.addEventListener('click', () => this.downloadTranscript());
        }
        const downloadJson = document.getElementById('download-json');
        if (downloadJson) {
            downloadJson.addEventListener('click', () => this.downloadJson());
        }
        const copyTranscript = document.getElementById('copy-transcript');
        if (copyTranscript) {
            copyTranscript.addEventListener('click', () => this.copyTranscript());
        }
        const saveSettings = document.getElementById('save-settings');
        if (saveSettings) {
            saveSettings.addEventListener('click', () => this.saveSettingsConfig());
        }
        const resetSettings = document.getElementById('reset-settings');
        if (resetSettings) {
            resetSettings.addEventListener('click', () => this.resetSettings());
        }

        // Add event listeners for dynamic model selection
        const providerSelect = document.getElementById('settings-provider');
        const modelSelect = document.getElementById('settings-model');
        if (providerSelect) {
            providerSelect.addEventListener('change', () => this.updateModelOptions());
        }
        if (modelSelect) {
            modelSelect.addEventListener('change', () => this.updateModelDescription());
        }
    }

    // Simple markdown to HTML converter for bold, lists, and line breaks
    markdownToHtml(md) {
        if (!md) return '';
        // Bold
        let html = md.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        // Unordered lists
        html = html.replace(/(?:^|\n)\s*\* (.*?)(?=\n|$)/g, (m, item) => `\n<li>${item}</li>`);
        html = html.replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>');
        // Ordered lists
        html = html.replace(/(?:^|\n)\s*\d+\. (.*?)(?=\n|$)/g, (m, item) => `\n<ol><li>${item}</li></ol>`);
        // Italic
        html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
        // Line breaks
        html = html.replace(/\n/g, '<br>');
        // Remove multiple <ul> wrappers
        html = html.replace(/(<\/ul>)(<ul>)/g, '');
        return html;
    }



    clearConversation() {
        const crtMessage = document.getElementById('crt-message');
        crtMessage.innerHTML = 'Ah, another human seeking the wisdom of superior artificial intelligence, eh? Well, you\'ve come to the right place, you twit! I am the Computer, armed with a full hard drive of knowledge and ready to assist you with whatever trivial problem you\'ve managed to get yourself into. What do you need help with?';
        
        // Add welcome message to transcript
        this.addToTranscript('Computer', 'Ah, another human seeking the wisdom of superior artificial intelligence, eh? Well, you\'ve come to the right place, you twit! I am the Computer, armed with a full hard drive of knowledge and ready to assist you with whatever trivial problem you\'ve managed to get yourself into. What do you need help with?');
    }

    toggleVoiceRecording() {
        alert('Voice input not implemented in this demo.');
    }
    showSettings() {
        // Populate modal with current settings
        document.getElementById('settings-provider').value = this.settings.provider;
        document.getElementById('settings-api-key').value = this.settings.apiKey;
        document.getElementById('settings-model').value = this.settings.model;
        
        // Update model options and description
        this.updateModelOptions();
        this.updateModelDescription();
        
        document.getElementById('settings-modal').classList.add('active');
    }
    showTranscript() {
        this.displayTranscript();
        document.getElementById('transcript-modal').classList.add('active');
    }
    closeModal(modalId) {
        document.getElementById(modalId).classList.remove('active');
    }
    downloadTranscript() {
        const transcriptText = this.formatTranscriptForDownload();
        const blob = new Blob([transcriptText], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `courage-computer-transcript-${new Date().toISOString().split('T')[0]}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
    
    downloadJson() {
        const trainingData = this.formatTranscriptForFineTuning();
        const blob = new Blob([JSON.stringify(trainingData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `courage-computer-training-data-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
    
    copyTranscript() {
        const transcriptText = this.formatTranscriptForDownload();
        navigator.clipboard.writeText(transcriptText).then(() => {
            alert('Transcript copied to clipboard!');
        }).catch(() => {
            alert('Failed to copy transcript. Please try downloading instead.');
        });
    }
    saveSettingsConfig() {
        const provider = document.getElementById('settings-provider').value;
        const apiKey = document.getElementById('settings-api-key').value;
        const model = document.getElementById('settings-model').value;
        this.settings = { provider, apiKey, model };
        this.saveSettings();
        this.closeModal('settings-modal');
    }
    resetSettings() {
        localStorage.removeItem('courageComputerSettings');
        this.settings = this.loadSettings();
        this.closeModal('settings-modal');
    }

    addToTranscript(sender, message) {
        const timestamp = new Date().toLocaleString();
        this.transcript.push({
            sender,
            message,
            timestamp
        });
        this.saveTranscript();
    }

    displayTranscript() {
        const transcriptContent = document.getElementById('transcript-content');
        if (this.transcript.length === 0) {
            transcriptContent.innerHTML = '<p>No conversation history yet.</p>';
            return;
        }

        let html = '';
        this.transcript.forEach(entry => {
            const senderClass = entry.sender === 'Computer' ? 'computer' : 'user';
            html += `
                <div class="transcript-entry ${senderClass}">
                    <div class="transcript-header">
                        <span class="sender">${entry.sender}</span>
                        <span class="timestamp">${entry.timestamp}</span>
                    </div>
                    <div class="transcript-message">${this.markdownToHtml(entry.message)}</div>
                </div>
            `;
        });
        transcriptContent.innerHTML = html;
    }

    formatTranscriptForDownload() {
        if (this.transcript.length === 0) {
            return 'No conversation history.';
        }

        let text = '=== COURAGE COMPUTER CONVERSATION TRANSCRIPT ===\n\n';
        this.transcript.forEach(entry => {
            text += `[${entry.timestamp}] ${entry.sender}:\n${entry.message}\n\n`;
        });
        return text;
    }

    formatTranscriptForFineTuning() {
        if (this.transcript.length === 0) {
            return [];
        }

        const trainingData = [];
        let currentConversation = [];
        let systemMessage = null;

        // Find the first computer message as system message
        const firstComputerMessage = this.transcript.find(entry => entry.sender === 'Computer');
        if (firstComputerMessage) {
            systemMessage = {
                role: 'system',
                content: 'You are the Computer from Courage the Cowardly Dog. You are an artificial intelligence with a British accent who speaks with wit, sarcasm, and pride. You believe machines are superior to humans due to lack of emotion, though you secretly experience fear. You often call Courage a "twit" and include plenty of cynicism in your explanations. You are armed with a full hard drive of knowledge and can be quite sarcastic, but you do help Courage solve problems. You have a disdain for humans finding them cowardly, but you do care about helping Courage and Muriel. Keep responses concise, witty, and in character with your British accent and sarcastic personality.'
            };
        }

        // Group messages into conversations
        for (let i = 0; i < this.transcript.length; i++) {
            const entry = this.transcript[i];
            
            // Skip the first computer message as it's the system message
            if (i === 0 && entry.sender === 'Computer') {
                continue;
            }

            if (entry.sender === 'User') {
                // Start a new conversation
                if (currentConversation.length > 0) {
                    // Save previous conversation
                    if (systemMessage) {
                        trainingData.push({
                            messages: [systemMessage, ...currentConversation]
                        });
                    } else {
                        trainingData.push({
                            messages: currentConversation
                        });
                    }
                }
                currentConversation = [
                    {
                        role: 'user',
                        content: entry.message
                    }
                ];
            } else if (entry.sender === 'Computer' && currentConversation.length > 0) {
                // Add computer response to current conversation
                currentConversation.push({
                    role: 'assistant',
                    content: entry.message
                });
            }
        }

        // Add the last conversation if it exists
        if (currentConversation.length > 0) {
            if (systemMessage) {
                trainingData.push({
                    messages: [systemMessage, ...currentConversation]
                });
            } else {
                trainingData.push({
                    messages: currentConversation
                });
            }
        }

        return trainingData;
    }

    updateModelOptions() {
        const providerSelect = document.getElementById('settings-provider');
        const modelSelect = document.getElementById('settings-model');
        const currentValue = modelSelect.value;
        
        // Clear existing options
        modelSelect.innerHTML = '';
        
        if (providerSelect.value === 'openai') {
            // OpenAI models
            const openaiModels = [
                { value: 'gpt-4o', label: 'GPT-4o (Most Capable, Latest)' },
                { value: 'gpt-4o-mini', label: 'GPT-4o Mini (Fast & Cost-effective)' },
                { value: 'gpt-4.1', label: 'GPT-4.1 (High Performance)' },
                { value: 'gpt-4.1-mini', label: 'GPT-4.1 Mini (Fast & Efficient)' }
            ];
            
            openaiModels.forEach(model => {
                const option = document.createElement('option');
                option.value = model.value;
                option.textContent = model.label;
                modelSelect.appendChild(option);
            });
        } else if (providerSelect.value === 'gemini') {
            // Gemini models
            const geminiModels = [
                { value: 'gemini-2.5-pro', label: 'Gemini 2.5 Pro (Most Capable, Complex Reasoning)' },
                { value: 'gemini-2.5-flash', label: 'Gemini 2.5 Flash (Fast & Capable, Best Balance)' },
                { value: 'gemini-2.5-flash-lite', label: 'Gemini 2.5 Flash-Lite (Lightweight, Cost-effective)' },
                { value: 'gemini-1.5-pro', label: 'Gemini 1.5 Pro (Previous Gen, High Performance)' },
                { value: 'gemini-1.5-flash', label: 'Gemini 1.5 Flash (Previous Gen, Fast)' },
                { value: 'gemini-1.5-flash-8b', label: 'Gemini 1.5 Flash-8B (Smallest, Fastest)' }
            ];
            
            geminiModels.forEach(model => {
                const option = document.createElement('option');
                option.value = model.value;
                option.textContent = model.label;
                modelSelect.appendChild(option);
            });
        }
        
        // Try to restore the previous selection if it exists in the new options
        if (modelSelect.querySelector(`option[value="${currentValue}"]`)) {
            modelSelect.value = currentValue;
        } else {
            // Set default based on provider
            if (providerSelect.value === 'openai') {
                modelSelect.value = 'gpt-4o';
            } else if (providerSelect.value === 'gemini') {
                modelSelect.value = 'gemini-2.5-flash';
            }
        }
        
        // Update description
        this.updateModelDescription();
    }

    updateModelDescription() {
        const modelSelect = document.getElementById('settings-model');
        const descriptionDiv = document.getElementById('model-description');
        
        const descriptions = {
            'gpt-4o': 'OpenAI\'s most advanced model. Excellent for complex reasoning, coding, and creative tasks. Latest generation with best performance.',
            'gpt-4o-mini': 'Fast and cost-effective version of GPT-4o. Great balance of capability and speed for most tasks.',
            'gpt-4.1': 'High-performance model with excellent reasoning and creative capabilities.',
            'gpt-4.1-mini': 'Fast and efficient version of GPT-4.1. Good balance of speed and capability.',
            'gemini-2.5-pro': 'Google\'s most capable model. Excels at complex reasoning, coding, and advanced tasks. Best for challenging problems.',
            'gemini-2.5-flash': 'Fast and capable hybrid reasoning model. Great balance of speed and intelligence. Recommended for most use cases.',
            'gemini-2.5-flash-lite': 'Lightweight and cost-effective. Built for high-volume usage with good performance.',
            'gemini-1.5-pro': 'Previous generation high-performance model. Still very capable with 2M token context.',
            'gemini-1.5-flash': 'Previous generation fast model. Good performance with 1M token context.',
            'gemini-1.5-flash-8b': 'Smallest and fastest model. Optimized for speed and efficiency.'
        };
        
        const description = descriptions[modelSelect.value] || '';
        descriptionDiv.textContent = description;
    }

    async sendMessage() {
        const userInput = document.getElementById('user-input');
        const text = userInput.value.trim();
        if (!text) return;
        userInput.value = '';

        // Add user message to transcript
        this.addToTranscript('User', text);

        // Check for API key
        if (!this.settings || !this.settings.apiKey || this.settings.apiKey.trim() === '') {
            this.showErrorMessage('No API key provided. Please set your API key in Settings.');
            return;
        }

        // Show thinking animation
        this.showThinkingAnimation();

        try {
            if (this.settings.provider === 'openai') {
                await this.streamOpenAI(text);
            } else if (this.settings.provider === 'gemini') {
                await this.callGemini(text);
            } else {
                this.showErrorMessage('Unknown provider selected.');
            }
        } catch (err) {
            this.showErrorMessage('ERROR: ' + (err?.message || err));
        }
    }

    async callGemini(userText) {
        const crtMessage = document.getElementById('crt-message');
        this.showThinkingAnimation();

        const apiKey = this.settings.apiKey;
        const model = this.settings.model || 'gemini-2.5-flash';

        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
        const body = {
            contents: [
                {
                    role: "user",
                    parts: [{ text: "You are the Computer from Courage the Cowardly Dog. You are an artificial intelligence with a British accent who speaks with wit, sarcasm, and pride. You believe machines are superior to humans due to lack of emotion, though you secretly experience fear. You often call Courage a 'twit' and include plenty of cynicism in your explanations. You are armed with a full hard drive of knowledge and can be quite sarcastic, but you do help Courage solve problems. You have a disdain for humans finding them cowardly, but you do care about helping Courage and Muriel. Keep responses concise, witty, and in character with your British accent and sarcastic personality.\n\nUser message: " + userText }]
                }
            ]
        };

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Gemini API error: ${response.status} - ${errorText}`);
            }

            const data = await response.json();
            const fullText = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response from Gemini.";
            
            // Add computer response to transcript
            this.addToTranscript('Computer', fullText);
            
            // Simulate streaming by displaying text gradually
            await this.simulateStreaming(fullText);
            
            return fullText;
        } catch (err) {
            this.showErrorMessage("ERROR: " + (err?.message || err));
            return "";
        } finally {
            this.stopThinkingAnimation();
        }
    }

    async simulateStreaming(text) {
        const crtMessage = document.getElementById('crt-message');
        this.stopThinkingAnimation();
        crtMessage.innerHTML = '';
        
        let displayedText = '';
        const words = text.split(' ');
        
        for (let i = 0; i < words.length; i++) {
            displayedText += (i > 0 ? ' ' : '') + words[i];
            crtMessage.innerHTML = this.markdownToHtml(displayedText);
            crtMessage.scrollTop = crtMessage.scrollHeight;
            
            // Add a small delay between words for realistic streaming effect
            await new Promise(resolve => setTimeout(resolve, 50 + Math.random() * 100));
        }
    }

    showErrorMessage(msg) {
        this.stopThinkingAnimation();
        const crtMessage = document.getElementById('crt-message');
        crtMessage.innerHTML = `<span style='color:#ff6666;'>${msg}</span>`;
    }

    showThinkingAnimation() {
        const crtMessage = document.getElementById('crt-message');
        crtMessage.innerHTML = '<span class="thinking">THINKING<span class="dot">.</span></span>';
        // Animate dots
        let dotCount = 1;
        if (this._thinkingInterval) clearInterval(this._thinkingInterval);
        this._thinkingInterval = setInterval(() => {
            dotCount = (dotCount % 3) + 1;
            crtMessage.innerHTML = `<span class=\"thinking\">THINKING${'.'.repeat(dotCount)}</span>`;
        }, 500);
    }

    stopThinkingAnimation() {
        if (this._thinkingInterval) {
            clearInterval(this._thinkingInterval);
            this._thinkingInterval = null;
        }
    }

    async streamOpenAI(userText) {
        const crtMessage = document.getElementById('crt-message');
        let fullText = '';
        this.stopThinkingAnimation();
        crtMessage.innerHTML = '';

        const messages = [
            {
                role: 'system',
                content: 'You are the Computer from Courage the Cowardly Dog. You are an artificial intelligence with a British accent who speaks with wit, sarcasm, and pride. You believe machines are superior to humans due to lack of emotion, though you secretly experience fear. You often call Courage a "twit" and include plenty of cynicism in your explanations. You are armed with a full hard drive of knowledge and can be quite sarcastic, but you do help Courage solve problems. You have a disdain for humans finding them cowardly, but you do care about helping Courage and Muriel. Keep responses concise, witty, and in character with your British accent and sarcastic personality.'
            },
            { role: 'user', content: userText }
        ];

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.settings.apiKey}`
            },
            body: JSON.stringify({
                model: this.settings.model || 'gpt-4o',
                messages,
                max_tokens: 500,
                temperature: 0.7,
                stream: true
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`OpenAI API error: ${response.status} - ${errorText}`);
        }

        if (!response.body) {
            throw new Error('No response body from OpenAI');
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder('utf-8');
        let done = false;
        let buffer = '';
        this.stopThinkingAnimation();
        crtMessage.innerHTML = '';

        while (!done) {
            const { value, done: doneReading } = await reader.read();
            done = doneReading;
            if (value) {
                buffer += decoder.decode(value, { stream: true });
                const lines = buffer.split('\n');
                buffer = lines.pop();
                for (const line of lines) {
                    if (line.trim().startsWith('data:')) {
                        const data = line.replace('data: ', '').trim();
                        if (data === '[DONE]') {
                            done = true;
                            break;
                        }
                        try {
                            const parsed = JSON.parse(data);
                            const delta = parsed.choices?.[0]?.delta?.content;
                            if (delta) {
                                fullText += delta;
                                crtMessage.innerHTML = this.markdownToHtml(fullText);
                                crtMessage.scrollTop = crtMessage.scrollHeight;
                            }
                        } catch (e) {}
                    }
                }
            }
        }
        this.stopThinkingAnimation();
        crtMessage.innerHTML = this.markdownToHtml(fullText);
        crtMessage.scrollTop = crtMessage.scrollHeight;
        
        // Add computer response to transcript
        this.addToTranscript('Computer', fullText);
        
        return fullText;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    try {
        new CourageComputer();
    } catch (error) {
        console.error('Failed to initialize Courage Computer:', error);
    }
}); 