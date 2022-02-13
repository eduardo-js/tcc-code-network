import { IJob } from 'models';
import React, { useEffect, useState } from 'react';
import { InfoSection, InfoSectionProps } from '../../components';
import { useAuth } from '../../contexts/Auth';
import { UrlPaths } from '../../enums';
import ApiService from '../../services/Api';

export const Jobs = () => {
  const { user } = useAuth();
  const [jobs, setJobs] = useState<IJob[]>();

  useEffect(() => {
    async function initialize() {
      const jobData = await ApiService.getJobs();
      setJobs(jobData);
    }
    initialize();
  }, []);

  const subscribe = async (jobId: any) => {
    try {
      const body = {
        jobs: [
          {
            _id: jobId,
            status: 'AWAITING' as const,
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
      {jobs &&
        jobs.map(job => {
          const jobSection: InfoSectionProps = {
            alt: '',
            buttonLabel: user ? 'Cadastre-se' : 'Saiba mais!',
            description: job.description || '',
            headline: job.name || '',
            img: job.image!,
            redirect: user ? UrlPaths.user : UrlPaths.login,
            onClick: () => subscribe(job._id),
          };

          return <InfoSection {...jobSection} />;
        })}
    </>
  );
};
