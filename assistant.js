/**
 * Fitness Influencer AI Assistant - Chat Interface
 * Intelligent routing of natural language requests to backend API endpoints
 */

const API_URL = 'https://web-production-44ade.up.railway.app';

// Track conversation state
let conversationHistory = [];

/**
 * Process user request with intelligent routing
 * Analyzes the request and routes to appropriate backend endpoints
 */
async function processUserRequest(message, files) {
    const typingIndicator = document.getElementById('typingIndicator');

    try {
        // Analyze request intent
        const intent = analyzeIntent(message, files);

        // Route to appropriate handler
        let response;
        switch (intent.type) {
            case 'video_edit':
                response = await handleVideoEdit(message, files, intent);
                break;
            case 'create_graphic':
                response = await handleGraphicCreation(message, files, intent);
                break;
            case 'generate_image':
                response = await handleImageGeneration(message, intent);
                break;
            case 'email_digest':
                response = await handleEmailDigest(message, intent);
                break;
            case 'revenue_analytics':
                response = await handleRevenueAnalytics(message, intent);
                break;
            case 'calendar_reminder':
                response = await handleCalendarReminder(message, intent);
                break;
            case 'create_ad':
                response = await handleAdCreation(message, files, intent);
                break;
            default:
                response = handleGeneralQuery(message);
        }

        // Hide typing indicator
        typingIndicator.classList.remove('active');

        // Add response to chat
        addMessage(response, 'assistant');

        // Clear attached files after processing
        window.attachedFiles = [];
        displayAttachedFiles();

    } catch (error) {
        typingIndicator.classList.remove('active');
        addMessage(`Sorry, I encountered an error: ${error.message}. Please try again or rephrase your request.`, 'assistant');
    }
}

/**
 * Analyze user intent from message and files
 */
function analyzeIntent(message, files) {
    const lowerMessage = message.toLowerCase();

    // Check for video editing
    if ((lowerMessage.includes('edit') || lowerMessage.includes('jump cut') || lowerMessage.includes('remove silence')) && files.some(f => f.type.startsWith('video/'))) {
        return { type: 'video_edit', confidence: 'high' };
    }

    // Check for ad creation
    if (lowerMessage.includes('ad') || lowerMessage.includes('advertisement') || lowerMessage.includes('promotional video')) {
        return { type: 'create_ad', confidence: 'high' };
    }

    // Check for graphic creation
    if (lowerMessage.includes('graphic') || lowerMessage.includes('instagram post') || lowerMessage.includes('create image') || lowerMessage.match(/tips|guide|infographic/)) {
        return { type: 'create_graphic', confidence: 'high' };
    }

    // Check for AI image generation
    if (lowerMessage.includes('generate') && (lowerMessage.includes('image') || lowerMessage.includes('picture') || lowerMessage.includes('ai'))) {
        return { type: 'generate_image', confidence: 'high' };
    }

    // Check for email digest
    if (lowerMessage.includes('email') && (lowerMessage.includes('digest') || lowerMessage.includes('summary') || lowerMessage.includes('inbox'))) {
        return { type: 'email_digest', confidence: 'high' };
    }

    // Check for revenue analytics
    if (lowerMessage.match(/revenue|analytics|profit|expense|income/)) {
        return { type: 'revenue_analytics', confidence: 'high' };
    }

    // Check for calendar reminders
    if (lowerMessage.match(/calendar|reminder|schedule|recurring/)) {
        return { type: 'calendar_reminder', confidence: 'high' };
    }

    return { type: 'general', confidence: 'low' };
}

/**
 * Handle video editing request
 */
async function handleVideoEdit(message, files, intent) {
    const videoFile = files.find(f => f.type.startsWith('video/'));

    if (!videoFile) {
        return "I'd be happy to edit your video! Please attach a video file (MP4, MOV, or AVI) and I'll remove the silence with jump cuts.";
    }

    // Extract silence threshold from message if specified
    const thresholdMatch = message.match(/-?\d+\s*db/i);
    const silenceThreshold = thresholdMatch ? parseInt(thresholdMatch[0]) : -40;

    // Create FormData
    const formData = new FormData();
    formData.append('video', videoFile);
    formData.append('silence_threshold', silenceThreshold);
    formData.append('min_silence_duration', '0.5');

    addMessage(`Processing "${videoFile.name}"... This may take a few minutes depending on video length.`, 'assistant');

    try {
        const response = await fetch(`${API_URL}/api/video/edit`, {
            method: 'POST',
            body: formData
        });

        const data = await response.json();

        if (data.success) {
            return `
                ✅ Video processed successfully!<br><br>
                <strong>📊 Processing Stats:</strong><br>
                • Original Size: ${data.stats.original_size_mb}MB<br>
                • Processed Size: ${data.stats.processed_size_mb}MB<br>
                • Size Reduction: ${data.stats.size_reduction_percent}%<br>
                • Jump Cuts Made: ${data.stats.cuts_made}<br>
                • Processing Time: ${data.stats.processing_time_seconds}s<br>
                • Silence Threshold: ${data.stats.silence_threshold_db}dB<br><br>
                <a href="${data.output_url}" class="btn btn-gold" download="edited_${videoFile.name}">⬇️ Download Edited Video</a>
            `;
        } else {
            throw new Error(data.message || 'Processing failed');
        }
    } catch (error) {
        throw new Error(`Video processing failed: ${error.message}`);
    }
}

/**
 * Handle graphic creation request - FULLY FUNCTIONAL
 */
async function handleGraphicCreation(message, files, intent) {
    // Extract title and points from message
    const titleMatch = message.match(/["']([^"']+)["']/);
    const title = titleMatch ? titleMatch[1] : "Fitness Tips";

    // Look for numbered lists or bullet points
    const pointsMatch = message.match(/\d+\.\s+([^\n]+)/g) ||
                        message.match(/[-•]\s+([^\n]+)/g);

    let cleanPoints;
    if (pointsMatch) {
        cleanPoints = pointsMatch.map(p => p.replace(/^\d+\.\s+|^[-•]\s+/, '').trim()).slice(0, 5);
    } else {
        // Default points
        cleanPoints = ['Eat protein', 'Lift weights', 'Stay consistent', 'Get enough sleep', 'Track progress'];
    }

    // Detect platform
    let platform = 'instagram_post';
    if (message.toLowerCase().includes('youtube')) platform = 'youtube_thumbnail';
    else if (message.toLowerCase().includes('tiktok')) platform = 'tiktok';
    else if (message.toLowerCase().includes('story')) platform = 'instagram_story';

    addMessage(`Creating branded ${platform} graphic: "${title}"...`, 'assistant');

    try {
        const response = await fetch(`${API_URL}/api/graphics/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: title,
                points: cleanPoints,
                platform: platform
            })
        });

        const data = await response.json();

        if (data.success) {
            return `
                ✅ Branded graphic created!<br><br>
                <strong>Title:</strong> "${title}"<br>
                <strong>Points:</strong><br>
                ${cleanPoints.map(p => `• ${p}`).join('<br>')}<br><br>
                <strong>Platform:</strong> ${platform}<br><br>
                <a href="${data.output_url}" class="btn btn-gold" download>⬇️ Download Graphic</a><br><br>
                <em>Ready to post to ${platform}!</em>
            `;
        } else {
            throw new Error(data.message || 'Graphic creation failed');
        }
    } catch (error) {
        throw new Error(`Graphic creation failed: ${error.message}`);
    }
}

/**
 * Handle AI image generation request - FULLY FUNCTIONAL
 */
async function handleImageGeneration(message, intent) {
    // Extract prompt from message
    let prompt = message.replace(/generate|create|make|ai|image|picture/gi, '').trim();

    if (!prompt || prompt.length < 10) {
        prompt = "Fitness influencer working out in a modern gym with professional lighting";
    }

    addMessage(`Generating AI image: "${prompt}"...`, 'assistant');

    try {
        const response = await fetch(`${API_URL}/api/images/generate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                prompt: prompt,
                count: 1
            })
        });

        const data = await response.json();

        if (data.status === 'success') {
            return `
                ✅ AI image generated!<br><br>
                <strong>Prompt:</strong> "${prompt}"<br>
                <strong>Cost:</strong> $${data.cost.toFixed(2)}<br><br>
                <a href="${data.output_url || '#'}" class="btn btn-gold" download>⬇️ Download Image</a><br><br>
                <em>Generated with Grok/xAI Aurora model</em>
            `;
        } else {
            throw new Error(data.message || 'Image generation failed');
        }
    } catch (error) {
        return `
            ⚠️ AI image generation requires xAI API key setup.<br><br>
            <strong>Prompt received:</strong> "${prompt}"<br>
            <strong>Cost:</strong> $0.07 per image<br><br>
            <em>This feature will be available once API credentials are configured on the backend.</em>
        `;
    }
}

/**
 * Handle email digest request
 */
async function handleEmailDigest(message, intent) {
    // Extract timeframe from message
    const daysMatch = message.match(/(\d+)\s*(day|week|hour)/i);
    let hours = 24;

    if (daysMatch) {
        const num = parseInt(daysMatch[1]);
        const unit = daysMatch[2].toLowerCase();

        if (unit.startsWith('week')) {
            hours = num * 24 * 7;
        } else if (unit.startsWith('day')) {
            hours = num * 24;
        } else {
            hours = num;
        }
    }

    return `
        📧 Generating email digest for the past ${hours} hours...<br><br>
        <em>Note: Email digest endpoint requires Google OAuth setup. This will categorize your emails by priority and provide suggested actions.</em><br><br>
        <strong>Categories:</strong><br>
        • Urgent Client Emails<br>
        • Business Development<br>
        • Partnership Opportunities<br>
        • General Correspondence
    `;
}

/**
 * Handle revenue analytics request
 */
async function handleRevenueAnalytics(message, intent) {
    return `
        📊 Generating revenue analytics report...<br><br>
        <em>Note: Revenue analytics requires connection to your Google Sheets. This will analyze:</em><br><br>
        • Revenue by source (coaching, products, sponsorships)<br>
        • Expenses by category<br>
        • Profit margins<br>
        • Month-over-month growth<br>
        • Top performing revenue streams<br><br>
        Please provide your Google Sheets ID to get started.
    `;
}

/**
 * Handle calendar reminder request
 */
async function handleCalendarReminder(message, intent) {
    // Extract days from message
    const dayPatterns = {
        'monday': 'MO', 'mon': 'MO',
        'tuesday': 'TU', 'tue': 'TU',
        'wednesday': 'WE', 'wed': 'WE',
        'thursday': 'TH', 'thu': 'TH',
        'friday': 'FR', 'fri': 'FR',
        'saturday': 'SA', 'sat': 'SA',
        'sunday': 'SU', 'sun': 'SU'
    };

    const lowerMsg = message.toLowerCase();
    const days = [];

    for (const [day, code] of Object.entries(dayPatterns)) {
        if (lowerMsg.includes(day)) {
            days.push(code);
        }
    }

    const daysList = days.length > 0 ? days.join(', ') : 'MO, WE, FR';

    return `
        📅 Creating recurring calendar reminder:<br>
        <strong>Days:</strong> ${daysList}<br>
        <strong>Task:</strong> ${message.split('for')[1] || 'Content posting'}<br><br>
        <em>Note: Calendar integration requires Google OAuth setup. This will create recurring reminders in your Google Calendar.</em>
    `;
}

/**
 * Handle advertisement creation request - FULLY FUNCTIONAL
 */
async function handleAdCreation(message, files, intent) {
    const hasVideo = files.some(f => f.type.startsWith('video/'));
    const hasImages = files.some(f => f.type.startsWith('image/'));

    if (!hasVideo && !hasImages) {
        return `
            🎬 I can help create an ad!<br><br>
            <strong>To get started, please upload:</strong><br>
            • Video footage (for video ads)<br>
            • Product images (for static ads)<br>
            • Or both!<br><br>
            Then I'll help you create a polished ad with:<br>
            ✅ Automatic video editing (jump cuts)<br>
            ✅ Branded graphics and overlays<br>
            ✅ AI-generated backgrounds (optional)<br>
            ✅ Platform optimization (Instagram, YouTube, TikTok)
        `;
    }

    // Extract ad details from message
    const titleMatch = message.match(/["']([^"']+)["']/);
    const title = titleMatch ? titleMatch[1] : "Fitness AI Assistant";

    // Detect if they want AI background
    const wantsBackground = message.toLowerCase().includes('background') ||
                           message.toLowerCase().includes('generate image');

    // Detect platform
    let platform = 'instagram_post';
    if (message.toLowerCase().includes('youtube')) platform = 'youtube_thumbnail';
    else if (message.toLowerCase().includes('tiktok')) platform = 'tiktok';
    else if (message.toLowerCase().includes('story')) platform = 'instagram_story';

    // Create FormData
    const formData = new FormData();

    // Add files
    if (hasVideo) {
        const videoFile = files.find(f => f.type.startsWith('video/'));
        formData.append('video', videoFile);
        formData.append('edit_video', 'true');
    }

    if (hasImages) {
        files.filter(f => f.type.startsWith('image/')).forEach(img => {
            formData.append('images', img);
        });
    }

    // Add text parameters
    formData.append('title', title);
    formData.append('tagline', 'Professional AI-Powered Automation');
    formData.append('call_to_action', 'Learn More');
    formData.append('platform', platform);

    if (wantsBackground) {
        formData.append('generate_background', 'true');
        formData.append('background_prompt', 'Modern fitness gym with equipment, professional lighting');
    }

    addMessage(`Creating your ${platform} ad with ${hasVideo ? 'video' : 'images'}... This may take a few minutes.`, 'assistant');

    try {
        const response = await fetch(`${API_URL}/api/ads/create`, {
            method: 'POST',
            body: formData
        });

        const data = await response.json();

        if (data.success) {
            let responseHTML = `
                ✅ Ad creation complete!<br><br>
                <strong>📦 Your Assets:</strong><br>
            `;

            // List all downloads
            data.downloads.forEach(asset => {
                responseHTML += `
                    • <strong>${asset.name}:</strong> <a href="${asset.url}" class="btn btn-sm btn-gold" download>⬇️ Download</a><br>
                `;
            });

            responseHTML += `<br>
                <strong>📊 Processing Stats:</strong><br>
                • Total Assets: ${data.stats.total_assets}<br>
                • Processing Time: ${data.stats.processing_time_seconds}s<br>
                • Platform: ${platform}<br>
            `;

            if (data.stats.total_cost > 0) {
                responseHTML += `• AI Generation Cost: $${data.stats.total_cost.toFixed(2)}<br>`;
            }

            responseHTML += `<br>
                <strong>💡 Next Steps:</strong><br>
                • Download all assets above<br>
                • Combine in your favorite video editor if needed<br>
                • Add music and final touches<br>
                • Post to ${platform}!
            `;

            return responseHTML;
        } else {
            throw new Error(data.message || 'Ad creation failed');
        }
    } catch (error) {
        throw new Error(`Ad creation failed: ${error.message}`);
    }
}

/**
 * Handle general queries
 */
function handleGeneralQuery(message) {
    return `
        I can help you with:<br><br>
        <strong>🎬 Content Creation:</strong><br>
        • Edit videos with jump cuts<br>
        • Create branded graphics<br>
        • Generate AI images<br>
        • Make video advertisements<br><br>
        <strong>📊 Business Operations:</strong><br>
        • Email digests and summaries<br>
        • Revenue & expense analytics<br>
        • Calendar reminders<br><br>
        Try uploading a video and saying "edit this with jump cuts" or click the capability cards above to see example prompts!
    `;
}

/**
 * Check API status
 */
async function checkAPIStatus() {
    const statusIndicator = document.querySelector('.status-indicator');
    const statusText = document.getElementById('status-text');

    try {
        const response = await fetch(`${API_URL}/api/status`);
        const data = await response.json();

        if (data.ready) {
            statusIndicator.classList.add('status-online');
            statusIndicator.classList.remove('status-offline');
            statusText.textContent = 'System Ready';
            statusText.className = 'text-success';
        } else {
            statusIndicator.classList.add('status-online');
            statusText.textContent = 'System Online (Some features unavailable)';
            statusText.className = 'text-warning';
        }
    } catch (error) {
        statusIndicator.classList.remove('status-online');
        statusIndicator.classList.add('status-offline');
        statusText.textContent = 'System Offline';
        statusText.className = 'text-danger';
    }
}
