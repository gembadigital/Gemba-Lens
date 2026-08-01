import { jsPDF } from 'jspdf';

// Extremely stable primary and secondary fallback URLs for Unicode (Turkish) supported TrueType fonts
const PRIMARY_REGULAR = 'https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Mu4mxK.ttf';
const PRIMARY_BOLD = 'https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmWUlfBBc4.ttf';

const FALLBACK_REGULAR = 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf';
const FALLBACK_BOLD = 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Medium.ttf';

/**
 * Fetches a binary font file from a URL and converts it to a base64 string
 */
async function fetchFontBase64(url: string): Promise<string> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch font from ${url}: ${response.statusText}`);
  }
  const arrayBuffer = await response.arrayBuffer();
  const bytes = new Uint8Array(arrayBuffer);
  
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

/**
 * Loads Unicode-compatible TrueType Fonts (Roboto) into jsPDF's Virtual File System
 * to enable perfect rendering of Turkish characters without errors.
 */
export async function loadUnicodeFonts(doc: jsPDF): Promise<boolean> {
  let regularBase64 = '';
  let boldBase64 = '';

  // 1. Try to fetch regular font
  try {
    regularBase64 = await fetchFontBase64(PRIMARY_REGULAR);
  } catch (err) {
    console.warn('Primary regular font fetch failed, trying fallback...', err);
    try {
      regularBase64 = await fetchFontBase64(FALLBACK_REGULAR);
    } catch (fallbackErr) {
      console.error('All regular font fetches failed', fallbackErr);
    }
  }

  // 2. Try to fetch bold font
  try {
    boldBase64 = await fetchFontBase64(PRIMARY_BOLD);
  } catch (err) {
    console.warn('Primary bold font fetch failed, trying fallback...', err);
    try {
      boldBase64 = await fetchFontBase64(FALLBACK_BOLD);
    } catch (fallbackErr) {
      console.error('All bold font fetches failed', fallbackErr);
    }
  }

  // 3. Register fonts if successfully fetched
  if (regularBase64) {
    try {
      doc.addFileToVFS('Roboto-Regular.ttf', regularBase64);
      doc.addFont('Roboto-Regular.ttf', 'Roboto', 'normal');
      console.log('Successfully registered Roboto-Regular font');
    } catch (err) {
      console.error('Error registering Roboto-Regular in jsPDF', err);
    }
  }

  if (boldBase64) {
    try {
      doc.addFileToVFS('Roboto-Bold.ttf', boldBase64);
      doc.addFont('Roboto-Bold.ttf', 'Roboto', 'bold');
      console.log('Successfully registered Roboto-Bold font');
    } catch (err) {
      console.error('Error registering Roboto-Bold in jsPDF', err);
    }
  }

  // Return true if at least the regular font was loaded successfully
  return !!regularBase64;
}
