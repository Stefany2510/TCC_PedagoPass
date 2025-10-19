import bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { prisma } from '../lib/prisma';
import { UserRole } from '@prisma/client';

export class AuthError extends Error {
  public readonly statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.name = 'AuthError';
  }
}

export interface RegisterDTO {
  email: string;
  password: string;
  name: string;
  role?: UserRole;
  escola?: string;
  cidade?: string;
  estado?: string;
  bio?: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface JWTPayload {
  userId: string;
  email: string;
  role: UserRole;
}

class AuthService {
  private readonly SALT_ROUNDS = 10;
  private readonly JWT_SECRET = process.env.JWT_SECRET || 'pedagopass-secret-key-change-in-production';
  private readonly JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

  /**
   * Hash de senha usando bcrypt
   */
  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, this.SALT_ROUNDS);
  }

  /**
   * Comparar senha com hash
   */
  async comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  /**
   * Gerar token JWT
   */
  generateToken(payload: JWTPayload): string {
    return jwt.sign(
      payload,
      this.JWT_SECRET,
      { expiresIn: this.JWT_EXPIRES_IN as jwt.SignOptions['expiresIn'] }
    );
  }

  /**
   * Validar token JWT
   */
  validateToken(token: string): JWTPayload | null {
    try {
      const decoded = jwt.verify(token, this.JWT_SECRET) as JWTPayload;
      return decoded;
    } catch (error) {
      console.error('Token inválido:', error);
      return null;
    }
  }

  /**
   * Registrar novo usuário
   */
  async register(data: RegisterDTO) {
    // Validações
    if (!data.email || !data.password || !data.name) {
      throw new AuthError('Nome, e-mail e senha são obrigatórios', 400);
    }

    // Validar formato de e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      throw new AuthError('E-mail inválido', 400);
    }

    // Validar tamanho mínimo da senha
    if (data.password.length < 6) {
      throw new AuthError('A senha deve ter no mínimo 6 caracteres', 400);
    }

    // Verificar se usuário já existe
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email.toLowerCase() },
    });

    if (existingUser) {
      throw new AuthError('E-mail já cadastrado', 409);
    }

    // Hash da senha
    const passwordHash = await this.hashPassword(data.password);

    // Criar usuário no banco
    const newUser = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email.toLowerCase(),
        password: passwordHash,
        role: data.role || UserRole.TEACHER,
        escola: data.escola,
        cidade: data.cidade,
        estado: data.estado,
        bio: data.bio,
      },
    });

    // Gerar token
    const token = this.generateToken({
      userId: newUser.id,
      email: newUser.email,
      role: newUser.role,
    });

    // Retornar usuário sem o hash da senha
    const { password: _, ...userWithoutPassword } = newUser;

    return {
      user: userWithoutPassword,
      token,
    };
  }

  /**
   * Login de usuário
   */
  async login(data: LoginDTO) {
    // Validações
    if (!data.email || !data.password) {
      throw new AuthError('E-mail e senha são obrigatórios', 400);
    }

    // Buscar usuário
    const user = await prisma.user.findUnique({
      where: { email: data.email.toLowerCase() },
    });

    if (!user) {
      throw new AuthError('E-mail ou senha incorretos', 401);
    }

    // Verificar senha
    const isPasswordValid = await this.comparePassword(data.password, user.password);
    if (!isPasswordValid) {
      throw new AuthError('E-mail ou senha incorretos', 401);
    }

    // Gerar token
    const token = this.generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    // Retornar usuário sem o hash da senha
    const { password: _, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      token,
    };
  }

  /**
   * Buscar usuário por ID
   */
  async getUserById(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return null;
    }

    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  /**
   * Buscar usuário por e-mail
   */
  async getUserByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user) {
      return null;
    }

    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  /**
   * Listar todos os usuários (para debug/admin)
   */
  async getAllUsers() {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        avatarUrl: true,
        bio: true,
        escola: true,
        cidade: true,
        estado: true,
        pontos: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return users;
  }

  /**
   * Atualizar perfil do usuário
   */
  async updateProfile(userId: string, data: {
    name?: string;
    avatarUrl?: string;
    bio?: string;
    escola?: string;
    cidade?: string;
    estado?: string;
  }) {
    const user = await prisma.user.update({
      where: { id: userId },
      data,
    });

    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  /**
   * Alterar senha
   */
  async changePassword(userId: string, oldPassword: string, newPassword: string) {
    // Buscar usuário
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    // Verificar senha antiga
    const isPasswordValid = await this.comparePassword(oldPassword, user.password);
    if (!isPasswordValid) {
      throw new Error('Senha atual incorreta');
    }

    // Validar nova senha
    if (newPassword.length < 6) {
      throw new Error('A nova senha deve ter no mínimo 6 caracteres');
    }

    // Hash da nova senha
    const newPasswordHash = await this.hashPassword(newPassword);

    // Atualizar senha
    await prisma.user.update({
      where: { id: userId },
      data: { password: newPasswordHash },
    });
  }
}

export default new AuthService();
