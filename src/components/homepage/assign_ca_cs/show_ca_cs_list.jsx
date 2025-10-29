import React, { useState, useEffect,useContext } from 'react';
import {getCaCSData} from '../../controller/agent_data_controller';
import { AppContext } from '../../provider'

export const ShowCaCsList = ({requestData}) => {
    const {setSelectedCaCsId } = useContext(AppContext);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCard, setSelectedCard] = useState(-1);
    useEffect(() => {
        const fetchData = async () => {
            try {
                let result = await getCaCSData();
                setData(result);
                console.log('result:', result)
            } catch (err) {
                console.error("Error fetching:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    if (loading) return <p>Loading...</p>;

    return <div>
        {data.map((item, index) => (
            <div style={{border: selectedCard==index? '3px solid black':'' }} className='requestCard' onClick={()=>{ 
                // setCurrentItemData(item);
                setSelectedCard(index);
                setSelectedCaCsId(item[0]);
            }
                }>
            <div>
                <p><span className='requestCardLabel'>ID :  </span><span className='requestCardItem'>{item[0]}</span></p>
                <p><span className='requestCardItem'>{item[1]}</span></p>
                <p><span className='requestCardItem'>{item[2]}</span></p>
                <p><span className='requestCardItem'>{item[3]}</span></p>
            </div>
            </div>
        )

        )}
    </div>
}


