# Currenzo — Modern FX & Currency Exchange Engine

A sleek, institutional-grade currency converter web application inspired by high-end fintech platforms like Wise, Stripe, and Bloomberg Terminal.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

## Features

- **Live Real-Time Market Rates**: Fetches live mid-market rates with a resilient multi-CDN cascading fallback engine (`@fawazahmed0/currency-api`, Cloudflare Pages, and Open Exchange Rates).
- **Searchable Currency Modal**: Search over 160+ currencies by ISO code, country name, or full currency title.
- **High-Definition Country Flags**: Instant flag recognition for every supported country, including EU.
- **Fintech Precision**: Formatted tabular numbers, preset amount shortcuts (`+100`, `+500`, `1,000`, `5,000`, `10,000`), and quick-clear controls.
- **Interactive Conversion Breakdown**: Live reference matrix displaying side-by-side rates for 1 to 1,000 currency units.
- **Quick Currency Pairs**: Instant one-click switches for popular FX pairs (`USD/EUR`, `USD/INR`, `GBP/USD`, etc.).
- **Dark & Light Mode**: Built-in sleek dark obsidian theme and clean light theme with local preference saving.
- **Copy & Share**: Quick one-click copy with toast notifications.

## Getting Started

### Prerequisites
Any modern web browser.

### Running Locally
To launch locally using Python:
```bash
python -m http.server 5500
```
Then open [http://localhost:5500](http://localhost:5500) in your browser.

Or use VS Code with the **Live Server** extension:
1. Open the project folder in VS Code.
2. Click **Go Live** in the bottom status bar or right-click `index.html` and select **Open with Live Server**.
