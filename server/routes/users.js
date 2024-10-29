import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { db } from '../database.js';

const router = Router();

// Middleware para verificar se é admin
const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Acesso negado' });
  }
  next();
};

// Listar usuários (apenas admin)
router.get('/', isAdmin, (req, res) => {
  try {
    const users = db.prepare('SELECT id, name, email, role, active, created_at, last_login FROM users').all();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar usuários' });
  }
});

// Criar usuário (apenas admin)
router.post('/', isAdmin, async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    
    db.prepare(`
      INSERT INTO users (id, name, email, password, role)
      VALUES (?, ?, ?, ?, ?)
    `).run(
      'user-' + Date.now(),
      name,
      email,
      hashedPassword,
      role
    );

    res.status(201).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar usuário' });
  }
});

// Atualizar usuário (apenas admin)
router.put('/:id', isAdmin, async (req, res) => {
  const { id } = req.params;
  const { name, email, password, role, active } = req.body;

  try {
    let query = 'UPDATE users SET name = ?, email = ?, role = ?, active = ?';
    const params = [name, email, role, active];

    if (password) {
      query += ', password = ?';
      const hashedPassword = await bcrypt.hash(password, 10);
      params.push(hashedPassword);
    }

    query += ' WHERE id = ?';
    params.push(id);

    db.prepare(query).run(...params);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar usuário' });
  }
});

export { router as userRouter };