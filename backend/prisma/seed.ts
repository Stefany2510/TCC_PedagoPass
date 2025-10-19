import { prisma } from '../src/lib/prisma';
import bcrypt from 'bcrypt';
import { UserRole } from '@prisma/client';

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...');

  // Criar usuários de exemplo
  const hashedPassword = await bcrypt.hash('123456', 10);

  const users = await Promise.all([
    prisma.user.upsert({
      where: { email: 'admin@pedagopass.com' },
      update: {},
      create: {
        email: 'admin@pedagopass.com',
        password: hashedPassword,
        name: 'Admin PedagoPass',
        role: UserRole.ADMIN,
        escola: 'PedagoPass',
        cidade: 'São Paulo',
        estado: 'SP',
        bio: 'Administrador da plataforma',
        pontos: 1000,
      },
    }),
    prisma.user.upsert({
      where: { email: 'professor@exemplo.com' },
      update: {},
      create: {
        email: 'professor@exemplo.com',
        password: hashedPassword,
        name: 'Maria Silva',
        role: UserRole.TEACHER,
        escola: 'Escola Exemplo',
        cidade: 'Rio de Janeiro',
        estado: 'RJ',
        bio: 'Professora de Matemática com 10 anos de experiência',
        pontos: 250,
      },
    }),
    prisma.user.upsert({
      where: { email: 'joao@exemplo.com' },
      update: {},
      create: {
        email: 'joao@exemplo.com',
        password: hashedPassword,
        name: 'João Santos',
        role: UserRole.TEACHER,
        escola: 'Colégio São José',
        cidade: 'Belo Horizonte',
        estado: 'MG',
        bio: 'Professor de História, apaixonado por viagens educacionais',
        pontos: 180,
      },
    }),
  ]);

  console.log(`✅ ${users.length} usuários criados`);

  // Criar comunidades de exemplo
  const communities = await Promise.all([
    prisma.community.create({
      data: {
        name: 'Professores de Tecnologia',
        slug: 'professores-tecnologia',
        description: 'Comunidade para troca de experiências sobre tecnologia na educação',
        topic: 'TECNOLOGIA',
        creatorId: users[0].id,
        membersCount: 2,
      },
    }),
    prisma.community.create({
      data: {
        name: 'Intercâmbio Cultural',
        slug: 'intercambio-cultural',
        description: 'Compartilhe experiências de intercâmbio e viagens educacionais',
        topic: 'INTERCAMBIO',
        creatorId: users[1].id,
        membersCount: 1,
      },
    }),
    prisma.community.create({
      data: {
        name: 'Metodologias Ativas',
        slug: 'metodologias-ativas',
        description: 'Discussões sobre metodologias ativas de aprendizagem',
        topic: 'METODOLOGIAS',
        creatorId: users[0].id,
        membersCount: 1,
      },
    }),
  ]);

  console.log(`✅ ${communities.length} comunidades criadas`);

  // Adicionar membros às comunidades
  await Promise.all([
    prisma.communityMember.create({
      data: {
        userId: users[0].id,
        communityId: communities[0].id,
        role: 'CREATOR',
      },
    }),
    prisma.communityMember.create({
      data: {
        userId: users[1].id,
        communityId: communities[0].id,
        role: 'MEMBER',
      },
    }),
    prisma.communityMember.create({
      data: {
        userId: users[1].id,
        communityId: communities[1].id,
        role: 'CREATOR',
      },
    }),
    prisma.communityMember.create({
      data: {
        userId: users[0].id,
        communityId: communities[2].id,
        role: 'CREATOR',
      },
    }),
  ]);

  console.log('✅ Membros adicionados às comunidades');

  // Criar posts de exemplo
  const posts = await Promise.all([
    prisma.post.create({
      data: {
        content: 'Olá! Bem-vindos à comunidade de Professores de Tecnologia. Vamos compartilhar ideias e experiências!',
        authorId: users[0].id,
        communityId: communities[0].id,
        likesCount: 5,
        commentsCount: 2,
      },
    }),
    prisma.post.create({
      data: {
        content: 'Acabei de voltar de um intercâmbio na Finlândia. Foi incrível conhecer o sistema educacional de lá!',
        authorId: users[1].id,
        communityId: communities[1].id,
        likesCount: 12,
        commentsCount: 4,
      },
    }),
    prisma.post.create({
      data: {
        content: 'Alguém já trabalhou com aprendizagem baseada em projetos? Gostaria de trocar experiências.',
        authorId: users[2].id,
        communityId: communities[2].id,
        likesCount: 8,
        commentsCount: 3,
      },
    }),
  ]);

  console.log(`✅ ${posts.length} posts criados`);

  // Adicionar comentários
  await Promise.all([
    prisma.comment.create({
      data: {
        content: 'Muito legal! Estou animado para participar!',
        postId: posts[0].id,
        authorId: users[1].id,
      },
    }),
    prisma.comment.create({
      data: {
        content: 'Que experiência incrível! Conte mais detalhes!',
        postId: posts[1].id,
        authorId: users[0].id,
      },
    }),
    prisma.comment.create({
      data: {
        content: 'Sim! Uso muito em minhas aulas. Funciona muito bem.',
        postId: posts[2].id,
        authorId: users[1].id,
      },
    }),
  ]);

  console.log('✅ Comentários adicionados');

  console.log('\n🎉 Seed concluído com sucesso!');
  console.log('\n📝 Credenciais de teste:');
  console.log('   Email: admin@pedagopass.com');
  console.log('   Email: professor@exemplo.com');
  console.log('   Email: joao@exemplo.com');
  console.log('   Senha (todos): 123456\n');
}

main()
  .catch((e) => {
    console.error('❌ Erro no seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
