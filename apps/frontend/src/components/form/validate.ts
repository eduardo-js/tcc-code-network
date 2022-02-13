interface ValidateFormProps {
  name: string;
  email: string;
  password: string;
  confirmPass: string;
}
export default function validateForm({ name, email, password, confirmPass }: ValidateFormProps) {
  if (!name.trim()) {
    return 'Nome é um campo obrigatório!';
  }

  const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i;
  if (!email) {
    return 'Email não pode ser vazio!';
  } else if (regex.test(email.toLocaleLowerCase())) {
    return 'Email não é válido';
  }
  if (!password) {
    return 'Senha não pode ser vazia!';
  } else if (password.length < 6) {
    return 'Senhas precisam ter pelo menos 6 caracteres';
  }

  if (!confirmPass) {
    return 'Confirmar senha não pode ser vazia!';
  } else if (confirmPass !== password) {
    return 'Senhas não são iguais!';
  }
  return null;
}
