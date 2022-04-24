import { ICourse, ILesson } from 'models';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, DefaultButton } from '../../components';
import { useAuth } from '../../contexts/Auth';
import { Technology, UrlPaths } from '../../enums';
import ApiService from '../../services/Api';

export const CreateCourse = () => {
  const { user } = useAuth();
  const history = useHistory();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [technologies, setTechnologies] = useState('JavaScript');
  const [lessons, setLessons] = useState<Partial<ILesson>[]>([]);
  const [whichSubmit, setWhichSubmit] = useState<string>('');
  const [fileList, setFileList] = useState<File[]>([]);
  const [height, setHeight] = useState<number>(70);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (whichSubmit === 'Add') return;
    const formData = new FormData();
    for await (const [index, lesson] of lessons!.entries!()) {
      formData.append('filename', fileList[index + 2]);
      const { videoId } = await ApiService.uploadVideo(formData);
      lessons[index].videoPath = videoId;
      lessons[index].lessonImage =
        `data:${fileList[index + 1].type};base64,` +
        btoa(
          new Uint8Array(await fileList[index + 1].arrayBuffer()).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            '',
          ),
        );
    }
    const data = {
      _id: user!._id!,
      name,
      image:
        `data:${fileList[0].type};base64,` +
        btoa(
          new Uint8Array(await fileList[0].arrayBuffer()).reduce((data, byte) => data + String.fromCharCode(byte), ''),
        ),
      description,
      technologies: technologies,
      lessons,
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
          margin: '2rem',
          height: `${height}vh`,
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
        <label htmlFor="courseImage">Escolha a foto principal do curso</label>
        <input
          type={'file'}
          name="courseImage"
          onChange={e => {
            fileList.push(e!.target!.files![0]!);
            setFileList([...fileList]);
          }}
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
            <label htmlFor={`courseImage{index}`}>Escolha a foto da aula {index}</label>
            <input
              type={'file'}
              name={`courseImage${index}`}
              onChange={e => {
                fileList.push(e!.target!.files![0]!);
                setFileList([...fileList]);
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
            <label htmlFor={`videoFile${index}`}>Escolha o arquivo de vídeo da aula {index}</label>
            <input
              type={'file'}
              name={`videoFile${index}`}
              onChange={e => {
                fileList.push(e!.target!.files![0]!);
                setFileList([...fileList]);
              }}
              style={{ margin: '0.5rem' }}
            />
          </>
        ))}
        <button
          onClick={() => {
            setWhichSubmit('Add');
            setHeight(height + 15);
            setLessons([
              ...lessons,
              {
                lessonName: '',
                lessonDescription: '',
                videoName: '',
                videoPath: '',
                lessonImage: '',
              },
            ]);
          }}
        >
          Adicionar Aula
        </button>

        <DefaultButton style={{ margin: '0.5rem' }} onClick={() => setWhichSubmit('submit')}>
          {' '}
          Enviar
        </DefaultButton>
      </form>
    </Container>
  );
};
