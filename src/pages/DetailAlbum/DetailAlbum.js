import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { getAlbumDetail, getPhoto } from '../../redux/actions';

function DetailAlbum() {
    const params = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAlbumDetail(params.idAlbum));
        dispatch(getPhoto(params.idAlbum));
    }, [dispatch, params]);

    const eState = useSelector((state) => state.detailAlbum);

    const { detailAlbum, dataPhoto } = eState;

    const _handleDetail = (image) => {
        Swal.fire({
            imageUrl: `${image}`,
            imageHeight: 500,
            imageAlt: `${image}`
        })
    }

    return (
        <div>
            <h1>Detail Album from <i> {detailAlbum?.title} </i></h1>
            <div className='list-card'>
                {dataPhoto && dataPhoto?.map((val, i) => {
                    return (
                        <div onClick={() => _handleDetail(val?.url)} key={i} className='card-container'>
                            <h3>{val?.title}</h3>
                            <img width='100%' height={200} src={val?.url} alt="" />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default DetailAlbum
