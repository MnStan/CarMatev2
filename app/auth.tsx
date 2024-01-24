'use client'

export const LoginButton = () => {
    const login = async () => {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        // Dodaj tutaj inne opcje, takie jak nagłówki lub dane formularza
      });
  
      if (res.ok) {
        // Zalogowano pomyślnie
      } else {
        // Obsłuż błąd logowania
      }
    };
  
    return <button onClick={login}>Zaloguj</button>;
  };

export const LogoutButton = () => {
    const logout = async () => {
      const res = await fetch('/api/auth/logout', {
        method: 'POST',
        // Dodaj tutaj inne opcje, takie jak nagłówki
      });
  
      if (res.ok) {
        // Wylogowano pomyślnie
      } else {
        // Obsłuż błąd wylogowania
      }
    };
  
    return <button onClick={logout}>Wyloguj</button>;
  };