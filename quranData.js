<!DOCTYPE html>
<html lang="ar">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>القرآن الكريم</title>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
<script src="https://telegram.org/js/telegram-web-app.js"></script>
<style>
  body {
    font-family: 'Arial', sans-serif;
    background: #F4E4C1;
    color: #000;
    padding: 120px 20px 20px 20px;
    text-align: center;
    direction: rtl;
    transition: background 0.3s, color 0.3s;
    max-width: 1000px;  
    margin: 0 auto;      
    box-sizing: border-box;
    overflow-x: hidden; 
  }
  body.dark { background: #121212; color: #f0f0f0; }

  #progressBarContainer {
    position: fixed;
    top: 0; left: 0; width: 100%; height: 6px;
    background: #ddd; z-index: 9999;
  }
  body.dark #progressBarContainer { background: #333; }
  #progressBar { height: 100%; width: 0; background: green; transition: width 0.2s ease; }

  #header {
    position: fixed; top: 6px; left: 0; right: 0;
    margin: 0 auto; width: 100%; max-width: 1000px;
    padding: 10px 20px; background: #F4E4C1; z-index: 1000;
    display: flex; justify-content: space-between; align-items: flex-start;
    box-sizing: border-box; direction: ltr;
  }
  body.dark #header { background: #121212; }

  #leftSide, #rightSide { display: flex; flex-direction: column; gap: 10px; }
  #leftSide { align-items: flex-start; }
  #rightSide { align-items: flex-end; }
  
  #navButtons, #buttonsContainer { display: flex; gap: 6px; }
  #navButtons button, #buttonsContainer button {
  padding: 6px 14px;
  font-size: 18px;
  border: none;
  border-radius: 999px; /* fully rounded */
  cursor: pointer;
  background: #e0e0e0;
  color: #000;
  transition: background 0.3s, color 0.3s;
  }
  body.dark #navButtons button, body.dark #buttonsContainer button { background: #333; color: #f0f0f0; }

  .dropdown-container { position: relative; display: inline-block; }
  .dropdown-button {
  padding: 6px 16px;
  font-size: 16px;
  border-radius: 999px;
  border: 1px solid #aaa;
  background: #fff;
  min-width: 120px;
  cursor: pointer;
  transition: background 0.3s, color 0.3s, border-color 0.3s;
  }
  body.dark .dropdown-button { background:#222; color:#f0f0f0; border-color:#555; }

  .dropdown-options {
  position: fixed;
  background: #fff;
  border: 1px solid #aaa;
  border-radius: 16px;   /* more rounded */
  max-height: 300px;
  overflow-y: auto;
  z-index: 10000;
  display: none;
  min-width: 150px;
  padding: 6px 0;       /* spacing inside */
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  }
  .dropdown-options > div {
  border-radius: 12px;
  margin: 2px 8px;
  cursor: pointer;
  transition: background 0.2s;
  }
  .dropdown-options > div {
  padding: 6px 10px;
  background: transparent;
  }

 .dropdown-options > div:hover {
  background: #f0f0f0;
  }

  body.dark .dropdown-options > div:hover {
  background: #2a2a2a;
  }

  /* WebKit (Chrome, Edge, Safari) */
  .dropdown-options::-webkit-scrollbar {
  width: 8px;
  }

  .dropdown-options::-webkit-scrollbar-track {
  background: transparent;
  }

  .dropdown-options::-webkit-scrollbar-thumb {
  background-color: green;
  border-radius: 8px;
  }

  .dropdown-options::-webkit-scrollbar-thumb:hover {
  background-color: #0f9d58;
  }

  /* Firefox */
  .dropdown-options {
  scrollbar-width: thin;
  scrollbar-color: green transparent;
  }

  /* Dark mode */
  body.dark .dropdown-options::-webkit-scrollbar-thumb {
  background-color: #4ade80;
  }

  /* Remove scrollbar arrows (WebKit) */
  .dropdown-options::-webkit-scrollbar-button {
  display: none;
  width: 0;
  height: 0;
  }
  body.dark .dropdown-options { background:#222; color:#f0f0f0; }

  h1#surahName { font-size: 40px; margin: 5px 0; }
  .bismillah { font-size: 26px; font-weight: bold; color: #555; margin: 5px 0 20px 0; }
  body.dark .bismillah { color:#ccc; }
  body.not-first-page #surahName, body.not-first-page .bismillah { display: none; }

  #versesContainer { 
    max-width: 100%; margin: 0 auto; line-height: 2;
    position: relative; 
    will-change: transform, opacity, filter;
    transform-origin: center;
    user-select: none; 
    transition: transform 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  .verse { font-size: 24px; margin: 12px 0; display: inline; position: relative; }
  .verse-number { color: green; font-weight: bold; margin-left: 8px; cursor: pointer; display: inline-block; }
  body.dark .verse-number { color: #4ade80; }

  .popover {
    max-width: 400px;
    text-align: left;
  }
  
  .popover-header {
    position: sticky !important;
    top: 0 !important;
    z-index: 10 !important;
    background: #fff !important;
  }
  
  .popover-body {
    max-height: 250px !important;
    overflow-y: auto !important;
    overflow-x: hidden !important;
  }
  
  .close-popover {
    cursor: pointer !important;
    float: right !important;
    font-weight: bold !important;
    color: green !important;
    font-size: 24px !important;
    line-height: 1 !important;
    margin-left: 10px !important;
  }

  /* Green scrollbar for popover body */
    .popover-body::-webkit-scrollbar {
    width: 8px;
    }

    .popover-body::-webkit-scrollbar-track {
    background: transparent;
    }

    .popover-body::-webkit-scrollbar-thumb {
    background-color: green;
    border-radius: 8px;
    }

    .popover-body::-webkit-scrollbar-thumb:hover {
    background-color: #0f9d58;
    }

    /* Firefox */
    .popover-body {
    scrollbar-width: thin;
    scrollbar-color: green transparent;
    }

    /* Dark mode tweak */
    body.dark .popover-body::-webkit-scrollbar-thumb {
    background-color: #4ade80;
    }

  
  body.dark .popover { background:#1e1e1e; color:#f0f0f0; border-color:#444; }
  body.dark .popover-header { background:#2a2a2a !important; color:#f0f0f0; border-bottom-color:#444; }
  body.dark .popover-body { background:#1e1e1e; color:#f0f0f0; }
  body.dark .close-popover { color: #4ade80 !important; }

  @keyframes flipFastLeft { 
    0% { transform: perspective(1000px) rotateY(0deg); opacity: 1; filter: blur(0px); } 
    50% { transform: perspective(1000px) rotateY(45deg); opacity: 0.5; filter: blur(2px); } 
    100% { transform: perspective(1000px) rotateY(0deg); opacity: 1; filter: blur(0px); } 
  }
  @keyframes flipFastRight { 
    0% { transform: perspective(1000px) rotateY(0deg); opacity: 1; filter: blur(0px); } 
    50% { transform: perspective(1000px) rotateY(-45deg); opacity: 0.5; filter: blur(2px); } 
    100% { transform: perspective(1000px) rotateY(0deg); opacity: 1; filter: blur(0px); } 
  }
  
  .flipping-forward { animation: flipFastLeft 0.22s cubic-bezier(0.4, 0, 0.2, 1); }
  .flipping-backward { animation: flipFastRight 0.22s cubic-bezier(0.4, 0, 0.2, 1); }

  @media (max-width: 500px) {
    h1#surahName { font-size: 32px; }
    .verse { font-size: 20px; }
    .popover { max-width: 280px; }
    .popover-body { max-height: 200px; }
  }

  #fontDecrease,
  #fontIncrease {
  min-width: 45px;   /* increase width */
  padding-left: 0;
  padding-right: 0;
  text-align: center;
 }
</style>
</head>
<body>

<div id="progressBarContainer"><div id="progressBar"></div></div>

<div id="header">
  <div id="leftSide">
    <div class="dropdown-container">
      <div class="dropdown-button" id="surahSelectButton">1. الأعلى ▼</div>
      <div class="dropdown-options" id="surahSelectOptions"></div>
    </div>
    <div class="dropdown-container">
      <div class="dropdown-button" id="pageSelectButton">Page 1 ▼</div>
      <div class="dropdown-options" id="pageSelectOptions"></div>
    </div>
  </div>

  <div id="rightSide">
    <div id="buttonsContainer">
      <button id="fontDecrease">−</button>
      <button id="fontIncrease">+</button>
      <button id="themeBtn">🌙</button>
    </div>
    <div id="navButtons">
      <button id="nextPage">◀</button>
      <button id="prevPage">▶</button> 
    </div>
  </div>
</div>

<h1 id="surahName">الأعلى</h1>
<div class="bismillah">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</div>

<div id="versesContainer"></div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
<script src="quranData.js"></script>

<script>

const maxVersesPerPage = 10;
let currentSurahIndex = 0;
let currentPage = 0;
let currentFontSize = 24;
let pages = [];
let totalPages = 0;
let activePopover = null;

const versesContainer = document.getElementById('versesContainer');
const surahSelectButton = document.getElementById('surahSelectButton');
const surahSelectOptions = document.getElementById('surahSelectOptions');
const pageSelectButton = document.getElementById('pageSelectButton');
const pageSelectOptions = document.getElementById('pageSelectOptions');

let startX = 0, isDragging = false;
const minSwipeDist = 85;

function initSurahDropdown() {
  surahSelectOptions.innerHTML = '';
  quranData.surahs.forEach((surah, index) => {
    const option = document.createElement('div');
    option.style.padding = "8px 12px";
    option.textContent = `${surah.number}. ${surah.name}`;
    option.addEventListener('click', () => { 
      loadSurah(index, 0, 'forward'); 
      surahSelectOptions.style.display = 'none'; 
    });
    surahSelectOptions.appendChild(option);
  });
}

function updateURL(surahNum, pageNum) {
  const newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + `?surah=${surahNum}&page=${pageNum + 1}`;
  window.history.replaceState({path: newurl}, '', newurl);
}

function loadSurah(surahIndex, pageIndex = 0, direction = 'none') {
  currentSurahIndex = surahIndex;
  const surah = quranData.surahs[surahIndex];
  
  document.getElementById('surahName').textContent = surah.name;
  surahSelectButton.textContent = `${surah.number}. ${surah.name} ▼`;
  
  totalPages = Math.ceil(surah.verses.length / maxVersesPerPage);
  pages = [];
  for(let i = 0; i < totalPages; i++) pages.push(surah.verses.slice(i * maxVersesPerPage, (i + 1) * maxVersesPerPage));
  initPageDropdown();
  
  const targetPage = pageIndex === 'last' ? totalPages - 1 : Math.min(pageIndex, totalPages - 1);
  goToPage(targetPage, direction);
}

function initPageDropdown() {
  pageSelectOptions.innerHTML = '';
  for(let i = 0; i < totalPages; i++) {
    const option = document.createElement('div');
    option.style.padding = "8px 12px";
    option.textContent = "Page " + (i + 1);
    option.addEventListener('click', () => { 
      const direction = i > currentPage ? 'forward' : 'backward';
      goToPage(i, direction); 
      pageSelectOptions.style.display = 'none'; 
    });
    pageSelectOptions.appendChild(option);
  }
}

function displayVerses(pageIndex) {
  versesContainer.innerHTML = "";
  
  const transDir = quranData.surahs[currentSurahIndex].translation_dir || 'ltr';
  
  // --- FONT CALCULATION ---
  const defaultArabicSize = 24;
  const defaultPopoverSize = 14; // Reduced from 16 to 14
  let popoverFontSize = defaultPopoverSize;

  // Only increase if user clicked '+' and Arabic is > 24
  if (currentFontSize > defaultArabicSize) {
    popoverFontSize = defaultPopoverSize + (currentFontSize - defaultArabicSize);
  }
  
  // Safety cap (min 14, max 35)
  popoverFontSize = Math.max(14, Math.min(35, popoverFontSize));
  // ------------------------

  pages[pageIndex].forEach((verse, idx) => {
    const verseNum = pageIndex * maxVersesPerPage + idx + 1;
    const verseDiv = document.createElement('div');
    verseDiv.className = "verse";
    verseDiv.style.fontSize = currentFontSize + "px";
    
    // Styled translation with the calculated size
    const styledTranslation = `<span style="font-size: ${popoverFontSize}px; line-height: 1.5; display: block;">${verse.translation.replace(/"/g, '&quot;')}</span>`;
    
    verseDiv.innerHTML = `
      ${verse.arabic} <span class="verse-number" data-bs-toggle="popover" 
        data-bs-trigger="click" data-bs-placement="auto" 
        data-bs-content='${styledTranslation}' 
        data-index="${verseNum}">[${verseNum}]</span>
    `;
    versesContainer.appendChild(verseDiv);
  });

  // Re-initialize Popovers
  document.querySelectorAll('[data-bs-toggle="popover"]').forEach(el => {
    const popover = new bootstrap.Popover(el, {
      html: true, 
      sanitize: false, 
      container: 'body',
      template: `
        <div class="popover" role="tooltip" style="direction: ${transDir}; text-align: ${transDir === 'rtl' ? 'right' : 'left'};">
          <div class="popover-arrow"></div>
          <h3 class="popover-header" style="padding: 8px 12px;">
            <span class="close-popover" style="float: ${transDir === 'rtl' ? 'left' : 'right'} !important;">×</span>
            <span style="font-size: 13px; font-weight: bold; opacity: 0.8;">Translation</span>
          </h3>
          <div class="popover-body" style="direction: ${transDir}; padding: 12px;"></div>
        </div>`
    });
    
    el.addEventListener('shown.bs.popover', function () {
      if (activePopover && activePopover !== popover) {
        activePopover.hide();
      }
      activePopover = popover;
      
      setTimeout(() => {
        const closeBtn = document.querySelector('.popover.show .close-popover');
        if (closeBtn) {
          closeBtn.onclick = (e) => {
            e.stopPropagation();
            popover.hide();
            activePopover = null;
          };
        }
      }, 50);
    });
  });
}

function goToPage(pageIndex, direction = 'none') {
  // Hide any active popover
  if (activePopover) {
    activePopover.hide();
    activePopover = null;
  }
  
  if(pageIndex < 0) {
    currentSurahIndex > 0 ? loadSurah(currentSurahIndex - 1, 'last', direction) : loadSurah(quranData.surahs.length - 1, 'last', direction);
    return;
  }
  if(pageIndex >= totalPages) {
    currentSurahIndex < quranData.surahs.length - 1 ? loadSurah(currentSurahIndex + 1, 0, direction) : loadSurah(0, 0, direction);
    return;
  }
  
  versesContainer.classList.remove('flipping-forward', 'flipping-backward');
  void versesContainer.offsetWidth; 
  if(direction === 'forward') versesContainer.classList.add('flipping-forward');
  else if(direction === 'backward') versesContainer.classList.add('flipping-backward');

  setTimeout(() => {
    currentPage = pageIndex;
    displayVerses(pageIndex);
    updateProgressBar();
    
    pageSelectButton.textContent = "Page " + (currentPage + 1) + " ▼";
    document.body.classList.toggle('not-first-page', currentPage !== 0);

    updateURL(quranData.surahs[currentSurahIndex].number, currentPage);
  }, direction === 'none' ? 0 : 110);
}

function updateProgressBar() {
  document.getElementById('progressBar').style.width = ((currentPage + 1) / totalPages * 100) + "%";
}

function updateZoom(newSize) {
  // Hide active popover so it recreates with new size next time it's clicked
  if (activePopover) {
    activePopover.hide();
    activePopover = null;
  }
  
  currentFontSize = newSize;
  document.documentElement.style.setProperty('--current-font-size', currentFontSize);
  displayVerses(currentPage);
}

document.getElementById('fontIncrease').onclick = () => { 
  if(currentFontSize < 45) updateZoom(currentFontSize + 2); 
};
document.getElementById('fontDecrease').onclick = () => { 
  if(currentFontSize > 14) updateZoom(currentFontSize - 2); 
};

document.addEventListener('keydown', (e) => {
  const isPopoverOpen = !!document.querySelector('.popover.show');
  if (isPopoverOpen) return;

  if (e.key === "ArrowRight") {
    goToPage(currentPage - 1, 'backward');
  } else if (e.key === "ArrowLeft") {
    goToPage(currentPage + 1, 'forward');
  }
});

function handleStart(e, x) { 
  if (e.target.closest('.popover') || e.target.closest('#header')) { isDragging = false; return; }
  startX = x; isDragging = true; 
}
function handleMove(x) {
  if (!isDragging) return;
  const diff = x - startX;
  versesContainer.style.transform = `perspective(1000px) rotateY(${(diff / window.innerWidth) * -15}deg)`;
}
function handleEnd(x) {
  if (!isDragging) return;
  isDragging = false;
  versesContainer.style.transform = '';
  const diff = x - startX;
  if (Math.abs(diff) > minSwipeDist) {
    diff > 0 ? goToPage(currentPage + 1, 'forward') : goToPage(currentPage - 1, 'backward');
  }
}

document.addEventListener('touchstart', e => handleStart(e, e.touches[0].clientX), {passive: true});
document.addEventListener('touchmove', e => handleMove(e.touches[0].clientX), {passive: true});
document.addEventListener('touchend', e => handleEnd(e.changedTouches[0].clientX));
document.addEventListener('mousedown', e => handleStart(e, e.clientX));
document.addEventListener('mousemove', e => handleMove(e.clientX));
document.addEventListener('mouseup', e => handleEnd(e.clientX));

document.getElementById('nextPage').onclick = () => goToPage(currentPage + 1, 'forward');
document.getElementById('prevPage').onclick = () => goToPage(currentPage - 1, 'backward');

surahSelectButton.onclick = (e) => { 
  e.stopPropagation(); 
  pageSelectOptions.style.display = 'none'; // Close page dropdown
  surahSelectOptions.style.display = surahSelectOptions.style.display === 'block' ? 'none' : 'block';
};

pageSelectButton.onclick = (e) => { 
  e.stopPropagation(); 
  surahSelectOptions.style.display = 'none'; // Close surah dropdown
  pageSelectOptions.style.display = pageSelectOptions.style.display === 'block' ? 'none' : 'block';
};

document.addEventListener('click', (e) => {
  if (!e.target.closest('.popover') && !e.target.closest('[data-bs-toggle="popover"]')) {
    if (activePopover) {
      activePopover.hide();
      activePopover = null;
    }
  }
  surahSelectOptions.style.display = 'none'; 
  pageSelectOptions.style.display = 'none';
});

document.getElementById('themeBtn').onclick = () => {
  document.body.classList.toggle('dark');
  document.getElementById('themeBtn').textContent = document.body.classList.contains('dark') ? "☀️" : "🌙";
};

function initFromURL() {
  const params = new URLSearchParams(window.location.search);
  const surahNum = parseInt(params.get('surah'));
  const pageNum = parseInt(params.get('page'));

  let sIndex = 0;
  let pIndex = 0;

  if (!isNaN(surahNum)) {
    const foundIndex = quranData.surahs.findIndex(s => s.number === surahNum);
    if (foundIndex !== -1) sIndex = foundIndex;
  }

  if (!isNaN(pageNum)) {
    pIndex = pageNum - 1;
  }

  initSurahDropdown();
  loadSurah(sIndex, pIndex);
  document.documentElement.style.setProperty('--current-font-size', currentFontSize);
}

initFromURL();

</script>

</body>
</html>
