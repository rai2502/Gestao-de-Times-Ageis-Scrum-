const express = require('express');
const app = express();
const sprintsRoutes = require('./routes/sprints');

app.use(express.json());
app.use('/api/sprints', sprintsRoutes);

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Servidor Scrum rodando na porta ${PORT}`);
});
