import React, { useEffect } from 'react'
import '../../css/page.css'
import { Link } from 'react-router-dom';

//Redux
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../../redux/actions';

//Component
import Avatar from '../../components/Avatar';

function Home() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUsers())
    }, [dispatch])

    const eState = useSelector((state) => state.home);

    const { dataUsers } = eState;

    return (
        <div>
            { /* List Users */}
            <div>
                <h1>List Users</h1>
                <div className='list-card'>
                    {dataUsers && dataUsers?.map((val, i) => {
                        return (
                            <Link className='card-container' key={i} to={`detail-user/${val.id}`}>
                                <div>
                                    <Avatar name={val.name} />
                                    <div>
                                        <p>{`${val?.name}`}</p>
                                        <p>{`${val?.username}`}</p>
                                    </div>
                                </div>
                                <p><span>Email:</span> {`${val?.email}`}</p>
                                <p><span>Phone:</span> {`${val?.phone}`}</p>
                            </Link>

                        )
                    })}
                </div>
            </div>

        </div>
    )
}

export default Home
