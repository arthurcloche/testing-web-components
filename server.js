const express = require("express");
const app = express();
const port = 3000;

app.use(express.static(__dirname));

app.get("/api/data", (req, res) => {
	res.send('<div id="data"><p>Data loaded from server.</p></div>');
});

app.listen(port, () => {
	console.log(`Server is running at http://localhost:${port}`);
});
