import * as pdfjsLib from 'pdfjs-dist';
import mammoth from 'mammoth';
import { SKILLS_DICTIONARY } from './skillsDictionary';

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const extractTextFromPDF = async (file) => {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  let text = '';
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    text += content.items.map((item) => item.str).join(' ');
  }
  return text;
};

const extractTextFromDOCX = async (file) => {
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer });
  return result.value;
};

const extractSkills = (text) => {
  const lowerText = text.toLowerCase();
  const foundSkills = new Set();
  SKILLS_DICTIONARY.forEach((skill) => {
    const skillRegex = new RegExp(`\\b${skill.toLowerCase()}\\b`, 'gi');
    if (skillRegex.test(lowerText)) foundSkills.add(skill);
  });
  return Array.from(foundSkills);
};

const extractExperienceYears = (text) => {
  const experienceRegex = /(\\d+)\\+?\\s*years?(?:\\s+of)?\\s+(?:experience|exp|work)/gi;
  const matches = text.match(experienceRegex);
  if (matches) {
    const years = matches[0].match(/(\\d+)/)[1];
    return parseInt(years, 10);
  }
  return 0;
};

const extractEducation = (text) => {
  const lowerText = text.toLowerCase();
  if (/\\b(ph\\.?d|phd)\\b/.test(lowerText)) return 'phd';
  if (/\\b(master|m\\.?tech|m\\.tech|mba)\\b/.test(lowerText)) return 'master';
  if (/\\b(bachelor|b\\.?tech|b\\.e|b\\.sc|b\\.a)\\b/.test(lowerText)) return 'bachelor';
  if (/\\b(diploma|12th|high school|high-school|secondary)\\b/.test(lowerText)) return 'high_school';
  return 'unknown';
};

const extractJobTitles = (text) => {
  const titleKeywords = ['Engineer', 'Developer', 'Designer', 'Manager', 'Analyst', 'Intern', 'Consultant', 'Architect', 'Lead', 'Senior', 'Junior'];
  const foundTitles = new Set();
  const lowerText = text.toLowerCase();
  titleKeywords.forEach((title) => {
    if (lowerText.includes(title.toLowerCase())) foundTitles.add(title);
  });
  return Array.from(foundTitles);
};

export const parseResume = async (file) => {
  let rawText = '';
  if (file.type === 'application/pdf') {
    rawText = await extractTextFromPDF(file);
  } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
    rawText = await extractTextFromDOCX(file);
  } else {
    throw new Error('Unsupported file type. Please upload a PDF or DOCX file.');
  }
  const skills = extractSkills(rawText);
  const experienceYears = extractExperienceYears(rawText);
  const education = extractEducation(rawText);
  const jobTitles = extractJobTitles(rawText);
  return { skills, experienceYears, education, jobTitles, rawText };
};
