import { Course, CourseType } from '@/domain/course/entity/course';
import { User, UserRole } from '@/domain/user/entity/user';
import { fake } from '../utils/fake-data-generator';

export const makeFakeUser = ({
  id = fake.uuid(),
  isActive = true,
  role = 'ADMINISTRATOR' as UserRole
} = {}) => {
  return new User({
    id,
    name: fake.name(),
    email: fake.email(),
    password: fake.password(),
    nameAbbreviation: 'ABCD',
    isActive,
    role,
    createdAt: new Date(),
    updatedAt: new Date()
  });
};

export const makeFakeCourse = ({
  id = fake.uuid(),
  type = 'GRADUATION' as CourseType,
  coordinatorId = fake.uuid()
} = {}) => {
  return new Course({
    id,
    name: fake.name(),
    type,
    acronym: 'ABCD',
    duration: 8,
    coordinatorId,
    createdAt: new Date(),
    updatedAt: new Date()
  });
};
