import { ICourse } from 'models';
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useLocation } from 'react-router-dom';
import { DefaultButton, InfoSection, InfoSectionProps } from '../../components';
import ApiService from '../../services/Api';

export const Course = () => {
  const location = useLocation();
  const { courseId } = location.state as Record<string, string>;
  const [course, setCourse] = useState<ICourse>();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [videoId, setVideoId] = useState('');
  const [videoName, setVideoName] = useState('');
  const [lessonNumber, setLessonNumber] = useState(0);

  useEffect(() => {
    async function initialize() {
      const courseData = await ApiService.getCourse(courseId);
      setCourse(courseData);
    }
    initialize();
  }, []);

  const handleClick = (videoId: string, videoName: string, lessonNumber: number) => {
    setIsOpen(true);
    setVideoId(videoId);
    setVideoName(videoName);
    setLessonNumber(lessonNumber);
  };

  function closeModal() {
    setIsOpen(false);
  }
  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        style={{ content: { paddingTop: '5rem', textAlign: 'center' } }}
      >
        <h2>{videoName}</h2>
        {videoId && (
          <video width="650" height="700px" controls muted>
            <source src={`http://localhost:4000/api/v1/video/?filename=${videoId}`} type="video/mp4"></source>
          </video>
        )}
        <DefaultButton
          onClick={() => {
            const body = {
              courses: [
                {
                  _id: courseId,
                  lesson: lessonNumber,
                },
              ],
            };
            ApiService.patchUser(body);
            closeModal();
          }}
          style={{ margin: '1rem' }}
        >
          close
        </DefaultButton>
      </Modal>

      <h1 style={{ padding: '5rem ' }}>{course?.name}</h1>
      {course &&
        course?.lessons?.map(
          (
            lesson: {
              lessonDescription: any;
              lessonName: any;
              lessonImage: any;
              videoPath: string;
              videoName: string;
            },
            index,
          ) => {
            const courseSection: InfoSectionProps = {
              alt: '',
              buttonLabel: 'Assistir',
              description: lesson.lessonDescription || '',
              headline: lesson.lessonName || '',
              img: lesson?.lessonImage || lesson.lessonName,
              onClick: () => handleClick(lesson.videoPath, lesson.videoName, index),
            };
            return <InfoSection {...courseSection} />;
          },
        )}
    </>
  );
};
