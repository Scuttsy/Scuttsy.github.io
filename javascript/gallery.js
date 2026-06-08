class GalleryManager {
    constructor(galleryId, galleryData) {
        this.galleryId = galleryId;
        this.galleryData = galleryData;
        this.currentIndex = 0;
        this.isDown = false;
        this.startX = 0;
        this.scrollLeft = 0;
        this.hasDragged = false;

        this.gallery = document.getElementById(`gallery-${galleryId}`);
        this.galleryWrapper = document.getElementById(`galleryWrapper-${galleryId}`);
        this.modal = document.getElementById(`modal-${galleryId}`);
        this.modalContent = document.getElementById(`modalContent-${galleryId}`);
        this.closeBtn = document.getElementById(`closeBtn-${galleryId}`);
        this.prevBtn = document.getElementById(`prevBtn-${galleryId}`);
        this.nextBtn = document.getElementById(`nextBtn-${galleryId}`);
        this.counter = document.getElementById(`counter-${galleryId}`);

        if (!this.gallery) {
            console.warn(`Gallery with ID "${galleryId}" not found in DOM`);
            return;
        }
         if (!this.galleryWrapper) {
            console.warn(`Gallerywrapper with ID "${galleryId}" not found in DOM`);
            return;
        }

        this.init();
    }

    init() {
        this.initGallery();
        this.attachEventListeners();
    }

    initGallery() {
        this.galleryData.forEach((item, index) => {
            const galleryItem = document.createElement('div');
            galleryItem.className = `gallery-item ${item.type}`;

            if (item.type === 'image') {
                galleryItem.innerHTML = `<img src="${item.src}" alt="Gallery item ${index + 1}">`;
            } else {
                galleryItem.innerHTML = `<video src="${item.src}"></video><div class="play-icon"></div>`;
            }

            galleryItem.addEventListener('click', (e) => {
                if (!this.hasDragged) {
                    this.openModal(index);
                }
            });
            this.gallery.appendChild(galleryItem);
        });
    }

    openModal(index) {
        this.currentIndex = index;
        this.updateModal();
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        this.modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    updateModal() {
        const item = this.galleryData[this.currentIndex];
        this.modalContent.innerHTML = '';

        if (item.type === 'image') {
            const img = document.createElement('img');
            img.src = item.src;
            this.modalContent.appendChild(img);
        } else {
            const video = document.createElement('video');
            video.src = item.src;
            video.controls = true;
            video.autoplay = true;
            this.modalContent.appendChild(video);
        }

        this.counter.textContent = `${this.currentIndex + 1} / ${this.galleryData.length}`;
        this.prevBtn.disabled = this.currentIndex === 0;
        this.nextBtn.disabled = this.currentIndex === this.galleryData.length - 1;
    }

    nextItem() {
        if (this.currentIndex < this.galleryData.length - 1) {
            this.currentIndex++;
            this.updateModal();
        }
    }

    prevItem() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.updateModal();
        }
    }

    attachEventListeners() {
        this.galleryWrapper.addEventListener('mousedown', (e) => {
            this.isDown = true;
            this.hasDragged = false;
            this.galleryWrapper.classList.add('dragging');
            this.startX = e.pageX - this.galleryWrapper.offsetLeft;
            this.scrollLeft = this.galleryWrapper.scrollLeft;
        });

        document.addEventListener('mouseup', () => {
            this.isDown = false;
            this.hasDragged = false;
            this.galleryWrapper.classList.remove('dragging');
        });
 
        this.galleryWrapper.addEventListener('mousemove', (e) => {
            if (!this.isDown) return;
            e.preventDefault();
            const x = e.pageX - this.galleryWrapper.offsetLeft;
            const walk = (x - this.startX) * 2;
            if (Math.abs(walk) > 5) {
                this.hasDragged = true;
            }
            this.galleryWrapper.scrollLeft = this.scrollLeft - walk;
        });

        this.galleryWrapper.addEventListener('wheel', (e) => {
            e.preventDefault();
            this.galleryWrapper.scrollLeft += e.deltaY * 2;
        });

        this.closeBtn.addEventListener('click', () => this.closeModal());
        this.nextBtn.addEventListener('click', () => this.nextItem());
        this.prevBtn.addEventListener('click', () => this.prevItem());

        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeModal();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (this.modal.classList.contains('active')) {
                if (e.key === 'ArrowRight') this.nextItem();
                if (e.key === 'ArrowLeft') this.prevItem();
                if (e.key === 'Escape') this.closeModal();
            }
        });
    }
}

const galleryData1 = [
    { src: 'resources/images/ParaFauna/Resto_01.mp4', type: 'video' },
    { src: 'resources/images/ParaFauna/Resto_02.gif', type: 'image' },
    { src: 'resources/images/ParaFauna/Restore_Ice02_01.gif', type: 'image' },
    { src: 'resources/images/ParaFauna/WallRestore_Ice02.gif', type: 'image' },
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
];

const galleryData3 = [
    {src: 'resources/images/DesignProcess/ArrArrVr_GDD_01.png', type: 'image'},
    {src: 'resources/images/DesignProcess/ArrArrVr_GDD_02.png', type: 'image'},
    {src: 'resources/images/DesignProcess/ArrArrVr_GDD_03.png', type: 'image'},
]

function initAllGalleries() {
    if (galleryData1.length > 0) {
        new GalleryManager('1', galleryData1);
    }
    if (galleryData2.length > 0) {
        new GalleryManager('2', galleryData2);
    }
    if (galleryData3.length > 0 ){
        new GalleryManager('3', galleryData3);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAllGalleries);
} else {
    initAllGalleries();
}
