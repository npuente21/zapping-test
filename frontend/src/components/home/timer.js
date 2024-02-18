import { useState } from "react";

const Timer = (props) => {
    const [actualTime, setActualTime] = useState(0);
    const formatTime = (milisegundos) => {
        const horas = Math.floor(milisegundos / (1000 * 60 * 60));
        const minutos = Math.floor((milisegundos % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((milisegundos % (1000 * 60)) / 1000);
        return `${horas}h ${minutos}m ${segundos}s`;
      };
    const {startedTime, stop} = props;
    if(!stop){
        setTimeout(() => {
            setActualTime(new Date() - new Date(startedTime));
        }, 1000);
    }
    
    return (
            <p>{formatTime(actualTime)}</p>
    );
};
export default Timer;