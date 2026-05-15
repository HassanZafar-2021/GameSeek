# GameSeek

## Description

GameSeek was built out of a genuine frustration with how hard it is to find good game information in one place. As gamers ourselves, we wanted a clean, fast platform where you could search for any game, filter by genre or platform, and see real data — release dates, ratings, developers — without wading through ads or bloated review sites.

## Table of Contents

- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)
- [Badges](#badges)
- [Features](#features)
- [How to Contribute](#how-to-contribute)
- [Tests](#tests)

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/HassanZafar-2021/GameSeek.git
   cd GameSeek
   ```

2. **Obtain a RAWG API key** by signing up at [https://rawg.io/apidocs](https://rawg.io/apidocs). It's free.

3. **Add your API key** — open `js/script.js` and `js/modal.js` and replace the placeholder value:
   ```js
   const API_KEY = "your_rawg_api_key_here";
   ```

4. **Open the app** — no build step or server required. Simply open `home.html` in your browser and you're good to go.

> Voice search works best in Google Chrome, which has the most complete support for the Web Speech API.

## Usage

1. Open `home.html` and click **Start Exploring** to go to the search page.
2. Type a game title into the search bar and press **Search**, or click the mic icon to use voice search.
3. Use the left sidebar to filter games by **genre**, **platform**, or **release window** (this week, last 30 days, next 30 days, etc.).
4. Click any game card to open a detailed view with ratings, platforms, genres, tags, and playtime.
5. Click **Compare** to open the comparison modal and search two games side-by-side.
6. Your last three searches are saved in the **Recent Searches** sidebar on the right.
7. Toggle dark/light mode using the switch in the top-right corner.

![alt text](./assets/images/screenshot.png)

## Credits

Developed by:

- **Hassan Zafar** — [GitHub](https://github.com/HassanZafar-2021)
- **John Garcia**
- **Anthony McElrath**
- **Camryn Cobbs**

## License

No License 

## Badges

![Top Language](https://img.shields.io/github/languages/top/HassanZafar-2021/GameSeek)
![RAWG API](https://img.shields.io/badge/Data-RAWG%20API-blue.svg)

## Features

- **Smart Search** — exact-match with fuzzy fallback so typos don't break your results
- **Voice Search** — speak a game title directly into the search bar via the Web Speech API
- **Genre Filters** — Action, Adventure, RPG, Shooter, Strategy, Sports, Puzzle, Racing
- **Platform Filters** — PlayStation, Xbox, PC, Nintendo, Mobile
- **Live Release Windows** — this week, this month, last 30 days, next 30 days, all computed from today's real date (no hardcoded years)
- **Developer Browser** — explore the most prolific studios and their full game catalogs
- **Game Comparison Modal** — search two games and compare their details side-by-side
- **Game Detail View** — click any card for rating, Metacritic score, average playtime, tags, and a link to the official site
- **Recent Searches** — persistent sidebar showing your last 3 searched games
- **Dark / Light Mode** — toggle between themes for comfortable viewing in any environment
- **Responsive Design** — adapts from widescreen desktop down to mobile

## How to Contribute

To contribute:

1. Fork the repository and create a new branch for your feature or fix:
   ```bash
   git checkout -b feature/your-feature-name
   ```
2. Make your changes and test them thoroughly in the browser.
3. Submit a pull request with a clear description of what you changed and why.

Areas we'd especially love help with:
- Integrating additional APIs (gameplay trailers, price tracking, user reviews)
- Improving search relevancy and autocomplete
- Expanding test coverage
- Accessibility improvements

## Tests

No tests needed/written.