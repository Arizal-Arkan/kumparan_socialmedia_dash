import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { getPostDetail, getComment } from '../../redux/actions';


function DetailPost() {
    const params = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPostDetail(params.idPost));
        dispatch(getComment(params.idPost));
    }, [dispatch, params]);

    const eState = useSelector((state) => state.detailPost);

    const { detailPost, dataComment } = eState;

    console.log(detailPost);

    return (
        <div>
            <h1>Detail Post</h1>
            <div className='card-container' style={{ width: '50%', margin: '0 auto', marginBottom: '50px' }}>
                <h3>{detailPost?.title}</h3>
                <p>{detailPost?.body}</p>
            </div>
            <h1>Comment</h1>
            <div className='list-card'>
                {dataComment && dataComment?.map((val, i) => {
                    return (
                        <div key={i} className='card-container'>
                            <h3>{val?.name}</h3>
                            <h4>{val?.email}</h4>
                            <p>{val?.body}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default DetailPost
