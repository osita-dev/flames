/**
 * Monetag CPM Ad Configuration
 * 
 * HOW TO USE:
 * 1. Log into your Monetag dashboard
 * 2. Get your embed code (script tag or iframe)
 * 3. Paste it below as the MONETAG_EMBED_CODE value
 * 
 * Example formats:
 * - Script: '<script src="https://monetag.com/your-code.js"></script>'
 * - Iframe: '<iframe src="https://monetag.com/embed/xyz" ...></iframe>'
 * 
 * The ad will automatically appear across all game phases:
 * - Input phase (compact banner)
 * - Processing/counting phase (compact banner)
 * - Result phase (inline banner)
 * - Footer (always visible)
 */

// ===========================================
// PASTE YOUR MONETAG EMBED CODE HERE
// ===========================================
export const MONETAG_EMBED_CODE = `
<script>
(function () {
  if (window.__monetagInPagePushLoaded) return;
  window.__monetagInPagePushLoaded = true;

  (function(s){
    s.dataset.zone = '10476453';
    s.src = 'https://nap5k.com/tag.min.js';
  })([document.documentElement, document.body]
    .filter(Boolean)
    .pop()
    .appendChild(document.createElement('script')));
})();
</script>
`;

// ===========================================

/**
 * Ad placement configuration
 * Adjust these if you want to enable/disable ads on specific phases
 */
export const AD_PLACEMENTS = {
  inputPhase: true,      // Show ad during name input
  processingPhase: true, // Show ad during letter counting
  resultPhase: true,     // Show ad on result reveal
  footer: true,          // Always-visible footer ad
} as const;
