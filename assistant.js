// API Configuration
const API_BASE_URL = 'https://web-production-44ade.up.railway.app';

// Check API status on page load
document.addEventListener('DOMContentLoaded', async () => {
    await checkAPIStatus();
});

// Check if API is online
async function checkAPIStatus() {
    const statusIndicator = document.querySelector('.status-indicator');
    const statusText = document.getElementById('status-text');

    try {
        const response = await fetch(`${API_BASE_URL}/api/status`);
        const data = await response.json();

        if (data.api_status === 'healthy') {
            statusIndicator.classList.remove('status-offline');
            statusIndicator.classList.add('status-online');
            statusText.textContent = 'API Connected ✓';
            statusText.style.color = '#00ff00';
        } else {
            throw new Error('API unhealthy');
        }
    } catch (error) {
        statusIndicator.classList.remove('status-online');
        statusIndicator.classList.add('status-offline');
        statusText.textContent = 'API Offline ✗';
        statusText.style.color = '#ff0000';
        console.error('API Status Check Failed:', error);
    }
}

// Video Processing
async function processVideo() {
    const fileInput = document.getElementById('videoFile');
    const silenceThreshold = document.getElementById('silenceThreshold').value;
    const outputDiv = document.getElementById('video-output');

    if (!fileInput.files || fileInput.files.length === 0) {
        alert('Please select a video file to upload');
        return;
    }

    const file = fileInput.files[0];

    // Check file size (max 500MB)
    const maxSize = 500 * 1024 * 1024; // 500MB in bytes
    if (file.size > maxSize) {
        alert('File too large! Maximum size is 500MB. Please compress your video first.');
        return;
    }

    // Validate file type
    const validTypes = ['video/mp4', 'video/quicktime', 'video/x-msvideo', 'video/avi'];
    if (!validTypes.includes(file.type) && !file.name.match(/\.(mp4|mov|avi)$/i)) {
        alert('Invalid file type. Please upload MP4, MOV, or AVI format.');
        return;
    }

    outputDiv.style.display = 'block';
    outputDiv.innerHTML = `
        <div class="spinner-border text-warning" role="status"></div>
        Uploading ${file.name} (${(file.size / 1024 / 1024).toFixed(2)}MB)...
        <div class="progress mt-2" style="height: 20px;">
            <div id="upload-progress" class="progress-bar bg-warning" role="progressbar" style="width: 0%">0%</div>
        </div>
    `;

    try {
        // Create FormData for file upload
        const formData = new FormData();
        formData.append('video', file);
        formData.append('silence_threshold', silenceThreshold);
        formData.append('min_silence_duration', '0.5');

        // Upload with progress tracking
        const xhr = new XMLHttpRequest();

        // Track upload progress
        xhr.upload.addEventListener('progress', (e) => {
            if (e.lengthComputable) {
                const percentComplete = (e.loaded / e.total) * 100;
                const progressBar = document.getElementById('upload-progress');
                if (progressBar) {
                    progressBar.style.width = percentComplete + '%';
                    progressBar.textContent = Math.round(percentComplete) + '%';
                }
            }
        });

        // Handle completion
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                const data = JSON.parse(xhr.responseText);

                outputDiv.innerHTML = `
                    <div class="text-success">✅ Video processed successfully!</div>
                    <div class="mt-2">
                        <strong>Original:</strong> ${file.name}<br>
                        <strong>Size:</strong> ${(file.size / 1024 / 1024).toFixed(2)}MB<br>
                        ${data.cuts_made ? `<strong>Jump cuts made:</strong> ${data.cuts_made}<br>` : ''}
                        ${data.processing_time ? `<strong>Processing time:</strong> ${data.processing_time}s` : ''}
                    </div>
                    ${data.output_url ? `
                        <div class="mt-3">
                            <a href="${data.output_url}" class="btn btn-gold" download>
                                ⬇️ Download Edited Video
                            </a>
                        </div>
                    ` : ''}
                    ${data.preview_url ? `
                        <div class="mt-3">
                            <video controls class="w-100" style="max-height: 300px; border-radius: 8px;">
                                <source src="${data.preview_url}" type="video/mp4">
                            </video>
                        </div>
                    ` : ''}
                `;
            } else {
                const error = JSON.parse(xhr.responseText);
                throw new Error(error.detail || 'Processing failed');
            }
        });

        // Handle errors
        xhr.addEventListener('error', () => {
            outputDiv.innerHTML = `<div class="text-danger">❌ Upload failed. Please check your connection.</div>`;
        });

        xhr.addEventListener('timeout', () => {
            outputDiv.innerHTML = `<div class="text-danger">❌ Processing timed out. Try a shorter video.</div>`;
        });

        // Send request
        xhr.open('POST', `${API_BASE_URL}/api/video/edit`);
        xhr.timeout = 600000; // 10 minute timeout
        xhr.send(formData);

        // Update status after upload completes
        setTimeout(() => {
            if (document.getElementById('upload-progress')) {
                outputDiv.innerHTML = `
                    <div class="spinner-border text-warning" role="status"></div>
                    Processing video (this may take a few minutes)...
                    <div class="mt-2 text-muted">
                        <small>Analyzing audio, detecting silence, applying jump cuts...</small>
                    </div>
                `;
            }
        }, 100);

    } catch (error) {
        outputDiv.innerHTML = `<div class="text-danger">❌ Error: ${error.message}</div>`;
    }
}

// Update silence threshold display in real-time
document.addEventListener('DOMContentLoaded', () => {
    const silenceInput = document.getElementById('silenceThreshold');
    const silenceValue = document.getElementById('silenceValue');

    if (silenceInput && silenceValue) {
        silenceInput.addEventListener('input', (e) => {
            silenceValue.textContent = e.target.value;
        });
    }
});

// Create Educational Graphic
async function createGraphic() {
    const mainText = document.getElementById('graphicText').value;
    const subtext = document.getElementById('graphicSubtext').value;
    const outputDiv = document.getElementById('graphic-output');

    if (!mainText) {
        alert('Please enter main text for the graphic');
        return;
    }

    outputDiv.style.display = 'block';
    outputDiv.innerHTML = '<div class="spinner-border text-warning" role="status"></div> Creating graphic...';

    try {
        const response = await fetch(`${API_BASE_URL}/api/graphics/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                main_text: mainText,
                subtext: subtext,
                template: 'motivation'
            })
        });

        const data = await response.json();

        if (response.ok) {
            outputDiv.innerHTML = `
                <div class="text-success">✓ Graphic created successfully!</div>
                <div class="mt-2">
                    <strong>File:</strong> ${data.output_path || 'Ready for download'}
                </div>
                ${data.image_url ? `<img src="${data.image_url}" alt="Generated graphic" class="img-fluid mt-3" style="max-height: 300px;">` : ''}
            `;
        } else {
            throw new Error(data.detail || 'Creation failed');
        }
    } catch (error) {
        outputDiv.innerHTML = `<div class="text-danger">✗ Error: ${error.message}</div>`;
    }
}

// Get Email Digest
async function getEmailDigest() {
    const days = document.getElementById('emailDays').value;
    const outputDiv = document.getElementById('email-output');

    outputDiv.style.display = 'block';
    outputDiv.innerHTML = '<div class="spinner-border text-warning" role="status"></div> Fetching emails...';

    try {
        const response = await fetch(`${API_BASE_URL}/api/email/digest?days=${days}`);
        const data = await response.json();

        if (response.ok) {
            let emailsHTML = '<div class="text-success">✓ Digest retrieved!</div>';

            if (data.categories) {
                Object.keys(data.categories).forEach(category => {
                    const emails = data.categories[category];
                    if (emails.length > 0) {
                        emailsHTML += `
                            <div class="mt-3">
                                <strong class="text-warning">${category.toUpperCase()}</strong> (${emails.length})
                                <ul class="mt-2">
                                    ${emails.slice(0, 5).map(email => `<li>${email.subject || email}</li>`).join('')}
                                </ul>
                            </div>
                        `;
                    }
                });
            } else {
                emailsHTML += `<div class="mt-2">Total emails: ${data.total || 0}</div>`;
            }

            outputDiv.innerHTML = emailsHTML;
        } else {
            throw new Error(data.detail || 'Failed to fetch emails');
        }
    } catch (error) {
        outputDiv.innerHTML = `<div class="text-danger">✗ Error: ${error.message}</div>`;
    }
}

// Get Revenue Analytics
async function getAnalytics() {
    const sheetId = document.getElementById('sheetId').value;
    const outputDiv = document.getElementById('analytics-output');

    if (!sheetId) {
        alert('Please enter a Google Sheet ID');
        return;
    }

    outputDiv.style.display = 'block';
    outputDiv.innerHTML = '<div class="spinner-border text-warning" role="status"></div> Analyzing revenue...';

    try {
        const response = await fetch(`${API_BASE_URL}/api/analytics/revenue`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                sheet_id: sheetId
            })
        });

        const data = await response.json();

        if (response.ok) {
            outputDiv.innerHTML = `
                <div class="text-success">✓ Analytics generated!</div>
                <div class="mt-2">
                    ${data.total_revenue ? `<div><strong>Total Revenue:</strong> $${data.total_revenue.toFixed(2)}</div>` : ''}
                    ${data.total_expenses ? `<div><strong>Total Expenses:</strong> $${data.total_expenses.toFixed(2)}</div>` : ''}
                    ${data.profit ? `<div><strong>Profit:</strong> $${data.profit.toFixed(2)}</div>` : ''}
                    ${data.profit_margin ? `<div><strong>Profit Margin:</strong> ${(data.profit_margin * 100).toFixed(1)}%</div>` : ''}
                </div>
            `;
        } else {
            throw new Error(data.detail || 'Analytics failed');
        }
    } catch (error) {
        outputDiv.innerHTML = `<div class="text-danger">✗ Error: ${error.message}</div>`;
    }
}

// Generate AI Image
async function generateImage() {
    const prompt = document.getElementById('imagePrompt').value;
    const outputDiv = document.getElementById('image-output');

    if (!prompt) {
        alert('Please enter an image prompt');
        return;
    }

    outputDiv.style.display = 'block';
    outputDiv.innerHTML = '<div class="spinner-border text-warning" role="status"></div> Generating image (this may take 30-60 seconds)...';

    try {
        const response = await fetch(`${API_BASE_URL}/api/images/generate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                prompt: prompt,
                style: 'realistic'
            })
        });

        const data = await response.json();

        if (response.ok) {
            outputDiv.innerHTML = `
                <div class="text-success">✓ Image generated!</div>
                ${data.image_url ? `
                    <div class="mt-3">
                        <img src="${data.image_url}" alt="AI Generated Image" class="img-fluid" style="max-height: 400px; border-radius: 8px;">
                    </div>
                ` : ''}
                ${data.image_path ? `<div class="mt-2"><small>Saved to: ${data.image_path}</small></div>` : ''}
            `;
        } else {
            throw new Error(data.detail || 'Image generation failed');
        }
    } catch (error) {
        outputDiv.innerHTML = `<div class="text-danger">✗ Error: ${error.message}</div>`;
    }
}

// Create Calendar Reminder
async function createReminder() {
    const title = document.getElementById('reminderTitle').value;
    const days = document.getElementById('reminderDays').value;
    const outputDiv = document.getElementById('calendar-output');

    if (!title) {
        alert('Please enter a reminder title');
        return;
    }

    outputDiv.style.display = 'block';
    outputDiv.innerHTML = '<div class="spinner-border text-warning" role="status"></div> Creating reminder...';

    try {
        const response = await fetch(`${API_BASE_URL}/api/calendar/reminder`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: title,
                days: days.split(',').map(d => d.trim()),
                time: '09:00'
            })
        });

        const data = await response.json();

        if (response.ok) {
            outputDiv.innerHTML = `
                <div class="text-success">✓ Reminder created successfully!</div>
                <div class="mt-2">
                    <strong>Title:</strong> ${title}<br>
                    <strong>Days:</strong> ${days}<br>
                    ${data.event_link ? `<a href="${data.event_link}" target="_blank" class="text-gold">View in Google Calendar</a>` : ''}
                </div>
            `;
        } else {
            throw new Error(data.detail || 'Reminder creation failed');
        }
    } catch (error) {
        outputDiv.innerHTML = `<div class="text-danger">✗ Error: ${error.message}</div>`;
    }
}
