import { Course } from '../entity/course';

export interface UpdateCourseRepository {
  updateCourse(course: Course): Promise<void>;
}
