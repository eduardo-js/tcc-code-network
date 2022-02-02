import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ButtonProps, Container, DefaultButton } from '..';
import { useAuth } from '../../contexts/Auth';
import ApiService from '../../services/Api';
import {
  FormColumn,
  FormInput,
  FormInputRow,
  FormLabel,
  FormMessage,
  FormRow,
  FormSection,
  FormTitle,
  FormWrapper,
  Img,
  ImgWrapper,
} from './style';
import validateForm from './validate';

interface FormProps {
  small: boolean;
  lightBg: boolean;
  imgStart: boolean;
  lightTitle: boolean;
  lightText: boolean;
  errorLightBg: boolean;
  errorMessage: string;
  hasError?: boolean;
}

export const Form = ({
  small = false,
  big = true,
  bigFont = true,
  primary = true,
  type = 'button',
  lightBg = true,
  imgStart = true,
  lightTitle = true,
  errorLightBg = false,
  hasError,
  lightText = false,
}: FormProps & ButtonProps) => {
  const [name, setName] = useState('');
  const [_id, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [isTeacher, setIsTeacher] = useState(false);
  const [telephone, setTelephone] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const { Login } = useAuth();
  const history = useHistory();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const resultError = validateForm({ name, email: _id, password, confirmPass });

    if (resultError !== null) {
      setError(resultError);
      return;
    }
    setName(name);
    setEmail(_id);
    setPassword(password);
    setConfirmPass(confirmPass);
    setIsTeacher(isTeacher);
    setError(null);
    const data = {
      _id: _id,
      password: password,
      name: name,
      telephone: telephone,
      permission: isTeacher ? 1 : 0,
    };
    try {
      await ApiService.registerUser(data);
      setSuccess('Cadastro concluído!');
      Login({ _id: data._id, password: data.password });
      history.push('/');
    } catch (error) {
      setError('Não foi possível realizar o cadastro, tente novamente mais tarde');
    }
  };

  const messageVariants = {
    hidden: { y: 30, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { delay: 0.2, duration: 0.4 } },
  };

  const formData = [
    {
      label: 'Nome',
      value: name,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value),
      type: 'text',
    },
    {
      label: 'Email',
      value: _id,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value),
      type: '_id',
    },
    {
      label: 'Telephone',
      value: telephone,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => setTelephone(e.target.value),
      type: 'telephone',
    },
    {
      label: 'Senha',
      value: password,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value),
      type: 'password',
    },
    {
      label: 'Repetir Senha',
      value: confirmPass,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => setConfirmPass(e.target.value),
      type: 'password',
    },
  ];
  return (
    <FormSection lightBg={lightBg}>
      <Container>
        <FormRow>
          <FormColumn small={small}>
            <ImgWrapper imgStart={imgStart}>
              <Img
                src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGRhdGEtbmFtZT0iTGF5ZXIgMSIgd2lkdGg9Ijc5MyIgaGVpZ2h0PSI1NTEuNzMxNTIiIHZpZXdCb3g9IjAgMCA3OTMgNTUxLjczMTUyIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PGVsbGlwc2UgY3g9IjE1OCIgY3k9IjUzOS43MzE1MiIgcng9IjE1OCIgcnk9IjEyIiBmaWxsPSIjZTZlNmU2Ii8+PHBhdGggZD0iTTMyNC4yNzIyNywyOTYuNTUzNzdjMjcuNDk2NzYtMTEuNjk1Myw2MS43NDQ0Mi00LjI4NTI4LDk1LjE5MDkyLjg1NzU3LjMxMTI0LTYuMjI4LDQuMDgzODUtMTMuODA3ODIuMTMyLTE4LjE1Mjg0LTQuODAxMTUtNS4yNzg4LTQuMzU5MTctMTAuODI1MjktMS40NzAwOC0xNi40MDM3NSw3LjM4Nzg4LTE0LjI2NS0zLjE5NjktMjkuNDQzNzUtMTMuODg0MjgtNDIuMDY0N2EyMy42NjkzNywyMy42NjkzNywwLDAsMC0xOS43NTUzNy04LjI5MTc5bC0xOS43OTc1LDEuNDE0MTFBMjMuNzA5MzksMjMuNzA5MzksMCwwLDAsMzQzLjYzNSwyMzAuODU4NTF2MGMtNC43MjcyNCw2LjQyOTE3LTcuMjU3MzYsMTIuODQwNTUtNS42NjQzOCwxOS4yMTg1NC03LjA4MDY1LDQuODM4ODItOC4yNzAyOSwxMC42Nzk3Ny01LjA4ODUxLDE3LjI2NDQsMi42OTgsNC4xNDU5MiwyLjY2OTI4LDguMTgxNjEtLjEyMjc1LDEyLjEwNTZhNTUuODkwNzksNTUuODkwNzksMCwwLDAtOC4zMTAxMSwxNi41MDYxWiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTIwMy41IC0xNzQuMTM0MjQpIiBmaWxsPSIjMmYyZTQxIi8+PHBhdGggZD0iTTk3Ny43MDg4OSw2NTEuMDk3MjdINDE3LjI5MTExQTE4Ljc5MTExLDE4Ljc5MTExLDAsMCwxLDM5OC41LDYzMi4zMDYxNmgwcTMwNC43MjctMzUuNDE1MTIsNTk4LDBoMEExOC43OTExMSwxOC43OTExMSwwLDAsMSw5NzcuNzA4ODksNjUxLjA5NzI3WiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTIwMy41IC0xNzQuMTM0MjQpIiBmaWxsPSIjMmYyZTQxIi8+PHBhdGggZD0iTTk5Ni41LDYzMy40MTE1MWwtNTk4LTEuMTA1MzYsNjkuMzA2MTEtMTE2LjYxNTUzLjMzMTYtLjU1MjY4VjI1OC4xMzA1N2EyMy43NTIyLDIzLjc1MjIsMCwwLDEsMjMuNzU0MTgtMjMuNzU0MThIODk5Ljc5MmEyMy43NTIyLDIzLjc1MjIsMCwwLDEsMjMuNzU0MTgsMjMuNzU0MThWNTE2LjkwNjQ5WiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTIwMy41IC0xNzQuMTM0MjQpIiBmaWxsPSIjM2YzZDU2Ii8+PHBhdGggZD0iTTQ5MS4zNTAyOCwyNTAuOTU2NzlhNy43NDYyMyw3Ljc0NjIzLDAsMCwwLTcuNzM3NTMsNy43Mzc1M1Y0OTMuMDMwNzNhNy43NDY1Nyw3Ljc0NjU3LDAsMCwwLDcuNzM3NTMsNy43Mzc1Mkg5MDMuNjQ5NzJhNy43NDY5MSw3Ljc0NjkxLDAsMCwwLDcuNzM3NTMtNy43Mzc1MlYyNTguNjk0MzJhNy43NDY1Nyw3Ljc0NjU3LDAsMCwwLTcuNzM3NTMtNy43Mzc1M1oiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yMDMuNSAtMTc0LjEzNDI0KSIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik00OTMuMDc3OTQsNTMxLjcxODM1YTMuMzI1MjIsMy4zMjUyMiwwLDAsMC0zLjAxMjc1LDEuOTMwMDZsLTIxLjM1NTM3LDQ2LjQyNTE0YTMuMzE1OTQsMy4zMTU5NCwwLDAsMCwzLjAxMjIxLDQuNzAyMUg5MjAuODE0MTFhMy4zMTU3LDMuMzE1NywwLDAsMCwyLjk2NTI2LTQuNzk5MjVMOTAwLjU2NjgsNTMzLjU1MTI2YTMuMjk5MjYsMy4yOTkyNiwwLDAsMC0yLjk2NTI2LTEuODMyOTFaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjAzLjUgLTE3NC4xMzQyNCkiIGZpbGw9IiMyZjJlNDEiLz48Y2lyY2xlIGN4PSI0OTIuMzQxOTYiIGN5PSI2Ny45Nzk2NyIgcj0iNC45NzQxMiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik02NTEuNjk5ODYsNTkzLjYxODUzYTMuMzIxMTQsMy4zMjExNCwwLDAsMC0zLjIwMTY1LDIuNDUzNmwtNS4zNTY3OSwxOS44OTY0OWEzLjMxNTc2LDMuMzE1NzYsMCwwLDAsMy4yMDE2Niw0LjE3ODU2aDEwMS44NzRhMy4zMTUzMSwzLjMxNTMxLDAsMCwwLDMuMTMyNTctNC40MDA5M2wtNi44ODY5MS0xOS44OTY0OWEzLjMxNzg0LDMuMzE3ODQsMCwwLDAtMy4xMzM2Ni0yLjIzMTIzWiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTIwMy41IC0xNzQuMTM0MjQpIiBmaWxsPSIjMmYyZTQxIi8+PHBvbHlnb24gcG9pbnRzPSI3MjAuMDQ2IDMzNy4xMzUgNzIwLjA0NiAzNDEuNTU2IDI2NC4zMDYgMzQxLjU1NiAyNjQuNjQ5IDM0MS4wMDQgMjY0LjY0OSAzMzcuMTM1IDcyMC4wNDYgMzM3LjEzNSIgZmlsbD0iIzJmMmU0MSIvPjxjaXJjbGUgY3g9IjcwNy4zMzQ1NyIgY3k9Ijc3LjM3NTIzIiByPSI3Ny4zNzUyMyIgZmlsbD0iIzZjNjNmZiIvPjxwYXRoIGQ9Ik05NDIuODksMjg1LjIyM0g4NzguNzc5MTFhNC40MjU4Miw0LjQyNTgyLDAsMCwxLTQuNDIxNDQtNC40MjE0NVYyNDIuMTEzOTFhNC40MjYxNiw0LjQyNjE2LDAsMCwxLDQuNDIxNDQtNC40MjE0NEg5NDIuODlhNC40MjYxNiw0LjQyNjE2LDAsMCwxLDQuNDIxNDQsNC40MjE0NHYzOC42ODc2MUE0LjQyNTgyLDQuNDI1ODIsMCwwLDEsOTQyLjg5LDI4NS4yMjNabS02NC4xMTA5MS00My4xMDkwNnYzOC42ODc2MWg2NC4xMTQxNUw5NDIuODksMjQyLjExMzkxWiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTIwMy41IC0xNzQuMTM0MjQpIiBmaWxsPSIjZmZmIi8+PHBhdGggZD0iTTkzMC43MzEwNSwyNDIuMTEzOTFoLTM5Ljc5M1YyMjQuNDI4MTRjMC0xMi44MDk4Nyw4LjM2NzkyLTIyLjEwNzIxLDE5Ljg5NjQ5LTIyLjEwNzIxczE5Ljg5NjQ4LDkuMjk3MzQsMTkuODk2NDgsMjIuMTA3MjFabS0zNS4zNzE1My00LjQyMTQ0aDMwLjk1MDA5VjIyNC40MjgxNGMwLTEwLjQxMy02LjM2MzM4LTE3LjY4NTc2LTE1LjQ3NS0xNy42ODU3NnMtMTUuNDc1MDUsNy4yNzI4MS0xNS40NzUwNSwxNy42ODU3NloiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yMDMuNSAtMTc0LjEzNDI0KSIgZmlsbD0iI2ZmZiIvPjxjaXJjbGUgY3g9IjcwNy4zMzQ1NyIgY3k9Ijg2LjIxODExIiByPSI0LjQyMTQ0IiBmaWxsPSIjZmZmIi8+PHBhdGggZD0iTTg1Ni44MTk5NCw0MjEuMjgzNzJINTM4LjE4MDA2YTUuOTA3NjcsNS45MDc2NywwLDAsMS01LjkwMDczLTUuOTAwNzNWMzM2LjM0MmE1LjkwNzY3LDUuOTA3NjcsMCwwLDEsNS45MDA3My01LjkwMDcySDg1Ni44MTk5NGE1LjkwNzY3LDUuOTA3NjcsMCwwLDEsNS45MDA3Myw1LjkwMDcyVjQxNS4zODNBNS45MDc2Nyw1LjkwNzY3LDAsMCwxLDg1Ni44MTk5NCw0MjEuMjgzNzJabS0zMTguNjM5ODgtODguNDgyMWEzLjU0NDMsMy41NDQzLDAsMCwwLTMuNTQwNDMsMy41NDA0M1Y0MTUuMzgzYTMuNTQ0MzEsMy41NDQzMSwwLDAsMCwzLjU0MDQzLDMuNTQwNDRIODU2LjgxOTk0YTMuNTQ0MzEsMy41NDQzMSwwLDAsMCwzLjU0MDQzLTMuNTQwNDRWMzM2LjM0MmEzLjU0NDMsMy41NDQzLDAsMCwwLTMuNTQwNDMtMy41NDA0M1oiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yMDMuNSAtMTc0LjEzNDI0KSIgZmlsbD0iI2U2ZTZlNiIvPjxjaXJjbGUgY3g9IjM4NC4xOTAyMSIgY3k9IjE5OC42OTU0NiIgcj0iMjQuMDM2NDUiIGZpbGw9IiNlNmU2ZTYiLz48cGF0aCBkPSJNNjQzLjIwMywzNTYuODA1NDFhNC4wMDYwOCw0LjAwNjA4LDAsMSwwLDAsOC4wMTIxNUg4MzIuMDYwNzRhNC4wMDYwNyw0LjAwNjA3LDAsMCwwLDAtOC4wMTIxNVoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yMDMuNSAtMTc0LjEzNDI0KSIgZmlsbD0iI2U2ZTZlNiIvPjxwYXRoIGQ9Ik02NDMuMjAzLDM4MC44NDE4NmE0LjAwNjA3LDQuMDA2MDcsMCwxLDAsMCw4LjAxMjE0SDcyNC40NjlhNC4wMDYwNyw0LjAwNjA3LDAsMSwwLDAtOC4wMTIxNFoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yMDMuNSAtMTc0LjEzNDI0KSIgZmlsbD0iI2U2ZTZlNiIvPjxwYXRoIGQ9Ik00NjcuMDIyLDM4Mi40NjI0MSw0MDguMTE4OSw0MTMuNzc4bC0uNzQ1NjEtMjYuMDk2MjljMTkuMjI1NTMtMy4yMDk0OCwzNy41MTY2OS04Ljc5NzQsNTQuNDI5NDEtMTcuODk0Nmw2LjE2MDUtMTUuMjIwMDhhMTAuMzE3NTMsMTAuMzE3NTMsMCwwLDEsMTcuNTM2NDMtMi42Nzc4OGwwLDBhMTAuMzE3NTMsMTAuMzE3NTMsMCwwLDEtLjkwODQ3LDE0LjA2ODg1WiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTIwMy41IC0xNzQuMTM0MjQpIiBmaWxsPSIjZmZiOGI4Ii8+PHBhdGggZD0iTTMyMy4wOTgxOSw1NjMuMjY3MDd2MGExMS41NzM3OCwxMS41NzM3OCwwLDAsMSwxLjQ2OTI4LTkuMzYzMTFsMTIuOTM5MzEtMTkuODU3NzdhMjIuNjEyMjEsMjIuNjEyMjEsMCwwLDEsMjkuMzM1LTcuNzM5MjdoMGMtNS40MzgsOS4yNTY0Ny00LjY3OTk0LDE3LjM3Njc5LDEuODc4MDYsMjQuNDMzNjVhMTE3LjYzMDg1LDExNy42MzA4NSwwLDAsMC0yNy45MzYwNiwxOS4wNDQ5MkExMS41NzM4NiwxMS41NzM4NiwwLDAsMSwzMjMuMDk4MTksNTYzLjI2NzA3WiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTIwMy41IC0xNzQuMTM0MjQpIiBmaWxsPSIjMmYyZTQxIi8+PHBhdGggZD0iTTQ2OS43MDQ3NSw1MzcuMzAyNzRsMCwwYTIyLjIwMzE0LDIyLjIwMzE0LDAsMCwxLTE4Ljg3MDg1LDEwLjc3OTA5bC04NS45NjAyNy42NTEyMi0zLjcyOC0yMS42MjI2NCwzOC4wMjYtMTEuMTg0MTMtMzIuMDYxMTYtMjQuNjA1MDdMNDAyLjE1NCw0NTAuMzEyNzdsNjMuNjUsNTkuMzI0MzFBMjIuMjAzMTcsMjIuMjAzMTcsMCwwLDEsNDY5LjcwNDc1LDUzNy4zMDI3NFoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yMDMuNSAtMTc0LjEzNDI0KSIgZmlsbD0iIzJmMmU0MSIvPjxwYXRoIGQ9Ik0zNTEuNDUyNjYsNjg1LjE3OTM5SDMzMS4zMjEyNGMtMTguMDc1MDktMTIzLjg5NzcyLTM2LjQ3MzgzLTI0OC4xNDE4NiwxNy44OTQ2LTI5NC41MTUyOWw2NC4xMjIzMSwxMC40Mzg1Mkw0MDUuMTM2NDYsNDU1LjUzMmwtMzUuNzg5Miw0MS4wMDg0NVoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yMDMuNSAtMTc0LjEzNDI0KSIgZmlsbD0iIzJmMmU0MSIvPjxwYXRoIGQ9Ik0zNjkuMTQ5MTcsNzEzLjI0NTk0aDBhMTEuNTczODEsMTEuNTczODEsMCwwLDEtOS4zNjMyLTEuNDY4NzNsLTIxLjg1ODU0LTIuOTM4MTRhMjIuNjEyMjEsMjIuNjEyMjEsMCwwLDEtNy43NDEtMjkuMzM0NTF2MGM5LjI1NjgsNS40Mzc0OSwxNy4zNzcwNyw0LjY3ODkxLDI0LjQzMzU0LTEuODc5NSw0Ljk4NTkzLDEwLjA2NzM4LDEzLjIwMDkzLDkuNDUzMzEsMjEuMDQ2NTcsMTcuOTM0OTRBMTEuNTczODUsMTEuNTczODUsMCwwLDEsMzY5LjE0OTE3LDcxMy4yNDU5NFoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yMDMuNSAtMTc0LjEzNDI0KSIgZmlsbD0iIzJmMmU0MSIvPjxwYXRoIGQ9Ik0zOTkuMTcxNiwzMDcuOTAxNThsLTM3LjI4MDQyLTguOTQ3MzFjNi4xOTE2OC0xMi42NzM5LDYuNzAxNTUtMjYuNzc2MTgsMy43MjgtNDEuNzU0MDZsMjUuMzUwNjgtLjc0NTYxQzM5MS43NjQyMSwyNzUuMDgsMzk0LjE2NzMyLDI5Mi40ODA4MSwzOTkuMTcxNiwzMDcuOTAxNThaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjAzLjUgLTE3NC4xMzQyNCkiIGZpbGw9IiNmZmI4YjgiLz48cGF0aCBkPSJNNDA5LjQxNzUyLDQyMy41NTI0M2MtMjcuMTM4NzMsMTguNDkzMDgtNDYuMzE0MTguNjMyNzItNjAuOTQ3MjktMjYuOTIzNDYsMi4wMzMzOC0xNi44NjE4OC0xLjI1OS0zNy4wNDA2MS03LjM1NjcyLTU4Ljk2NjM1YTQwLjEzNzYyLDQwLjEzNzYyLDAsMCwxLDI0LjUwNTY3LTQ4LjQwMTI0aDBsMzIuMDYxMTYsMTMuNDIxYzI3LjIyMzYyLDIyLjE5MDM4LDMyLjU4Miw0Ni4yMjcsMjIuMzY4MjUsNzEuNTc4NFoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yMDMuNSAtMTc0LjEzNDI0KSIgZmlsbD0iIzZjNjNmZiIvPjxwYXRoIGQ9Ik0zMzEuMzIxMjQsMzI2LjU0MTc4LDMwMS40OTY5LDM0Mi4xOTk1Nmw1Mi45MzgyLDMxLjMxNTU1LDcuMzY2LDE4LjE2OTUxYTkuNjM2NzMsOS42MzY3MywwLDAsMS01Ljc4OTI1LDEyLjczMDg4aDBhOS42MzY3Myw5LjYzNjczLDAsMCwxLTEyLjc2MTU5LTguNTQ0NDJsLS43NDQ4OS0xMi42NjMwNy02Ny4yODM4LTIyLjIwMzY2YTE1LjczMzA2LDE1LjczMzA2LDAsMCwxLTkuODcyNjUtOS42MTE0N3YwYTE1LjczMywxNS43MzMsMCwwLDEsNS45MDI2Mi0xOC4zMDI1OGw1NC4xMDQ4NS0zNy4xMTg0NVoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yMDMuNSAtMTc0LjEzNDI0KSIgZmlsbD0iI2ZmYjhiOCIvPjxwYXRoIGQ9Ik0zNjEuMTQ1NTcsMzI5LjUyNDIyYy0xMi40Mzg2MS01LjQ1MTEtMjMuNzQ5MzQuNDcwNDQtMzguMDI2LDUuMjE5MjZsLTIuMjM2ODMtMzkuNTE3MjVjMTQuMTc2MTItNy41NTU2OCwyNy42OTIwOS05LjU5MjgxLDQwLjI2Mjg1LTMuNzI4WiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTIwMy41IC0xNzQuMTM0MjQpIiBmaWxsPSIjNmM2M2ZmIi8+PGNpcmNsZSBjeD0iMTcyLjUyNDk2IiBjeT0iNzguMDkyNTEiIHI9IjIzLjgwMjExIiBmaWxsPSIjZmZiOGI4Ii8+PHBhdGggZD0iTTQwNC41LDI0OS4yMjM1M2MtMjMuNTY2MTYsMi4zMDgxMS00MS41MjMzOC0xLjU0NjA2LTUzLTEyLjUyMDA3di04LjgzNzdoNTFaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjAzLjUgLTE3NC4xMzQyNCkiIGZpbGw9IiMyZjJlNDEiLz48L3N2Zz4="
                alt="music"
              ></Img>
            </ImgWrapper>
          </FormColumn>
          <FormColumn small={small}>
            <FormTitle lightTitle={lightTitle}>Registro</FormTitle>
            <FormWrapper lightText={lightText} onSubmit={handleSubmit}>
              {formData.map((el, index) => (
                <FormInputRow key={index}>
                  <FormLabel>{el.label}</FormLabel>
                  <FormInput
                    type={el.type}
                    placeholder={`Enter your ${el.label.toLocaleLowerCase()}`}
                    value={el.value}
                    onChange={el.onChange}
                  />
                </FormInputRow>
              ))}
              <FormInputRow>
                <FormLabel>Sou Professor</FormLabel>
                <FormInput
                  type="checkbox"
                  value="true"
                  onClick={() => {
                    setIsTeacher(!isTeacher);
                  }}
                />
              </FormInputRow>
              <DefaultButton primary type="submit">
                CADASTRAR
              </DefaultButton>
            </FormWrapper>
            {error && (
              <FormMessage
                errorLightBg={errorLightBg}
                variants={messageVariants}
                initial="hidden"
                animate="animate"
                hasError={!!error}
              >
                {error}
              </FormMessage>
            )}
            {success && (
              <FormMessage
                hasError={!!error}
                errorLightBg={errorLightBg}
                variants={messageVariants}
                initial="hidden"
                animate="animate"
              >
                {success}
              </FormMessage>
            )}
          </FormColumn>
        </FormRow>
      </Container>
    </FormSection>
  );
};
