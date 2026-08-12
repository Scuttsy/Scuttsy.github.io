//1
const restorationData = [
  { src: "resources/images/ParaFauna/Restoration_test.webm", type: "video" },
  { src: "resources/images/ParaFauna/Resto_02.gif", type: "image" },
  { src: "resources/images/ParaFauna/Restore_Ice02_01.gif", type: "image" },
  { src: "resources/images/ParaFauna/WallRestore_Ice02.gif", type: "image" },
  { src: "resources/images/ParaFauna/RestoreVFX06.mp4", type: "video" },
];

//2
const adaptaTrackData = [
  { src: "resources/images/ParaFauna/track01.png", type: "image" },
  { src: "resources/images/ParaFauna/track02.png", type: "image" },
  { src: "resources/images/ParaFauna/track03.png", type: "image" },
  { src: "resources/images/ParaFauna/track04.png", type: "image" },
  { src: "resources/images/ParaFauna/track05.png", type: "image" },
  { src: "resources/images/ParaFauna/track06.png", type: "image" },
  { src: "resources/images/ParaFauna/track07.png", type: "image" },
  { src: "resources/images/ParaFauna/track08.png", type: "image" },
  { src: "resources/images/ParaFauna/track09.png", type: "image" },
];

//3
const designProcessData = [
  { src: "resources/images/DesignProcess/ArrArrVr_GDD_01.png", type: "image" },
  { src: "resources/images/DesignProcess/ArrArrVr_GDD_02.png", type: "image" },
  { src: "resources/images/DesignProcess/ArrArrVr_GDD_03.png", type: "image" },
];

//4
const ultraSpringData = [
  {
    src: "resources/images/Ultraspring/Ultraspring_03_HighQuality.gif",
    type: "image",
  },
  {
    src: "resources/images/Ultraspring//Ultraspring_04_HighQuality.gif",
    type: "image",
  },
  { src: "resources/images/Ultraspring/Ultraspring_GOOD.gif", type: "image" },
  { src: "resources/images/Ultraspring/Ultraspring_Final.gif", type: "image" },
];

const galleryDataMaster = [
  restorationData,
  adaptaTrackData,
  designProcessData,
  ultraSpringData,
];

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
    this.galleryWrapper = document.getElementById(
      `galleryWrapper-${galleryId}`,
    );
    this.modal = document.getElementById(`modal-${galleryId}`);
    this.modalContent = document.getElementById(`modalContent-${galleryId}`);
    this.closeBtn = document.getElementById(`closeBtn-${galleryId}`);
    this.prevBtn = document.getElementById(`prevBtn-${galleryId}`);
    this.nextBtn = document.getElementById(`nextBtn-${galleryId}`);
    this.counter = document.getElementById(`counter-${galleryId}`);

    this.forwardBtn = document.getElementById(`gallery-forward-${galleryId}`);
    this.backBtn = document.getElementById(`gallery-back-${galleryId}`);

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
      const galleryItem = document.createElement("div");
      galleryItem.className = `gallery-item ${item.type}`;

      if (item.type === "image") {
        galleryItem.innerHTML = `<img src="${item.src}" alt="Gallery item ${index + 1}">`;
      } else {
        galleryItem.innerHTML = `<video src="${item.src}"></video><div class="play-icon"></div>`;
      }

      galleryItem.addEventListener("click", (e) => {
        if (!this.hasDragged) {
          this.openModal(index);
        }
      });
      this.gallery.appendChild(galleryItem);
    });

    this.gallery.scrollTop = this.gallery.firstChild.offsetLeft;
  }

  openModal(index) {
    this.currentIndex = index;
    this.updateModal();
    this.modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  closeModal() {
    this.modal.classList.remove("active");
    document.body.style.overflow = "auto";
  }

  updateModal() {
    const item = this.galleryData[this.currentIndex];
    this.modalContent.innerHTML = "";

    if (item.type === "image") {
      const img = document.createElement("img");
      img.src = item.src;
      this.modalContent.appendChild(img);
    } else {
      const video = document.createElement("video");
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
    this.galleryWrapper.addEventListener("mousedown", (e) => {
      this.isDown = true;

      //fumble delay
      setTimeout(() => {
        this.hasDragged = false;
      }, 750);

      this.galleryWrapper.classList.add("dragging");
      this.startX = e.pageX - this.galleryWrapper.offsetLeft;
      this.scrollLeft = this.galleryWrapper.scrollLeft;
    });

    document.addEventListener("mouseup", () => {
      this.isDown = false;

      //fumble delay
      setTimeout(() => {
        this.hasDragged = false;
      }, 750);

      this.galleryWrapper.classList.remove("dragging");
    });

    this.galleryWrapper.addEventListener("mousemove", (e) => {
      if (!this.isDown) return;
      e.preventDefault();
      const x = e.pageX - this.galleryWrapper.offsetLeft;
      const walk = (x - this.startX) * 2;
      if (Math.abs(walk) > 5) {
        this.hasDragged = true;
      }
      this.galleryWrapper.scrollLeft = this.scrollLeft - walk;
    });

    this.galleryWrapper.addEventListener("wheel", (e) => {
      e.preventDefault();
      this.galleryWrapper.scrollLeft += e.deltaY * 2;
    });

    this.closeBtn.addEventListener("click", () => this.closeModal());
    this.nextBtn.addEventListener("click", () => this.nextItem());
    this.prevBtn.addEventListener("click", () => this.prevItem());

    this.modal.addEventListener("click", (e) => {
      if (e.target === this.modal) {
        this.closeModal();
      }
    });

    document.addEventListener("keydown", (e) => {
      if (this.modal.classList.contains("active")) {
        if (e.key === "ArrowRight") this.nextItem();
        if (e.key === "ArrowLeft") this.prevItem();
        if (e.key === "Escape") this.closeModal();
      }
    });

    if (this.forwardBtn != null) {
      this.forwardBtn.addEventListener("click", () => {
        this.galleryWrapper.scrollLeft += 500;
      });
    }
    if (this.backBtn != null) {
      this.backBtn.addEventListener("click", () => {
        this.galleryWrapper.scrollLeft -= 500;
      });
    }
  }
}

function initAllGalleries() {
  for (let index = 0; index < galleryDataMaster.length; index++) {
    if (galleryDataMaster[index].length > 0) {
      new GalleryManager(`${index + 1}`, galleryDataMaster[index]);
    }
  }
}

function initAllImages() {
  initMasterModal();

  document.addEventListener("click", (event) => {
    const mediaElement = event.target.closest("img, video");
    if (!mediaElement || !isModalEligible(mediaElement)) return;

    event.preventDefault();
    event.stopPropagation();
    openMasterModal(mediaElement);
  });
}

function isModalEligible(element) {
  if (element.closest(".gallery")) return false;
  if (element.closest(".gallery-button")) return false;
  if (element.closest("nav")) return false;
  if (element.closest("footer")) return false;
  if (element.closest("#ModalMaster")) return false;
  return true;
}

let masterModal = null;

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    initAllGalleries();
    initAllImages();
  });
} else {
  initAllGalleries();
  initAllImages();
}

function initMasterModal() {
  masterModal = document.getElementById("ModalMaster");
  if (!masterModal) {
    masterModal = document.createElement("section");
    masterModal.id = "ModalMaster";
    document.body.appendChild(masterModal);
  }

  masterModal.classList.add("modal");

  masterModal.addEventListener("click", (event) => {
    if (
      event.target === masterModal ||
      event.target.classList.contains("modal-close")
    ) {
      closeMasterModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (!masterModal.classList.contains("active")) return;
    if (event.key === "Escape") {
      closeMasterModal();
    }
  });
}

function openMasterModal(mediaElement) {
  const src =
    mediaElement.currentSrc ||
    mediaElement.src ||
    mediaElement.getAttribute("src");
  if (!src || !masterModal) return;

  const type =
    mediaElement.tagName.toLowerCase() === "video" ? "video" : "image";
  updateMasterModal({ src, type, alt: mediaElement.alt || "" });
  masterModal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeMasterModal() {
  if (!masterModal) return;
  masterModal.classList.remove("active");
  document.body.style.overflow = "auto";
}

function updateMasterModal({ src, type, alt }) {
  if (!masterModal) return;

  masterModal.innerHTML = "";

  const modalContent = document.createElement("div");
  modalContent.className = "modal-content";

  if (type === "image") {
    const img = document.createElement("img");
    img.src = src;
    if (alt) img.alt = alt;
    modalContent.appendChild(img);
  } else {
    const video = document.createElement("video");
    video.src = src;
    video.controls = true;
    video.autoplay = true;
    video.playsInline = true;
    modalContent.appendChild(video);
  }

  const closeBtn = document.createElement("button");
  closeBtn.type = "button";
  closeBtn.className = "modal-close";
  closeBtn.innerHTML = "&times;";

  masterModal.appendChild(closeBtn);
  masterModal.appendChild(modalContent);
}
