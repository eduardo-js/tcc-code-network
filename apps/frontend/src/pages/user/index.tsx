import { ICourse, IJob, IUser } from 'models';
import React, { useEffect, useState } from 'react';
import { BsBook } from 'react-icons/bs';
import { RiSuitcaseLine } from 'react-icons/ri';
import { useHistory } from 'react-router';
import { NotFound } from '../../assets';
import { Container, DefaultButton } from '../../components';
import { useAuth } from '../../contexts/Auth';
import { UrlPaths } from '../../enums';
import ApiService from '../../services/Api';

export const User = () => {
  const { user } = useAuth();
  const [userData, setUser] = useState<IUser>(user!);
  const history = useHistory();
  const [content, showContent] = useState<string>('cursos');
  const [courseInfo, setCourseInfo] = useState<ICourse[]>([]);
  const [jobInfo, setJobInfo] = useState<IJob[]>([]);

  useEffect(() => {
    async function initialize() {
      const userData = await ApiService.getUser(user!._id!);
      setUser(userData);
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
      <div style={{ display: 'flex', padding: '5rem', margin: '2rem' }}>
        <div
          style={{
            display: 'flex',
            flex: '.4',
            flexDirection: 'column',
            width: '30%',
            margin: '1rem',
            padding: '.5rem',
            border: 'solid',
            borderWidth: '1px',
            borderColor: 'black',
            backgroundColor: '#F6F7F8',
          }}
        >
          <img
            src={`https://ui-avatars.com/api/?name=${userData!.name!}`}
            style={{ borderRadius: '50%', marginBottom: '1rem' }}
          />
          <div>{userData && userData!._id!}</div>
          <div>{userData && userData!.name!}</div>
          <div style={{ paddingTop: '3rem', verticalAlign: 'middle' }}>
            <DefaultButton onClick={() => showContent('cursos')} style={{ fontSize: '1.2rem' }} primary>
              <BsBook style={{ marginRight: '1rem' }} />
              Meus Cursos
            </DefaultButton>
          </div>
          {user && user.permission === 0 && (
            <div style={{ margin: '1rem' }}>
              <DefaultButton onClick={() => showContent('vagas')} style={{ fontSize: '1.2rem' }} primary>
                <RiSuitcaseLine style={{ marginRight: '1rem' }} />
                Minhas Vagas
              </DefaultButton>
            </div>
          )}
        </div>
        <div style={{ flex: '1', backgroundColor: '#F2F7F2', textAlign: 'center', verticalAlign: 'center' }}>
          {content === 'cursos' &&
            (courseInfo?.length !== 0 ? (
              courseInfo.map(course => {
                return (
                  <div
                    style={{
                      margin: '1rem',
                      borderBottom: 'solid',
                      borderBottomWidth: '1px',
                      borderBottomColor: 'grey',
                      backgroundColor: '#F6F7F8',
                    }}
                  >
                    <h2 style={{ margin: '1rem', textAlign: 'left' }}>{course.name}</h2>
                    <div style={{ margin: '1rem' }}>
                      Progresso:{' '}
                      {`${
                        (userData!.courses!.find(el => el._id === course._id)!.lesson! /
                          (course!.lessons!.length - 1)) *
                        100
                      }%`}
                    </div>
                    <DefaultButton
                      style={{ margin: '1rem' }}
                      onClick={() => history.push(UrlPaths.course, { courseId: course._id })}
                    >
                      Continuar
                    </DefaultButton>
                  </div>
                );
              })
            ) : (
              <>
                <img src={NotFound} style={{ width: '80%', height: '80%' }}></img>
                <h3 style={{ margin: '1rem', textAlign: 'center', marginTop: '3%' }}>
                  Parece que não tem nada por aqui, cadastre-se em um de nossos cursos!
                </h3>
              </>
            ))}
          {content === 'vagas' &&
            (jobInfo?.length !== 0 ? (
              jobInfo.map(job => {
                return (
                  <div
                    style={{
                      margin: '1rem',
                      borderBottom: 'solid',
                      borderBottomWidth: '1px',
                      borderBottomColor: 'grey',
                      backgroundColor: '#F6F7F8',
                    }}
                  >
                    <h2 style={{ margin: '1rem', textAlign: 'left' }}>{job.name}</h2>
                    <h4>{job.description}</h4>
                    {user!.jobs!.find(el => el._id === job._id)!.status === 'AWAITING' ? (
                      <div>{job.owner} ainda está analisando seu perfil </div>
                    ) : user!.jobs!.find(el => el._id === job._id)!.status === 'REJECTED' ? (
                      <div>Que pena, {job.owner} decidiu não seguir com a sua candidatura</div>
                    ) : (
                      <div style={{ margin: '1rem' }}>
                        {' '}
                        <h3 style={{ color: 'green' }}> Parabéns!</h3> {job.owner} vai te contatar via email para seguir
                        com a sua candidatura
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <>
                <img src={NotFound} style={{ width: '80%', height: '80%' }}></img>
                <h3 style={{ margin: '1rem', textAlign: 'center', marginTop: '3%' }}>
                  Parece que não tem nada por aqui, cadastre-se em uma de nossas vagas!
                </h3>
              </>
            ))}
        </div>
      </div>
    </Container>
  );
};
