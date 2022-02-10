import { ICourse } from 'models';
import React, { useEffect, useState } from 'react';
import { InfoSection, InfoSectionProps } from '../../components';
import { useAuth } from '../../contexts/Auth';
import { UrlPaths } from '../../enums';
import ApiService from '../../services/Api';

export const Courses = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState<ICourse[]>();

  useEffect(() => {
    async function initialize() {
      const courseData = await ApiService.getCourses();
      setCourses(courseData);
    }
    initialize();
  }, []);

  const subscribe = async (courseId: string) => {
    try {
      const body = {
        courses: [
          {
            _id: courseId,
            lesson: 0,
          },
        ],
      };
      await ApiService.patchUser(body);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {courses &&
        courses.map(course => {
          const courseSection: InfoSectionProps = {
            alt: '',
            buttonLabel: user ? 'Cadastre-se' : 'Saiba mais!',
            description: course.description || '',
            headline: course.name || '',
            img: course.image,
            redirect: user ? { pathname: UrlPaths.course, state: { courseId: course._id } } : UrlPaths.login,
            onClick: () => subscribe(course._id),
          };
          return <InfoSection {...courseSection} />;
        })}
    </>
  );
};
