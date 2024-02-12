import { Course, CourseType } from '@/domain/course/entity/course';
import {
  DayOffSchool,
  DayOffSchoolType
} from '@/domain/day-off-school/entity/day-off-school';
import {
  DayOfWeek,
  SchoolSaturday
} from '@/domain/school-saturday/entity/school-saturday';
import { Semester } from '@/domain/semester/entity/semester';
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
  coordinatorId = fake.uuid(),
  duration = 8
} = {}) => {
  return new Course({
    id,
    name: fake.name(),
    type,
    acronym: 'ABCD',
    duration,
    coordinatorId,
    createdAt: new Date(),
    updatedAt: new Date()
  });
};

export const makeFakeSchoolSaturday = ({
  id = fake.uuid(),
  createdAt = new Date()
} = {}) => {
  return new SchoolSaturday({
    id,
    dayOfWeek: DayOfWeek.MONDAY,
    date: new Date(2101, 0, 1),
    createdAt
  });
};
export const makeFakeDayOffSchool = ({
  id = fake.uuid(),
  createdAt = new Date()
} = {}) => {
  return new DayOffSchool({
    id,
    description: fake.random(15),
    type: DayOffSchoolType.HOLIDAY,
    dateBegin: new Date(2101, 0, 1),
    dateEnd: new Date(2101, 0, 2),
    createdAt
  });
};

export const makeFakeSemester = ({ id = fake.uuid() } = {}) => {
  return new Semester({
    id,
    year: new Date().getFullYear(),
    semester: 1,
    startFirstStage: new Date(),
    endFirstStage: new Date(),
    startSecondStage: new Date(),
    endSecondStage: new Date(),
    type: 'REGULAR',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  });
};
