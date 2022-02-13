import { ICourse, ILesson } from 'models';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, DefaultButton } from '../../components';
import { Technology, UrlPaths } from '../../enums';
import ApiService from '../../services/Api';

export const CreateCourse = () => {
  const history = useHistory();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [details, setDetails] = useState('');
  const [technologies, setTechnologies] = useState('');
  const [lessons, setLessons] = useState<Partial<ILesson>[]>([]);
  const [whichSubmit, setWhichSubmit] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (whichSubmit === 'Add') return;
    const formData = new FormData();

    for (const lesson of lessons!) {
      formData.append('filename', lesson.videoPath!);
      const videoId = await ApiService.uploadVideo(formData);
    }

    const data = {
      name,
      description,
      details: [details],
      technologies: technologies,
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
        <label htmlFor="Tecnologia">Escolha a tecnologia</label>
        <select name="Tecnologia" onChange={e => setTechnologies(e.target.value)}>
          {Object.values(Technology).map(el => (
            <option value={el}>{el}</option>
          ))}
        </select>
        {lessons.map((x, index) => (
          <>
            <div>{`Aula ${index}`}</div>
            <input
              type={'text'}
              placeholder={'Nome da Aula'}
              value={lessons[index].lessonName || ''}
              onChange={e => {
                lessons[index].lessonName = e.target.value;
                setLessons([...lessons]);
              }}
              style={{ margin: '0.5rem' }}
            />
            <input
              type={'text'}
              placeholder={'Imagem da Aula'}
              value={lessons[index].lessonImage || ''}
              onChange={e => {
                lessons[index].lessonImage = e.target.value;
                setLessons([...lessons]);
              }}
              style={{ margin: '0.5rem' }}
            />
            <input
              type={'text'}
              placeholder={'Descrição da Aula'}
              value={lessons[index].lessonDescription || ''}
              onChange={e => {
                lessons[index].lessonDescription = e.target.value;
                setLessons([...lessons]);
              }}
              style={{ margin: '0.5rem' }}
            />
            <input
              type={'file'}
              placeholder={'Vídeo'}
              value={lessons[index].videoPath || ''}
              onChange={e => {
                lessons[index].videoPath = e.target.value;
                setLessons([...lessons]);
              }}
              style={{ margin: '0.5rem' }}
            />
          </>
        ))}
        <button
          onClick={() => {
            setWhichSubmit('Add');
            console.log(lessons);
            setLessons([...lessons, {}]);
          }}
        >
          Add
        </button>

        <DefaultButton style={{ margin: '0.5rem' }} onClick={() => setWhichSubmit('submit')}>
          {' '}
          Enviar
        </DefaultButton>
      </form>
    </Container>
  );
};
