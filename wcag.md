# ✅ WCAG 2.1 AA Accessibility Checklist (Developer-Focused)

Covers the major points for accessible frontends with semantic HTML, ARIA, focus management, and contrast.

---

## ✅ Covered by You

### 1. Semantic HTML
- Use native elements (`<button>`, `<nav>`, `<header>`, etc.)
- Avoid unnecessary `div`/`span` "div soup"
- ✅ WCAG: [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships.html)

### 2. ARIA Attributes (used correctly)
- Use `aria-*` to supplement where native semantics fall short
- Avoid redundant or conflicting ARIA
- ✅ WCAG: [4.1.2 Name, Role, Value](https://www.w3.org/WAI/WCAG21/Understanding/name-role-value.html)

### 3. Keyboard Navigation
- All interactive elements reachable with `Tab`
- Logical tab order
- ✅ WCAG: [2.1.1 Keyboard](https://www.w3.org/WAI/WCAG21/Understanding/keyboard.html)

### 4. Focus Styles
- Visible focus indicator (outline, shadow, etc.)
- ✅ WCAG: [2.4.7 Focus Visible](https://www.w3.org/WAI/WCAG21/Understanding/focus-visible.html)

### 5. Color Contrast
- Minimum 4.5:1 for text
- Minimum 3:1 for UI components (borders, icons)
- ✅ WCAG: 
  - [1.4.3 Contrast (Minimum)](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)
  - [1.4.11 Non-text Contrast](https://www.w3.org/WAI/WCAG21/Understanding/non-text-contrast.html)

---

## 🧩 Additional Key Checkpoints to Include

### 6. Text Alternatives
- All images have `alt` attributes
- Audio/video have captions or transcripts
- ✅ WCAG: [1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG21/Understanding/non-text-content.html)

### 7. Form Errors
- Inputs indicate errors (`aria-invalid`, visible text)
- Helpful error messages (consider `aria-describedby`)
- ✅ WCAG: 
  - [3.3.1 Error Identification](https://www.w3.org/WAI/WCAG21/Understanding/error-identification.html)
  - [3.3.3 Error Suggestion](https://www.w3.org/WAI/WCAG21/Understanding/error-suggestion.html)

### 8. Resize Text / Zoom
- Content readable at 200% zoom without loss of layout
- ✅ WCAG: [1.4.4 Resize Text](https://www.w3.org/WAI/WCAG21/Understanding/resize-text.html)

### 9. Page Titles and Headings
- Use meaningful `<title>` and structured `<h1>`–`<h6>`
- ✅ WCAG: 
  - [2.4.2 Page Titled](https://www.w3.org/WAI/WCAG21/Understanding/page-titled.html)
  - [2.4.6 Headings and Labels](https://www.w3.org/WAI/WCAG21/Understanding/headings-and-labels.html)

### 10. Language Settings
- Set `<html lang="en">` (or appropriate language)
- ✅ WCAG: [3.1.1 Language of Page](https://www.w3.org/WAI/WCAG21/Understanding/language-of-page.html)

### 11. Skip Links / Landmarks
- Use skip links or semantic landmarks: `<main>`, `<nav>`, etc.
- ✅ WCAG: [2.4.1 Bypass Blocks](https://www.w3.org/WAI/WCAG21/Understanding/bypass-blocks.html)

### 12. Color Is Not the Only Cue
- Don’t rely on color alone to convey meaning
- ✅ WCAG: [1.4.1 Use of Color](https://www.w3.org/WAI/WCAG21/Understanding/use-of-color.html)

---

## 🧪 Bonus: Testing Tips

- ✅ Use screen readers (VoiceOver, NVDA, JAWS)
- ✅ Keyboard-only navigation check
- ✅ Use automated tools (axe, Lighthouse) + manual review
- ✅ Review on mobile (for WCAG 2.1 mobile relevance)

---

## Resources
- [WCAG Quick Reference](https://www.w3.org/WAI/WCAG21/quickref/)
- [Deque's axe DevTools](https://www.deque.com/axe/devtools/)
- [WAVE Evaluation Tool](https://wave.webaim.org/)

