// Efek scroll animasi
function animateOnScroll() {
  const elements = document.querySelectorAll('.animate');
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        }
      });
    },
    { threshold: 0.2 }
  );

  elements.forEach(element => {
    observer.observe(element);
  });
}

window.addEventListener('load', animateOnScroll);

// Animasi typing header
const typedTextSpan = document.querySelector('.typed-text');
const textArray = ['Halo! Selamat Datang. '];
let textArrayIndex = 0;
let charIndex = 0;

function type() {
  if (charIndex < textArray[textArrayIndex].length) {
    typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, 100); // Mengatur kecepatan mengetik
  } else {
    setTimeout(deleteText, 3000); // Jeda sebelum menghapus teks
  }
}

function deleteText() {
  if (charIndex > 0) {
    typedTextSpan.textContent = textArray[textArrayIndex].slice(0, charIndex - 1);
    charIndex--;
    setTimeout(deleteText, 50); // Mengatur kecepatan menghapus teks
  } else {
    textArrayIndex++;
    if (textArrayIndex >= textArray.length) {
      textArrayIndex = 0;
    }
    setTimeout(type, 1000); // Jeda sebelum mengetik teks berikutnya
  }
}

document.addEventListener('DOMContentLoaded', function() {
  setTimeout(type, 1000); // Jeda sebelum memulai animasi
});

// Membuat elemen lightbox hanya sekali saat dimuat
const lightbox = document.createElement('div');
lightbox.classList.add('lightbox');
document.body.appendChild(lightbox);

// Menambahkan event listener pada setiap gambar di galeri
const galleryImages = document.querySelectorAll('.image-grid img');
galleryImages.forEach(image => {
  image.addEventListener('click', () => {
    const imgSrc = image.src;
    const lightboxImage = document.createElement('img');
    lightboxImage.src = imgSrc;
    lightbox.innerHTML = '';
    lightbox.appendChild(lightboxImage);
    lightbox.style.display = 'flex';
  });
});

// Menambahkan event listener untuk menutup lightbox saat di-klik
lightbox.addEventListener('click', () => {
  lightbox.style.display = 'none';
});

// Navigasi hamburger
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav__items');

function myFunction(x) {
  x.classList.toggle("change");
  navLinks.classList.toggle("show");
}

// Nav sticky
const nav = document.querySelector('nav');
const logo = document.querySelector('.logo');

window.addEventListener('scroll', function() {
  const scrollPosition = window.pageYOffset;
  const headerHeight = document.querySelector('.header').offsetHeight;

  if (scrollPosition >= headerHeight) {
    nav.classList.add('nav-sticky');
  } else {
    nav.classList.remove('nav-sticky');
  }
});