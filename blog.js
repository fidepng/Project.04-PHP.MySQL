window.addEventListener('DOMContentLoaded', function() {
  // Variabel untuk menyimpan total halaman
  let totalPages;

  // Fungsi untuk mengambil data artikel dari server
  function getArticles(page = 1) {
    fetch(`get_articles.php?page=${page}`, { cache: 'no-cache' })
      .then(response => response.json())
      .then(data => {
        const { articles } = data;
        totalPages = data.totalPages;
        const articleList = document.getElementById('article-list');
        articleList.innerHTML = '';

        const observer = new IntersectionObserver((entries, observer) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const img = entry.target;
              img.src = img.dataset.src;
              observer.unobserve(img);
            }
          });
        }, { rootMargin: '0px 0px 200px 0px' });

        articles.forEach(article => {
          const articleElement = document.createElement('article');
          articleElement.classList.add('animate');
          articleElement.innerHTML = `
            <header>
              <h3 class="title">${article.title}</h3>
              <p class="meta">${article.date} | ${article.author}</p>
            </header>
            <img data-src="${article.image_path}" alt="${article.title}">
            <p class="description">${article.content}</p>
            <footer>
              <a href="${article.url}" class="read-more" target="_blank" rel="noopener noreferrer">Baca Selengkapnya</a>
            </footer>
          `;
          observer.observe(articleElement.querySelector('img'));
          articleList.appendChild(articleElement);
        });

        updatePagination();
      })
      .catch(error => console.error('Error:', error));
  }

  // Fungsi untuk mengupdate tombol navigasi pagination
  function updatePagination() {
    const prevButton = document.querySelector('.pagination .prev');
    const nextButton = document.querySelector('.pagination .next');
    const pageInfo = document.querySelector('.pagination .page-info');

    prevButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage === totalPages;
    pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
  }

  // Inisialisasi variabel currentPage
  let currentPage = 1;

  // Panggil getArticles() dengan halaman default 1 saat halaman dimuat
  getArticles(currentPage);

  // Tambahkan event listener untuk tombol pagination
  const prevButton = document.querySelector('.pagination .prev');
  const nextButton = document.querySelector('.pagination .next');

  prevButton.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      getArticles(currentPage);
    }
  });

  nextButton.addEventListener('click', () => {
    if (currentPage < totalPages) {
      currentPage++;
      getArticles(currentPage);
    }
  });
});