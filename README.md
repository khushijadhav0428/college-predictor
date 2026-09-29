# College Predictor Web Application

Enter your percentile and get colleges classified as Safe / Target / Reach, filterable by branch and city.

## Files
- `index.html`, `style.css`, `script.js` - the dashboard
- `colleges.json` - college data (SAMPLE values; replace with real cutoff data)
- `predictor_analysis.ipynb` - Jupyter Notebook for exploring and preparing the data

## Run
Browsers block `fetch` on local files, so start a small server:
```bash
python -m http.server 8000
```
Open http://localhost:8000

## Tech stack
HTML, CSS, JavaScript, JSON, Jupyter Notebook (Pandas)
