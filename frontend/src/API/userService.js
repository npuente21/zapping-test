export default function UserSourceService({ baseUrl }) {
    const USER_PATH = '/user';
    const USER_LOGIN_PATH = '/auth/login';
    const USER_LOGOUT_PATH = '/auth/logout';
  
    return {
        login,
        logout,
        createUser,
        getProfile,
    };
  
    async function createUser(first_name, last_name, email, password) {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      const response = await fetch(`${baseUrl}${USER_PATH}`, {method: 'POST', headers: headers, body: JSON.stringify({first_name, last_name, email, password})})
      if(response.status === 200){
        return await response.json();
      }
      else{
        throw new Error(await response.text());
      }
      
    }

    async function getProfile() {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const response = await fetch(`${baseUrl}${USER_PATH}/profile/`, {method: 'GET', headers: headers, credentials: 'include'})
        if(response.status === 200){
          return await response.json();
        }
        else{
          throw new Error(await response.text());
        }
    }

    async function login(email, password) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const response = await fetch(`${baseUrl}${USER_LOGIN_PATH}`, {method: 'POST', headers: headers, credentials: 'include', body: JSON.stringify({email, password})})
        if(response.status === 200){
          return await response.json();
        }
        else{
          throw new Error(await response.text());
        }
    }

    async function logout() {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const response = await fetch(`${baseUrl}${USER_LOGOUT_PATH}`, {method: 'POST', headers: headers,  credentials: 'include'})
        if(response.status === 200){
          return await response.json();
        }
        else{
          throw new Error(await response.text());
        }
    }


}