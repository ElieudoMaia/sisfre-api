import { faker } from '@faker-js/faker/locale/pt_BR';

export const fake = {
  uuid() {
    return faker.string.uuid();
  },
  name() {
    return faker.person.fullName();
  },
  email() {
    return faker.internet.email();
  },
  password() {
    return faker.internet.password();
  },
  jwtToken() {
    return faker.string.alpha(32);
  },
  random(size: number) {
    return faker.string.alpha(size);
  }
};
