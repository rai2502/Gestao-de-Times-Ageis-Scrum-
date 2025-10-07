// routes/sprints.js (Assumindo que este é o arquivo principal de rotas)
const express = require('express');
const router = express.Router();

// Mock data: Mantendo todas as entidades no mesmo arquivo por simplicidade
let membros = [
    { id: 1, nome: "João", email: "joao@email.com" },
    { id: 2, nome: "Lucia", email: "lucia@email.com" }
];
let nextMembroId = 3;

let sprints = [
    { id: 1, nome: "Sprint 1", data_inicio: "2025-10-01", data_fim: "2025-10-15" }
];
let nextSprintId = 2; // ID inicial correto para novas sprints

let tarefas = [
    {
        id: 1,
        titulo: "Criar layout",
        descricao: "Desenvolver o layout inicial",
        status: "em andamento",
        id_membro: 1,
        id_sprint: 1
    },
    {
        id: 2,
        titulo: "Modelar banco",
        descricao: "Criar DER",
        status: "concluída",
        id_membro: 2,
        id_sprint: 1
    }
];
let nextTarefaId = 3; // ID inicial correto para novas tarefas


// ----------------------------------------------------------------------
// Rotas CRUD para SPRINT
// ----------------------------------------------------------------------

// 1. CREATE - Nova sprint
router.post('/', (req, res) => {
    // 💡 Correção: Usar uma variável de controle (nextSprintId) para garantir IDs únicos
    const novaSprint = {
        id: nextSprintId++,
        ...req.body
    };
    sprints.push(novaSprint);
    res.status(201).json(novaSprint);
});

// 2. READ - Listar sprints
router.get('/', (req, res) => {
    res.status(200).json(sprints);
});

// 3. READ - Listar tarefas de uma sprint
router.get('/:id/tarefas', (req, res) => {
    const sprintId = parseInt(req.params.id);
    // Verifica se a sprint existe antes de filtrar as tarefas (melhoria)
    const sprintExists = sprints.some(s => s.id === sprintId);

    if (!sprintExists) {
        return res.status(404).json({ message: "Sprint não encontrada." });
    }

    const tarefasSprint = tarefas.filter(t => t.id_sprint === sprintId);
    res.status(200).json(tarefasSprint);
});

// 4. POST - Cadastrar tarefa em uma sprint
router.post('/:id/tarefas', (req, res) => {
    const sprintId = parseInt(req.params.id);

    // 💡 Correção: Implementação da lógica faltante
    const novaTarefa = {
        id: nextTarefaId++,
        id_sprint: sprintId, // Associa a tarefa à sprint
        titulo: req.body.titulo,
        descricao: req.body.descricao || '',
        status: req.body.status || 'pendente',
        id_membro: req.body.id_membro || null // Pode ser nulo
    };

    tarefas.push(novaTarefa);
    res.status(201).json(novaTarefa);
});

module.exports = router;