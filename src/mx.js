const openModal = (modal, overlay) => {
  overlay.classList.add('is-open');
  modal.classList.add('is-open');
};

const closeModal = (modal, overlay) => {
  overlay.classList.remove('is-open');
  modal.classList.remove('is-open');
};


const initModal = modal => {
  if (!modal) {
    console.error("You need to provide `modal element`");
  } else {
    let overlay = document.createElement('div');
    overlay.className = 'mx-modal-overlay';
    document.body.appendChild(overlay);
    const open = () => openModal(modal, overlay);
    const close = () => closeModal(modal, overlay);
    overlay.addEventListener('click', close);
    return {
      open,
      close,
    };
  }
};

function waitFor(seconds) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(), seconds * 1000);
  });
}

export default { initModal };
