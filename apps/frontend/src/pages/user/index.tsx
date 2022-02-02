import { ICourse, IJob } from 'models';
import React, { useEffect, useState } from 'react';
import { BsBook } from 'react-icons/bs';
import { RiSuitcaseLine } from 'react-icons/ri';
import { useHistory } from 'react-router';
import { Container, DefaultButton } from '../../components';
import { useAuth } from '../../contexts/Auth';
import { UrlPaths } from '../../enums';
import ApiService from '../../services/Api';

export const User = () => {
  const { user } = useAuth();
  const history = useHistory();
  const [content, showContent] = useState<string>('cursos');
  const [courseInfo, setCourseInfo] = useState<ICourse[] | null>(null);
  const [jobInfo, setJobInfo] = useState<IJob[] | null>(null);

  useEffect(() => {
    async function initialize() {
      const userData = await ApiService.getUser(user!._id!);
      const courses = [];
      if (userData.courses) {
        for (const course of userData.courses) {
          courses.push(await ApiService.getCourse(course._id));
        }
      }
      const jobs = [];
      if (userData.jobs) {
        for (const job of userData.jobs) {
          jobs.push(await ApiService.getJob(job._id));
        }
      }
      setJobInfo(jobs);
      setCourseInfo(courses);
    }
    initialize();
  }, []);

  return (
    <Container style={{ textAlign: 'center', width: '100vh', height: '100vh' }}>
      <div style={{ display: 'flex', padding: '5rem' }}>
        <div style={{ display: 'flex', flex: '.4', flexDirection: 'column', width: '25%' }}>
          <div>{user!._id!}</div>
          <div>{user!.name!}</div>
          <div style={{ paddingTop: '3rem' }}>
            <BsBook style={{ marginRight: '1rem' }} />
            <button onClick={() => showContent('cursos')}>Meus Cursos</button>
          </div>
          <div>
            <RiSuitcaseLine style={{ marginRight: '1rem' }} />
            <button onClick={() => showContent('vagas')}>Minhas Vagas</button>
          </div>
        </div>
        <div style={{ flex: '1' }}>
          {content === 'cursos' &&
            courseInfo &&
            courseInfo.map(course => {
              return (
                <div style={{ margin: '1rem' }}>
                  <h1 style={{ margin: '1rem' }}>{course.name}</h1>
                  <DefaultButton onClick={() => history.push(UrlPaths.course, { courseId: course._id })}>
                    Acessar
                  </DefaultButton>
                </div>
              );
            })}

          {content === 'vagas' &&
            jobInfo &&
            jobInfo.map(job => {
              return (
                <>
                  <div>{job.name}</div>
                  <div>{job.description}</div>
                </>
              );
            })}
        </div>
      </div>
    </Container>
  );
};
