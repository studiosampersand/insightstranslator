# CSV profile format

The application requires these exact column names:

```csv
id,name,email,department,role,language,cool_blue,fiery_red,sunshine_yellow,earth_green
```

Example:

```csv
P001,Amina Vermeer,amina.vermeer@demo.benice.local,IT,Service Delivery Manager,nl,59,15,16,10
```

## Validation rules

- `id`, `name`, `email`, `department`, `role` and `language` must not be empty.
- The four energy columns must contain numbers between 0 and 100.
- The four percentages in each row must total exactly 100.
- Supported language hints are `en`, `nl`, `fr` and `de`. Other values are accepted as metadata but the demo reply engine supports these four languages.
- Commas inside values must be enclosed in double quotes.

## Privacy

CSV imports stay in the browser through `localStorage`. They are not transmitted. Clear the site data or use **Reset demo data** to remove an imported file.

For a management demonstration, use the bundled fictional profiles or a separately approved test set—not production HR data.
