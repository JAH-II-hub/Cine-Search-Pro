class SearchComponent {
    constructor() {
        this.input = document.getElementById('search-input');
        this.container = document.getElementById('results-container');
        this.resultsList = document.getElementById('results-list');
        
        // 1. Map Cache
        this.cache = new Map();
        
        this.timer = null;
        this.apiKey = '3c0eeb100683cf1c22333b2d9fa29f79';

        this.input.addEventListener('input', (e) => this.handleInput(e.target.value));
    }

    // 2. Manual Debounce
    handleInput(query) {
        clearTimeout(this.timer);
        if (!query.trim()) {
            this.clearResults();
            return;
        }

        this.timer = setTimeout(() => {
            this.search(query);
        }, 300);
    }

    async search(query) {
        // Check Cache
        if (this.cache.has(query)) {
            console.log("From Cache");
            this.render(this.cache.get(query));
            return;
        }

        // Set Loading State
        this.container.setAttribute('data-loading', 'true');

        try {
            // Fetch Data
            const url = `https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&query=${query}`;
            const res = await fetch(url);
            const data = await res.json();

            // Save to Cache
            this.cache.set(query, data.results);
            
            this.render(data.results);
        } catch (err) {
            console.error(err);
        } finally {
            // Remove Loading State
            this.container.setAttribute('data-loading', 'false');
        }
    }

    render(movies) {
        this.clearResults();
        if (!movies) return;

        const template = document.getElementById('movie-template');
        
        movies.forEach(m => {
            // Clone template
            const clone = template.content.cloneNode(true);
            const titleEl = clone.querySelector('.title');
            
            // Set text (Safe from XSS)
            titleEl.textContent = m.title;
            
            this.resultsList.appendChild(clone);
        });
    }

    clearResults() {
        this.resultsList.innerHTML = '';
    }
}

// Start
new SearchComponent();