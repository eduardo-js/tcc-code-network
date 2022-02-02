import { ICourse, ILesson } from 'models';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, DefaultButton } from '../../components';
import { UrlPaths } from '../../enums';
import ApiService from '../../services/Api';

export const CreateCourse = () => {
  const history = useHistory();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [details, setDetails] = useState('');
  const [technologies, setTechnologies] = useState('');
  const [lessonName, setLessonName] = useState('');
  const [lessonDescription, setLessonDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('filename', selectedFile!);
    const videoId = await ApiService.uploadVideo(formData);
    const lessons: Partial<ILesson[]> = [];
    lessons.push({
      lessonName: 'a' as unknown as string,
      lessonDescription: 'b' as unknown as string,
      videoName: videoId as unknown as string,
      videoPath: videoId as unknown as string,
      videoDuration: 'any',
    } as any);
    const data = {
      name,
      description,
      details: [details],
      technologies: 'JavaScript',
      lessons,
      image: 'image',
    };

    await ApiService.createCourse(data as unknown as ICourse);
    history.push(UrlPaths.courses);
  };

  return (
    <Container>
      <h1 style={{ paddingLeft: '2rem', margin: '1rem' }}>Criar Curso</h1>
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          textAlign: 'center',
          padding: '1rem',
          alignItems: 'center',
          margin: '2rem',
          height: '70vh',
        }}
      >
        <input
          type={'text'}
          placeholder={'Nome do Curso'}
          value={name}
          onChange={e => setName(e.target.value)}
          style={{ margin: '0.5rem' }}
        />
        <input
          type={'text'}
          placeholder={'Descrição'}
          value={description}
          onChange={e => setDescription(e.target.value)}
          style={{ margin: '0.5rem' }}
        />
        <input
          type={'text'}
          placeholder={'Detalhes'}
          value={details}
          onChange={e => setDetails(e.target.value)}
          style={{ margin: '0.5rem' }}
        />
        <input
          type={'text'}
          placeholder={'Tecnologia'}
          value={technologies}
          onChange={e => setTechnologies(e.target.value)}
          style={{ margin: '0.5rem' }}
        />

        <input
          type={'text'}
          placeholder={'Nome da Aula'}
          value={lessonName}
          onChange={e => setLessonName(e.target.value)}
          style={{ margin: '0.5rem' }}
        />
        <input
          type={'text'}
          placeholder={'Descrição da aula'}
          value={lessonDescription}
          onChange={e => setLessonDescription(e.target.value)}
          style={{ margin: '0.5rem' }}
        />

        <input type="file" onChange={(e: any) => setSelectedFile(e.target!.files[0])} style={{ margin: '0.5rem' }} />
        <DefaultButton style={{ margin: '0.5rem' }}> Enviar</DefaultButton>
      </form>
    </Container>
  );
};
