import { randomBytes, scryptSync } from "node:crypto";
import { UserRepository } from "../repositories/userRepository.ts";

export interface RegisterUserInput {
  name: string;
  email: string;
  password: string;
  role: "admin" | "owner" | "customer";
}

export class UserService {
  constructor(private userRepository: UserRepository = new UserRepository()) {}

  async getUsers() {
    return this.userRepository.findAll();
  }

  async createUser(input: RegisterUserInput) {
    if (!input.name || !input.email || !input.password || !input.role) {
      throw new Error("INVALID_USER_INPUT");
    }
    if (!["admin", "owner", "customer"].includes(input.role)) {
      throw new Error("INVALID_USER_ROLE");
    }

    const salt = randomBytes(16).toString("hex");
    const passwordHash = `scrypt:${salt}:${scryptSync(input.password, salt, 64).toString("hex")}`;
    const row = await this.userRepository.create({
      name: input.name,
      email: input.email,
      role: input.role,
      passwordHash,
    });
    const { passwordHash: _passwordHash, ...safeUser } = row;
    return safeUser;
  }
}
