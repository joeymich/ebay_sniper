import { useState, useRef, useEffect } from 'react';

export const Timer = ({ endDate }: any) => {
    endDate = endDate + 'Z'
    const Ref = useRef<NodeJS.Timer | null>(null);

    const [timer, setTimer] = useState('');


    const getTimeRemaining = (e: any) => {
        const total = Date.parse(e) - Date.parse((new Date()).toString());
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        const hours = Math.floor((total / 1000 / 60 / 60) % 24);
        const days = Math.floor((total / 1000 / 60 / 60 / 24));
        return {
            total, days, hours, minutes, seconds
        };
    }

    const startTimer = (e: any) => {
        let { total, days, hours, minutes, seconds } = getTimeRemaining(e);
        if (total >= 0) {

            // update the timer
            // check if less than 10 then we need to 
            // add '0' at the beginning of the variable
            if (days > 0) {
                setTimer(
                    days + 'd ' +
                    hours + 'h'
                )
            }
            else if (hours > 0) {
                setTimer(
                    hours + 'h ' +
                    minutes + 'm'
                )
            }
            else if (minutes > 0) {
                setTimer(
                    minutes + 'm ' +
                    seconds + 's'
                )
            }
            else if (seconds > 0) {
                setTimer(
                    seconds + 's'
                )
            }
        }
        else
            setTimer('');
    }

    const clearTimer = (e: any) => {

        // If you adjust it you should also need to
        // adjust the Endtime formula we are about
        // to code next    
        // setTimer('00:00:10');
        // setTimer((new Date).toUTCString());
        startTimer(e);

        // If you try to remove this line the 
        // updating of timer Variable will be
        // after 1000ms or 1sec
        if (Ref.current) clearInterval(Ref.current);
        const id = setInterval(() => {
            startTimer(e);
        }, 1000)
        Ref.current = id;
    }

    const getDeadTime = () => {
        let deadline = new Date(endDate);

        // This is where you need to adjust if 
        // you entend to add more time
        // deadline.setSeconds(deadline.getSeconds() + 10);
        return deadline;
    }

    useEffect(() => {
        clearTimer(getDeadTime());
    }, []);

    return (
        <>
            {timer}
        </>
    )
}