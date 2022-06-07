import express from 'express'
import MonsterPart from '../models/MonsterPart.js'
import DirMonsterpart from '../models/DirMonsterpart.js'
import GameTemplate from '../models/GameTemplate.js'
import auth from '../middleware/auth.middleware.js'

const monsterRouter = express.Router()

// api/monster/monsterparts
monsterRouter.get('/monsterparts', auth, async (req, res) => {
  try {
    const monsterparts = await MonsterPart.find()
    res.status(201).json(monsterparts)
  } catch (error) {
    res.status(500).json({
      message: 'Что-то полшо не так.',
    })
  }
})

// api/monster/dir/monsterparts
monsterRouter.get('/dir/monsterparts', auth, async (req, res) => {
  try {
    const monsterparts = await DirMonsterpart.find()
    res.status(200).json(monsterparts)
  } catch (error) {
    res.status(500).json({
      message: 'Что-то пошло не так, попробуйте снова.',
    })
  }
})

// api/monster/templates
monsterRouter.post('/templates', auth, async (req, res) => {
  try {
    const [request] = req.body
    console.log(request)
    const component = new GameTemplate({
      templateName: request.templateName,
      game: 'Monster2',
      components: request.templateParts,
      teacher: req.user.userId,
    })
    console.log(component)
    await component.save()

    res.status(201).json({
      message: 'Шаблон игры успешно создан',
    })
  } catch (error) {
    res.status(500).json({
      message: 'Что-то пошло не так, попробуйте снова.',
      type: 'error',
    })
  }
})

// api/monster/templates
monsterRouter.get('/templates', auth, async (req, res) => {
  try {
    const templates = await GameTemplate.find({ teacher: req.user.userId })
    res.status(200).json({ templates })
  } catch (error) {
    res.status(500).json({
      message: 'Что-то пошло не так, попробуйте снова.',
      type: 'error',
    })
  }
})

// api/monster/templates
monsterRouter.delete('/templates', auth, async (req, res) => {
  try {
    const templateId = await GameTemplate.findOne(req.body[0])
    if (!templateId) {
      return res.status(401).json({
        message: 'Такого шаблона нет, попробуйте снова.',
        type: 'error',
      })
    }

    await GameTemplate.deleteOne(req.body[0])

    res.status(201).json({
      message: 'Шаблон игры успешно удалён',
    })
  } catch (error) {
    res.status(500).json({
      message: 'Что-то пошло не так, попробуйте снова.',
      type: 'error',
    })
  }
})

export default monsterRouter
