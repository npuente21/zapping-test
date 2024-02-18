export default function StreamSourceService({ baseUrl }) {
    const STREAM_PATH = '/public/videos';
  
    return {
        getStreamData,
    };
    async function getStreamData(id) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const response = await fetch(`${baseUrl}${STREAM_PATH}/${id}`, {method: 'GET', headers: headers, credentials: 'include'})
        if(response.status === 200){
          return await response.json();
        }
        else{
          throw new Error(await response.text());
        }
    }
}
