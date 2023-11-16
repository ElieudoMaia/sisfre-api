import { Course } from '../entity/course';

export interface CreateCourseRepository {
  createCourse(course: Course): Promise<void>;
}
