const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function crearAdmin() {
  const passwordEncriptada = await bcrypt.hash('admin123', 10)

  const admin = await prisma.usuario.create({
    data: {
      nombre: 'Administrador',
      email: 'admin@peliculas.com',
      password: passwordEncriptada,
      rol: 'admin'
    }
  })

  console.log('Admin creado:', admin)
  await prisma.$disconnect()
}

crearAdmin()