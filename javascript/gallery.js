const galleryData = [
    { src: 'resources/images/ParaFauna/Resto_01.mp4', type: 'video' },
    { src: 'resources/images/ParaFauna/Resto_02.gif', type: 'image' },
    { src: 'resources/images/ParaFauna/WallRestore_Ice02.gif', type: 'image' },
    { src: 'resources/images/ParaFauna/Restore_Ice02_01.gif', type: 'image' },
    { src: 'resources/images/ParaFauna/RestoreVFX06.mp4', type: 'video' }
];

const galleryData2 = [
    {src: 'resources/images/ParaFauna/track01.png', type: 'image'},
    {src: 'resources/images/ParaFauna/track02.png', type: 'image'},
    {src: 'resources/images/ParaFauna/track03.png', type: 'image'},
    {src: 'resources/images/ParaFauna/track04.png', type: 'image'},
    {src: 'resources/images/ParaFauna/track05.png', type: 'image'},
    {src: 'resources/images/ParaFauna/track06.png', type: 'image'},
    {src: 'resources/images/ParaFauna/track07.png', type: 'image'},
    {src: 'resources/images/ParaFauna/track08.png', type: 'image'},
]

let currentIndex = 0;
let isDown = false;
let startX = 0;
let scrollLeft = 0;
let hasDragged = false;

const gallery = document.getElementById('gallery');
const galleryWrapper = document.querySelector('.gallery-wrapper');
const modal = document.getElementById('modal');
const modalContent = document.getElementById('modalContent');
const closeBtn = document.getElementById('closeBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const counter = document.getElementById('counter');

function initGallery() {
    galleryData.forEach((item, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = `gallery-item ${item.type}`;
        
        if (item.type === 'image') {
            galleryItem.innerHTML = `<img src="${item.src}" alt="Gallery item ${index + 1}">`;
        } else {
            galleryItem.innerHTML = `<video src="${item.src}"></video><div class="play-icon"></div>`;
        }
        
        galleryItem.addEventListener('click', (e) => {
            if (!hasDragged) {
                openModal(index);
            }
        });
        gallery.appendChild(galleryItem);
    });
}

function openModal(index) {
    currentIndex = index;
    updateModal();
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function updateModal() {
    const item = galleryData[currentIndex];
    modalContent.innerHTML = '';
    
    if (item.type === 'image') {
        const img = document.createElement('img');
        img.src = item.src;
        modalContent.appendChild(img);
    } else {
        const video = document.createElement('video');
        video.src = item.src;
        video.controls = true;
        video.autoplay = true;
        modalContent.appendChild(video);
    }

    counter.textContent = `${currentIndex + 1} / ${galleryData.length}`;
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === galleryData.length - 1;
}

function nextItem() {
    if (currentIndex < galleryData.length - 1) {
        currentIndex++;
        updateModal();
    }
}

function prevItem() {
    if (currentIndex > 0) {
        currentIndex--;
        updateModal();
    }
}

/* Gallery drag scrolling */
galleryWrapper.addEventListener('mousedown', (e) => {
    isDown = true;
    hasDragged = false;
    galleryWrapper.classList.add('dragging');
    startX = e.pageX - galleryWrapper.offsetLeft;
    scrollLeft = galleryWrapper.scrollLeft;
});

document.addEventListener('mouseup', () => {
    isDown = false;
    hasDragged = false;
    galleryWrapper.classList.remove('dragging');
});

galleryWrapper.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - galleryWrapper.offsetLeft;
    const walk = (x - startX) * 1.5;
    if (Math.abs(walk) > 5) {
        hasDragged = true;
    }
    galleryWrapper.scrollLeft = scrollLeft - walk;
});

/* Mouse wheel scrolling */
galleryWrapper.addEventListener('wheel', (e) => {
    e.preventDefault();
    galleryWrapper.scrollLeft += e.deltaY * 3;
});

/* Modal controls */
closeBtn.addEventListener('click', closeModal);
nextBtn.addEventListener('click', nextItem);
prevBtn.addEventListener('click', prevItem);

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

document.addEventListener('keydown', (e) => {
    if (modal.classList.contains('active')) {
        if (e.key === 'ArrowRight') nextItem();
        if (e.key === 'ArrowLeft') prevItem();
        if (e.key === 'Escape') closeModal();
    }
});

/* Initialize gallery when DOM is ready */
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGallery);
} else {
    initGallery();
}


