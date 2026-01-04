const express = require('express');
const multer = require('multer');
const cors = require('cors');
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');
const AdmZip = require('adm-zip');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 3000;



// ============================================
// MIDDLEWARE
// ============================================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Gemini API Key - you can hardcode it here or use .env file
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';

if (!GEMINI_API_KEY) {
console.error(' ERROR: GEMINI_API_KEY is not set');
process.exit(1);
}

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({
storage: storage,
limits: {
fileSize: 10 * 1024 * 1024, // 10MB limit
},
fileFilter: (req, file, cb) => {
const allowedTypes = [
'application/pdf',
'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
'application/zip'
];
if (allowedTypes.includes(file.mimetype)) {
cb(null, true);
} else {
cb(new Error('Invalid file type. Only PDF, DOCX, and ZIP files are allowed.'));
}
}
});

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
* Extract text from PDF buffer
*/
async function extractTextFromPDF(buffer) {
try {
const data = await pdfParse(buffer);
return data.text;
} catch (error) {
console.error('Error extracting PDF text:', error);
throw new Error('Failed to extract text from PDF');
}
}

/**
* Extract text from DOCX buffer
*/
async function extractTextFromDOCX(buffer) {
try {
const result = await mammoth.extractRawText({ buffer: buffer });
return result.value;
} catch (error) {
console.error('Error extracting DOCX text:', error);
throw new Error('Failed to extract text from DOCX');
}
}

/**
* Extract code files from ZIP
*/
function extractCodeFromZIP(buffer) {
try {
const zip = new AdmZip(buffer);
const zipEntries = zip.getEntries();

const codeFiles = [];
const allowedExtensions = [
'.js', '.jsx', '.ts', '.tsx', '.py', '.java', '.cpp', '.c',
'.cs', '.go', '.rb', '.php', '.swift', '.kt', '.rs', '.sql',
'.html', '.css', '.scss', '.json', '.xml', '.yaml', '.yml'
];

zipEntries.forEach(entry => {
if (!entry.isDirectory) {
const fileName = entry.entryName;
const extension = fileName.substring(fileName.lastIndexOf('.')).toLowerCase();

// Check if file has allowed extension and is not too large
if (allowedExtensions.includes(extension) && entry.getData().length < 1024 * 1024) {
try {
const content = entry.getData().toString('utf8');
codeFiles.push({
name: fileName,
extension: extension,
content: content,
size: entry.getData().length
});
} catch (err) {
console.log(`Skipping binary file: ${fileName}`);
}
}
}
});

return codeFiles;
} catch (error) {
console.error('Error extracting ZIP:', error);
throw new Error('Failed to extract code files from ZIP');
}
}

/**
* Analyze code quality and complexity
*/
function analyzeCodeFiles(codeFiles) {
const analysis = {
totalFiles: codeFiles.length,
languages: {},
totalLines: 0,
complexity: {
functions: 0,
classes: 0,
imports: 0,
comments: 0
},
bestPractices: {
hasTests: false,
hasDocumentation: false,
hasTypeChecking: false,
hasLinting: false
}
};

codeFiles.forEach(file => {
const lines = file.content.split('\n');
analysis.totalLines += lines.length;

// Count language usage
const lang = getLanguageFromExtension(file.extension);
analysis.languages[lang] = (analysis.languages[lang] || 0) + 1;

// Analyze content
const content = file.content;

// Function/method detection
analysis.complexity.functions += (content.match(/function\s+\w+|def\s+\w+|func\s+\w+|public\s+\w+\s+\w+\(/g) || []).length;

// Class detection
analysis.complexity.classes += (content.match(/class\s+\w+/g) || []).length;

// Import detection
analysis.complexity.imports += (content.match(/import\s+|from\s+.*import|require\(|#include/g) || []).length;

// Comment detection
analysis.complexity.comments += (content.match(/\/\/|\/\*|\*\/|#|<!--/g) || []).length;

// Best practices detection
if (file.name.includes('test') || file.name.includes('spec')) {
analysis.bestPractices.hasTests = true;
}
if (file.name.includes('README') || file.extension === '.md') {
analysis.bestPractices.hasDocumentation = true;
}
if (file.extension === '.ts' || file.extension === '.tsx') {
analysis.bestPractices.hasTypeChecking = true;
}
if (file.name.includes('eslint') || file.name.includes('prettier')) {
analysis.bestPractices.hasLinting = true;
}
});

return analysis;
}

/**
* Get language name from file extension
*/
function getLanguageFromExtension(ext) {
const langMap = {
'.js': 'JavaScript',
'.jsx': 'JavaScript/React',
'.ts': 'TypeScript',
'.tsx': 'TypeScript/React',
'.py': 'Python',
'.java': 'Java',
'.cpp': 'C++',
'.c': 'C',
'.cs': 'C#',
'.go': 'Go',
'.rb': 'Ruby',
'.php': 'PHP',
'.swift': 'Swift',
'.kt': 'Kotlin',
'.rs': 'Rust',
'.html': 'HTML',
'.css': 'CSS',
'.scss': 'SCSS'
};
return langMap[ext] || 'Other';
}

/**
* Generate detailed analysis using Gemini AI
*/
async function analyzeWithGemini(resumeText, codeAnalysis, codeFiles) {
try {
// Using Gemini 2.0 Flash model (matching your API key)
const model = genAI.getGenerativeModel({
model: "gemini-2.0-flash"
});

// Create a comprehensive prompt
const prompt = `
You are an expert career advisor and technical recruiter analyzing a candidate's resume and coding projects for internship readiness.

RESUME CONTENT:
${resumeText.substring(0, 3000)} ${resumeText.length > 3000 ? '...(truncated)' : ''}

CODE PROJECT ANALYSIS:
- Total Files: ${codeAnalysis.totalFiles}
- Total Lines of Code: ${codeAnalysis.totalLines}
- Languages Used: ${Object.keys(codeAnalysis.languages).join(', ')}
- Functions/Methods: ${codeAnalysis.complexity.functions}
- Classes: ${codeAnalysis.complexity.classes}
- Has Tests: ${codeAnalysis.bestPractices.hasTests}
- Has Documentation: ${codeAnalysis.bestPractices.hasDocumentation}
- Uses TypeScript: ${codeAnalysis.bestPractices.hasTypeChecking}

CODE SAMPLES (First 3 files):
${codeFiles.slice(0, 3).map(f => `
FILE: ${f.name}
${f.content.substring(0, 500)}...
`).join('\n---\n')}

Please provide a comprehensive analysis in the following JSON format (respond ONLY with valid JSON, no markdown formatting):

{
"overallScore": <number 0-100>,
"scoreBreakdown": {
"technicalSkills": <number 0-100>,
"codeQuality": <number 0-100>,
"projectComplexity": <number 0-100>,
"resumeQuality": <number 0-100>,
"marketReadiness": <number 0-100>
},
"summary": "<2-3 sentence overall assessment>",
"strengths": [
"<specific strength 1>",
"<specific strength 2>",
"<specific strength 3>",
"<specific strength 4>",
"<specific strength 5>"
],
"improvements": [
"<actionable improvement 1>",
"<actionable improvement 2>",
"<actionable improvement 3>",
"<actionable improvement 4>",
"<actionable improvement 5>"
],
"detectedSkills": {
"technical": [
{"name": "JavaScript", "level": "Intermediate", "confidence": 85},
{"name": "React", "level": "Beginner", "confidence": 60}
],
"soft": [
"Problem Solving", "Team Collaboration", "Communication"
]
},
"skillGaps": [
{
"skill": "Testing",
"importance": "High",
"reason": "No test files found in projects",
"practiceRole": "software"
}
],
"recommendedSkills": [
{
"name": "TypeScript",
"priority": "High",
"estimatedTime": "2-3 weeks",
"practiceRole": "software",
"reason": "Will improve code quality and marketability"
}
],
"codeQualityInsights": {
"positives": ["Good code organization", "Uses modern frameworks"],
"concerns": ["Lack of comments", "No error handling"],
"suggestions": ["Add unit tests", "Implement proper error handling"]
},
"resumeInsights": {
"formatting": "Well structured with clear sections",
"content": "Good technical skills listed",
"impact": "Could use more quantifiable achievements",
"suggestions": ["Add metrics to achievements", "Include more project details"]
},
"careerReadiness": {
"internshipReady": true,
"targetRoles": ["Frontend Developer", "Full Stack Developer"],
"estimatedPreparationTime": "2-4 weeks",
"nextSteps": ["Build a portfolio project", "Practice coding interviews", "Network on LinkedIn"]
}
}

Be specific, actionable, and honest. Focus on helping the candidate improve and succeed.
`;

const result = await model.generateContent(prompt);
const response = await result.response;
const text = response.text();

// Clean up the response - remove markdown code blocks if present
let cleanedText = text.trim();
if (cleanedText.startsWith('```json')) {
cleanedText = cleanedText.substring(7);
}
if (cleanedText.startsWith('```')) {
cleanedText = cleanedText.substring(3);
}
if (cleanedText.endsWith('```')) {
cleanedText = cleanedText.substring(0, cleanedText.length - 3);
}
cleanedText = cleanedText.trim();

const analysis = JSON.parse(cleanedText);
return analysis;
} catch (error) {
console.error('Error analyzing with Gemini:', error);
throw new Error('Failed to generate AI analysis: ' + error.message);
}
}

// ============================================
// API ENDPOINTS
// ============================================

/**
* Health check endpoint
*/
app.get('/api/health', (req, res) => {
res.json({
status: 'ok',
message: 'Resume Analyzer API is running',
geminiConfigured: !!GEMINI_API_KEY,
geminiModel: 'gemini-2.0-flash',
timestamp: new Date().toISOString()
});
});

/**
* Main analysis endpoint
*/
app.post('/api/analyze',
upload.fields([
{ name: 'resume', maxCount: 1 },
{ name: 'code', maxCount: 1 }
]),
async (req, res) => {
console.log('\n===  ANALYZE REQUEST RECEIVED ===');
console.log('Time:', new Date().toISOString());
console.log('Files:', req.files);

try {
// Validate files
if (!req.files || !req.files.resume || !req.files.code) {
console.log(' Missing files!');
return res.status(400).json({
error: 'Both resume and code files are required',
received: {
resume: !!req.files?.resume,
code: !!req.files?.code
}
});
}

const resumeFile = req.files.resume[0];
const codeFile = req.files.code[0];

console.log('✓ Resume:', resumeFile.originalname, resumeFile.mimetype, resumeFile.size, 'bytes');
console.log('✓ Code:', codeFile.originalname, codeFile.mimetype, codeFile.size, 'bytes');

// Extract resume text
console.log('📄 Extracting resume text...');
let resumeText;
if (resumeFile.mimetype === 'application/pdf') {
resumeText = await extractTextFromPDF(resumeFile.buffer);
} else if (resumeFile.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
resumeText = await extractTextFromDOCX(resumeFile.buffer);
} else {
throw new Error('Unsupported resume file type: ' + resumeFile.mimetype);
}

console.log('✓ Resume text extracted:', resumeText.length, 'characters');

if (!resumeText || resumeText.trim().length < 50) {
return res.status(400).json({
error: 'Resume text too short or extraction failed',
extractedLength: resumeText?.length || 0
});
}

// Extract code files
console.log('Extracting code from ZIP...');
if (codeFile.mimetype !== 'application/zip') {
throw new Error('Code file must be a ZIP archive');
}

const codeFiles = extractCodeFromZIP(codeFile.buffer);
console.log('✓ Extracted', codeFiles.length, 'code files');

if (codeFiles.length === 0) {
return res.status(400).json({
error: 'No valid code files found in ZIP',
hint: 'Make sure your ZIP contains code files with extensions like .js, .py, .java, etc.'
});
}

// Analyze code files
console.log('🔍 Analyzing code structure...');
const codeAnalysis = analyzeCodeFiles(codeFiles);
console.log('✓ Code analysis complete');

// Get AI analysis
console.log(' Calling Gemini API...');
const aiAnalysis = await analyzeWithGemini(resumeText, codeAnalysis, codeFiles);
console.log(' AI analysis complete!');

// Combine all analysis
const finalAnalysis = {
...aiAnalysis,
metadata: {
resumeFileName: resumeFile.originalname,
codeFileName: codeFile.originalname,
analyzedAt: new Date().toISOString(),
codeStats: {
totalFiles: codeAnalysis.totalFiles,
totalLines: codeAnalysis.totalLines,
languages: codeAnalysis.languages
}
}
};

console.log(' Sending response...');
res.json({
success: true,
analysis: finalAnalysis
});
console.log(' Response sent successfully!\n');

} catch (error) {
console.error(' ERROR:', error.message);
console.error(error.stack);
res.status(500).json({
error: 'Analysis failed',
message: error.message,
hint: 'Check server logs for details'
});
}
}
);

// ============================================
// ERROR HANDLING
// ============================================

app.use((error, req, res, next) => {
console.error('Server error:', error);
res.status(500).json({
error: 'Internal server error',
message: error.message
});
});

// ============================================
// START SERVER
// ============================================

app.listen(PORT, () => {
console.log('\n ========================================');
console.log(' InternHub Resume Analyzer API');
console.log('========================================');
console.log(`Server running on port ${PORT}`);
console.log(`Health check: http://localhost:${PORT}/api/health`);
console.log(`Gemini API: ${GEMINI_API_KEY ? 'Configured ✓' : 'NOT CONFIGURED '}`);
console.log(` Model: gemini-2.0-flash`);
console.log('========================================\n');
console.log('Ready to analyze resumes! \n');
});

module.exports = app;
