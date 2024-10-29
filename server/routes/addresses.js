import { Router } from 'express';
import { db } from '../database.js';

const router = Router();

// Listar endereços
router.get('/', (req, res) => {
  const { status, page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;

  try {
    let query = 'SELECT * FROM addresses';
    const params = [];

    if (status) {
      query += ' WHERE status = ?';
      params.push(status);
    }

    query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
    params.push(limit, offset);

    const addresses = db.prepare(query).all(...params);
    const total = db.prepare('SELECT COUNT(*) as count FROM addresses' + (status ? ' WHERE status = ?' : '')).get(...(status ? [status] : []));

    res.json({
      data: addresses,
      pagination: {
        total: total.count,
        page: Number(page),
        totalPages: Math.ceil(total.count / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar endereços' });
  }
});

// Criar endereço
router.post('/', (req, res) => {
  const address = req.body;
  
  try {
    const result = db.prepare(`
      INSERT INTO addresses (
        id, street, number, complement, neighborhood,
        city, state, postal_code, latitude, longitude,
        reference_points
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      'addr-' + Date.now(),
      address.street,
      address.number,
      address.complement,
      address.neighborhood,
      address.city,
      address.state,
      address.postalCode,
      address.latitude,
      address.longitude,
      address.referencePoints
    );

    res.status(201).json({ id: result.lastInsertRowid });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar endereço' });
  }
});

// Verificar endereço
router.post('/:id/verify', (req, res) => {
  const { id } = req.params;
  const { status, notes } = req.body;
  const verifierId = req.user.userId;

  try {
    db.prepare(`
      UPDATE addresses
      SET status = ?, verified_by = ?, notes = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).run(status, verifierId, notes, id);

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao verificar endereço' });
  }
});

// Estatísticas
router.get('/stats', (req, res) => {
  try {
    const stats = {
      totalAddresses: db.prepare('SELECT COUNT(*) as count FROM addresses').get().count,
      verifiedAddresses: db.prepare("SELECT COUNT(*) as count FROM addresses WHERE status = 'verified'").get().count,
      pendingAddresses: db.prepare("SELECT COUNT(*) as count FROM addresses WHERE status = 'pending'").get().count,
      failedAddresses: db.prepare("SELECT COUNT(*) as count FROM addresses WHERE status = 'failed'").get().count,
      activeUsers: db.prepare('SELECT COUNT(*) as count FROM users WHERE active = true').get().count,
      verificationsByDay: db.prepare(`
        SELECT DATE(updated_at) as date, COUNT(*) as count
        FROM addresses
        WHERE status != 'pending'
        GROUP BY DATE(updated_at)
        ORDER BY date DESC
        LIMIT 7
      `).all()
    };

    stats.successRate = (stats.verifiedAddresses / (stats.verifiedAddresses + stats.failedAddresses)) * 100 || 0;

    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao obter estatísticas' });
  }
});

export { router as addressRouter };