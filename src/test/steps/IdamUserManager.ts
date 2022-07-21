/* eslint-disable no-console */

import axios, { AxiosInstance } from 'axios';

export class IdamUserManager {
  client: AxiosInstance;
  users: Set<string> = new Set();
  caseWorker: string;

  constructor(idamUrl: string) {
    this.client = axios.create({
      baseURL: new URL('/', idamUrl).toString(),
    });
    this.caseWorker = '';
  }

  async createUser(email: string, password: string, role = ['citizen', 'adoption-citizen-user']): Promise<void> {
    await this.create(email, password, role);
    this.users.add(email);
  }

  async createCaseWorker(
    email: string,
    password: string,
    role = ['caseworker', 'caseworker-adoption', 'caseworker-adoption-courtadmin_beta']
  ): Promise<void> {
    await this.create(email, password, role);
    this.caseWorker = email;
  }

  async create(email: string, password: string, role: string[]): Promise<void> {
    try {
      await this.client.post('/testing-support/accounts', {
        email,
        password,
        roles: role.map(r => {
          return {
            code: r,
          };
        }),
        forename: 'FunctionalTest',
        surname: 'LastNameTest',
      });
      console.info('Created user', email);
    } catch (e) {
      console.info('Error creating user', email, e);
      throw e;
    }
  }

  async delete(email: string): Promise<void> {
    try {
      await this.client.delete(`/testing-support/accounts/${email}`);
      this.users.delete(email);
      console.info('Deleted user', email);
    } catch (e) {
      console.info('Error deleting user', email, e);
    }
  }

  async deleteAll(): Promise<void> {
    for (const user of this.users) {
      await this.delete(user);
    }
    if (this.caseWorker) {
      await this.delete(this.caseWorker);
    }
  }

  async clearAndKeepOnlyOriginalUser(): Promise<void> {
    const users = Array.from(this.users);
    const firstUser = users.shift() as string;

    try {
      await Promise.all(users.map(user => this.client.delete(user)));
    } catch (err) {
      console.log('Error deleting users');
    }

    this.users = new Set([firstUser]);
  }

  getCurrentUsername(): string {
    return Array.from(this.users).pop() as string;
  }

  getUsername(index: number): string {
    return Array.from(this.users)[index] as string;
  }

  getCaseWorker(): string {
    return this.caseWorker;
  }
}
