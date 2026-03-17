class SearchComponent {
  constructor() {
    this.cache = new Map();
    this.debounceTimer = null;
    this.container = document.querySelector('.app-container');
    this.input = document.querySelector('#search-input');
    this.resultsList = document.querySelector('#results-list');
    this.template = document.querySelector('#movie-template');
    
    this.setupListeners();
  }

  setupListeners() {
    this.input.addEventListener('input', (e) => {
      this.handleInput(e.target.value);
    });
  }

  handleInput(query) {
    clearTimeout(this.debounceTimer);
    if (!query) {
        this.resultsList.innerHTML = '';
        return;
    }

    // Debounce: wait 300ms 
    this.debounceTimer = setTimeout(() => {
      this.executeSearch(query);
    }, 300);
  }

  async executeSearch(query) {
    // Check Cache 
    if (this.cache.has(query)) {
      this.render(this.cache.get(query));
      return;
    }

    this.container.setAttribute('data-loading', 'true');

    try {
      // Basic fetch
      const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=3c0eeb100683cf1c22333b2d9fa29f79&query=${encodeURIComponent(query)}`);
      if (!response.ok) throw new Error('API error');
      
      this.cache.set(query, data.results);
      this.render(data.results);
    } catch (err) {
      console.error("Search failed", err);
    } finally {
      this.container.removeAttribute('data-loading');
    }
  }

  render(movies) {
    this.resultsList.innerHTML = ''; 
    const frag = new DocumentFragment();

    movies.forEach(movie => {
      const clone = this.template.content.cloneNode(true);
      clone.querySelector('.title').textContent = movie.title;
      frag.appendChild(clone);
    });

    this.resultsList.appendChild(frag);
  }
}

new SearchComponent();