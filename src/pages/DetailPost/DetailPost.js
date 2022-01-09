import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { makeStyles } from "@material-ui/core/styles"
import Swal from 'sweetalert2';
import { API } from '../../config';


// Redux
import { useDispatch, useSelector } from 'react-redux';
import { getPostDetail, getComment } from '../../redux/actions';

const useStyles = makeStyles({
    input: {
        color: "white"
    }
});

function DetailPost() {
    const params = useParams();
    const dispatch = useDispatch();
    const classes = useStyles();

    const [valueName, setvalueName] = React.useState('');
    const [valueEmail, setvalueEmail] = React.useState('');
    const [valueComment, setvalueComment] = React.useState('');

    useEffect(() => {
        dispatch(getPostDetail(params.idPost));
        dispatch(getComment(params.idPost));
    }, [dispatch, params]);

    const eState = useSelector((state) => state.detailPost);

    const { detailPost, dataComment } = eState;

    const _handleChangeTextName = e => {
        setvalueName(e.target.value);
    };

    const _handleChangeTextEmail = e => {
        setvalueEmail(e.target.value);
    };

    const _handleChangeTextComment = e => {
        setvalueComment(e.target.value);
    };

    // Add comments
    const _handleComment = () => {

        const body = JSON.stringify({
            name: valueName,
            email: valueEmail,
            body: valueComment,
            userId: params.idUser,
            postId: params.idPost
        });

        API.sendComment(body)
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Success add comment',
                    showConfirmButton: true,
                })
            })
            .catch(e => {
                console.error(e);
                Swal.fire({
                    icon: 'error',
                    title: 'Failed add post',
                    showConfirmButton: true,
                })
            })
    };

    // Delete Comment
    const _handleDelete = (item) => {
        Swal.fire({
            title: 'Are you sure delete this comment?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then((result) => {
            if (result.isConfirmed) {
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                })

                API.deleteComment(item.id)
                    .then(() => {
                        Toast.fire({
                            icon: 'success',
                            title: 'Delete successfuly'
                        })
                    })
                    .catch(e => {
                        console.error(e);
                        Swal.fire({
                            icon: 'error',
                            title: 'Failed delete comment',
                            showConfirmButton: true,
                        })
                    })
            }
        })
    }

    //Edit Post
    const _handleEdit = (items) => {
        const nameForm = items.name;
        const emailForm = items.email;
        const bodyForm = items.body;
        Swal.fire({
            title: 'Edit Post',
            html: `<input type="textarea" value="${nameForm}" id="name" class="swal2-input" placeholder="Title">
            <input type="textarea" value="${emailForm}" id="email" class="swal2-input" placeholder="Title">
            <input type="text" value="${bodyForm}" id="body" class="swal2-input" placeholder="Body">`,
            confirmButtonText: 'Edit',
            focusConfirm: false,
            preConfirm: () => {
                const name = Swal.getPopup().querySelector('#name').value
                const email = Swal.getPopup().querySelector('#email').value
                const body = Swal.getPopup().querySelector('#body').value
                if (!name || !body || !email) {
                    Swal.showValidationMessage(`Please enter name, email and body`)
                }
                return { name: name, body: body, email: email }
            }
        }).then((result) => {
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })

            const nameForm = `${result?.value?.name}`.trim()
            const emailForm = `${result?.value?.email}`.trim()
            const bodyForm = `${result?.value?.body}`.trim()

            const body = JSON.stringify({
                id: items.id,
                name: nameForm,
                email: emailForm,
                body: bodyForm,
                postId: params.idPost
            })

            API.updateComment(items.id, body)
                .then(() => {
                    Toast.fire({
                        icon: 'success',
                        title: 'Edit successfuly'
                    })
                })
                .catch(e => {
                    console.error(e);
                    Swal.fire({
                        icon: 'error',
                        title: 'Failed edit comment',
                        showConfirmButton: true,
                    })
                })
        })
    }

    return (
        <div>
            <h1>Detail Post</h1>
            <div className='card-container' style={{ width: '50%', margin: '0 auto', marginBottom: '50px' }}>
                <h3>{detailPost?.title}</h3>
                <p>{detailPost?.body}</p>
            </div>
            <h1>Comment</h1>
            <TextField
                fullWidth
                multiline
                rows={1}
                onChange={_handleChangeTextName}
                inputProps={{ className: classes.input }}
                style={{ marginTop: '10px' }}
                placeholder='Your name . . .'
            />
            <TextField
                fullWidth
                multiline
                rows={1}
                onChange={_handleChangeTextEmail}
                inputProps={{ className: classes.input }}
                style={{ marginTop: '10px' }}
                placeholder='Your email . . .'
            />
            <TextField
                fullWidth
                multiline
                rows={4}
                onChange={_handleChangeTextComment}
                inputProps={{ className: classes.input }}
                style={{ marginTop: '10px' }}
                placeholder='Write shomething . . .'
            />
            <Button onClick={_handleComment} style={{ marginTop: '20px', marginBottom: '50px' }} variant='contained'> COMMENT </Button>
            <div className='list-card'>
                {dataComment && dataComment?.map((val, i) => {
                    return (
                        <div key={i} className='card-container'>
                            <h3>{val?.name}</h3>
                            <h4>{val?.email}</h4>
                            <p>{val?.body}</p>
                            <Button color='error' onClick={() => _handleDelete(val)} style={{ marginTop: '20px', marginRight: '10px' }} variant='contained'> DELETE </Button>
                            <Button onClick={() => _handleEdit(val)} style={{ marginTop: '20px' }} variant='contained'> EDIT </Button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default DetailPost
