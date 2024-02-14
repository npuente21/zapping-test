export default function UserSourceService({ baseUrl }) {
    const USER_PATH = '/user';
  
    return {
        login,
        logout,
        createUser,
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

    async function login(email, password) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const response = await fetch(`${baseUrl}${USER_PATH}`, {method: 'POST', headers: headers, body: JSON.stringify({email, password})})
        return await response.json();
    }

    async function logout() {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const response = await fetch(`${baseUrl}${USER_PATH}`, {method: 'POST', headers: headers})
        return await response.json();
    }


}