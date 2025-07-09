const card = document.getElementById('card');
const profileImage = document.getElementById('profileImage');
const nameField = document.getElementById('name');
const bioField = document.getElementById('bio');
const contactField = document.getElementById('contact');
const nameInput = document.getElementById('nameInput');
const bioInput = document.getElementById('bioInput');
const contactInput = document.getElementById('contactInput');
const imageUpload = document.getElementById('imageUpload');
const addStickerBtn = document.getElementById('addSticker');
const resetBtn = document.getElementById('reset');
const downloadBtn = document.getElementById('download');
let defaultCardHTML;

window.addEventListener('DOMContentLoaded', () => {
  defaultCardHTML = card.innerHTML;
});

function makeDraggable(el) {
  let offsetX, offsetY;
  el.addEventListener('mousedown', startDrag);
  function startDrag(e) {
    offsetX = e.clientX - el.offsetLeft;
    offsetY = e.clientY - el.offsetTop;
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', endDrag);
  }
  function drag(e) {
    el.style.left = e.clientX - offsetX + 'px';
    el.style.top = e.clientY - offsetY + 'px';
  }
  function endDrag() {
    document.removeEventListener('mousemove', drag);
    document.removeEventListener('mouseup', endDrag);
  }
}

[nameField, bioField, contactField].forEach(makeDraggable);

nameInput.addEventListener('input', () => {
  nameField.textContent = nameInput.value || 'Your Name';
});

bioInput.addEventListener('input', () => {
  bioField.textContent = bioInput.value || 'Short Bio';
});

contactInput.addEventListener('input', () => {
  contactField.textContent = contactInput.value || 'Contact Info';
});

imageUpload.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (ev) => {
    profileImage.src = ev.target.result;
  };
  reader.readAsDataURL(file);
});

addStickerBtn.addEventListener('click', () => {
  const sticker = document.createElement('div');
  sticker.className = 'sticker draggable';
  sticker.textContent = 'WOW!';
  sticker.style.left = '150px';
  sticker.style.top = '150px';
  card.appendChild(sticker);
  makeDraggable(sticker);
});

resetBtn.addEventListener('click', () => {
  card.innerHTML = defaultCardHTML;
  profileImage.src = '';
  nameInput.value = '';
  bioInput.value = '';
  contactInput.value = '';
  [profileImage, nameField, bioField, contactField].forEach(el => {
    if(el.id) {
      const element = document.getElementById(el.id);
      makeDraggable(element);
    }
  });
});

downloadBtn.addEventListener('click', () => {
  html2canvas(card).then(canvas => {
    const link = document.createElement('a');
    link.download = 'business-card.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  });
});
