import React, { useEffect, useState } from 'react'
import axios from 'axios';
function Subscriber(props) {
    const userTo = props.userTo
    const userFrom = props.userFrom

    const [SubscribeNumber, setSubscribeNumber] = useState(0)
    const [Subscribed, setSubscribed] = useState(false);

    let SubscribeVariables = {
        userTo, userFrom
    }

    useEffect(() => {

        const subscribeNumberVariables = { userTo: userTo, userFrom: userFrom }
        axios.post('/api/subscribe/subscribeNumber', subscribeNumberVariables)
            .then(response => {
                if (response.data.success) {
                    setSubscribeNumber(response.data.subscribeNumber)
                } else {
                    alert('Failed to get subscriber Number')
                }
            })

        axios.post('/api/subscribe/subscribed', subscribeNumberVariables)
            .then(response => {
                if (response.data.success) {
                    setSubscribed(response.data.subcribed)
                } else {
                    alert('Failed to get Subscribed Information')
                }
            })

    }, [])

    const onSubscribe = () => {
        if (Subscribed) {
            //when we are aleady subscribed



            axios.post('/api/subscribe/unSubscribe', SubscribeVariables)
                .then(response => {
                    if (response.data.success) {

                        setSubscribeNumber(SubscribeNumber - 1);
                        setSubscribed(!Subscribed);
                    } else {
                        alert("failed to unsubscribe")
                    }
                })



        } else {

            axios.post('/api/subscribe/subscribe', SubscribeVariables)
                .then(response => {
                    if (response.data.success) {

                        setSubscribeNumber(SubscribeNumber + 1);
                        setSubscribed(!Subscribed);

                    } else {
                        alert("failed to subscribe")
                    }
                })

        }
    }



    return (
        <div>
            <button onClick={onSubscribe} style={{
                backgroundColor: `${Subscribed ? '#AAAAAA' : '#CC0000'}`,
                borderRadius: '4px', color: 'white',
                padding: '10px 16px', fontWeight: '500', fontSize: '1rem', textTransform: 'uppercase'
            }}>
                {SubscribeNumber} {Subscribed ? 'Subscribed' :
                    'Subscribe'}
            </button>
        </div>
    )
}

export default Subscriber

//make the button
//now fetch the no. of Subscribers using the useEffect mechanism
// receive the video writer's id as a prop 
//receive the userLogged In from local storage as while loging in we had stored that there





//video11
//making the subscrbe feature
//add on onClick event handker to the button
//if subscribesd make unsubscribe request and vice versa and then update the state 
//make the routes in the backend
