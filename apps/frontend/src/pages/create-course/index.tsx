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
  const [courseImage, setCourseImage] = useState('');
  const [lessons, setLessons] = useState<Partial<ILesson>[]>([]);
  const [whichSubmit, setWhichSubmit] = useState<string>('');
  const [fileList, setFileList] = useState<File[]>([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (whichSubmit === 'Add') return;
    console.log(fileList);

    const formData = new FormData();
    for (const [index, lesson] of lessons!.entries!()) {
      if (index === 0) continue;
      if (index % 2 !== 0) {
        formData.append('filename', lesson.videoPath!);
        const { videoId } = await ApiService.uploadVideo(formData);
        lessons[index].videoPath = videoId;
      } else {
        lessons[index].lessonImage = btoa(
          new Uint8Array(await fileList[0].arrayBuffer()).reduce((data, byte) => data + String.fromCharCode(byte), ''),
        );
      }
    }
    const data = {
      name,
      image: btoa(
        new Uint8Array(await fileList[0].arrayBuffer()).reduce((data, byte) => data + String.fromCharCode(byte), ''),
      ),
      description,
      details: [details],
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
        <label htmlFor="courseImage">Escolha a foto principal do curso</label>
        <input
          type={'file'}
          value={details}
          name="courseImage"
          onChange={e => {
            fileList.push(e!.target!.files![0]!);
            setFileList([...fileList]);
            console.log(e.target.files);
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
              placeholder={'Imagem da Aula'}
              name={`courseImage{index}`}
              value={lessons[index].lessonImage || ''}
              onChange={e => {
                fileList.push(e!.target!.files![0]!);
                setFileList([...fileList]);
                console.log(e.target.files);
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
              placeholder={'Vídeo'}
              name={`videoFile${index}`}
              onChange={e => {
                fileList.push(e!.target!.files![0]!);
                setFileList([...fileList]);
                console.log(e.target.files);
              }}
              style={{ margin: '0.5rem' }}
            />
          </>
        ))}
        <button
          onClick={() => {
            setWhichSubmit('Add');
            console.log(lessons);
            setLessons([
              ...lessons,
              {
                lessonName: '',
                lessonDescription: '',
                videoDuration: '',
                videoName: '',
                videoPath: '',
              },
            ]);
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
