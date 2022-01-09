import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import Tabs from '@mui/material/Tabs';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { makeStyles } from "@material-ui/core/styles";
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { API } from '../../config';
import Swal from 'sweetalert2';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { getDetailUser, getPostUser, getAlbumUser } from '../../redux/actions';

//Component
import Avatar from '../../components/Avatar';

const useStyles = makeStyles({
    input: {
        color: "white"
    }
});

export function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <Typography
            aria-labelledby={`simple-tab-${index}`}
            component="div"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            role="tabpanel"
            {...other}
        >
            {value === index && children}
        </Typography>
    );
}

function DetailUser() {
    const params = useParams();
    const dispatch = useDispatch();
    const classes = useStyles();

    const [value, setValue] = React.useState(0);
    const [valuePost, setValuePost] = React.useState('');
    const [valueBody, setValueBody] = React.useState('');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        dispatch(getDetailUser(params.idUser));
        dispatch(getPostUser(params.idUser));
        dispatch(getAlbumUser(params.idUser));
    }, [dispatch, params]);

    const eState = useSelector((state) => state.detailUser);

    const { detailUser, dataPost, dataAlbum } = eState;

    //Change Tabs
    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    const _handleChangeText = e => {
        setValuePost(e.target.value);
    };

    const _handleChangeTextBody = e => {
        setValueBody(e.target.value);
    };

    // Add post
    const _handlePost = () => {
        const body = JSON.stringify({
            title: valuePost,
            body: valueBody,
            userId: params.idUser
        })
        API.sendPost(body)
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Success add post',
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

    // Delete Post
    const _handleDelete = () => {
        Swal.fire({
            title: 'Are you sure delete this post?',
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

                API.deletePost(params.idUser)
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
                            title: 'Failed delete post',
                            showConfirmButton: true,
                        })
                    })
            }
        })
    }

    //Edit Post
    const _handleEdit = (items) => {
        const titleForm = items.title;
        const bodyForm = items.body;
        Swal.fire({
            title: 'Edit Post',
            html: `<input type="textarea" value="${titleForm}" autocomplete="off" id="title" class="swal2-input" placeholder="Title">
            <input type="text" value="${bodyForm}" id="body" class="swal2-input" placeholder="Body">`,
            confirmButtonText: 'Edit',
            focusConfirm: false,
            preConfirm: () => {
                const title = Swal.getPopup().querySelector('#title').value
                const body = Swal.getPopup().querySelector('#body').value
                if (!title || !body) {
                    Swal.showValidationMessage(`Please enter title and body`)
                }
                return { title: title, body: body }
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

            const titleForm = `${result?.value?.title}`.trim()
            const bodyForm = `${result?.value?.body}`.trim()

            const body = JSON.stringify({
                id: items.id,
                title: titleForm,
                body: bodyForm,
                userId: params.idUser
            })

            API.updatePost(items.id, body)
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
                        title: 'Failed edit post',
                        showConfirmButton: true,
                    })
                })
          })
    }

    return (
        <div>
            <h1>Detail Profile</h1>
            <div className='card-container-detail'>
                <div>
                    <Avatar name={detailUser.name === undefined ? 'default name' : detailUser?.name} />
                    <div>
                        <p>{detailUser?.name}</p>
                        <p>{detailUser?.username}</p>
                    </div>
                </div>
                <p><span>Email:</span> {detailUser?.email}</p>
                <p><span>Phone:</span> {detailUser?.phone}</p>
                <p><span>Company:</span> {detailUser?.company?.name}</p>
                <p><span>Address:</span> {detailUser?.address?.city}</p>
            </div>
            <div>
                <Tabs value={value} onChange={handleChange} centered>
                    <Tab label="POST" {...a11yProps(0)} />
                    <Tab label="ALBUM" {...a11yProps(1)} />
                </Tabs>

                <TabPanel index={0} value={value} >
                    <div className='text-contain'>
                        <TextField
                            fullWidth
                            multiline
                            rows={2}
                            onChange={_handleChangeText}
                            inputProps={{ className: classes.input }}
                            style={{ marginTop: '10px' }}
                            placeholder='Write title . . .'
                        />
                        <TextField
                            fullWidth
                            multiline
                            rows={3}
                            onChange={_handleChangeTextBody}
                            inputProps={{ className: classes.input }}
                            style={{ marginTop: '10px' }}
                            placeholder='Whant on your mind ? . . .'
                        />
                        <Button onClick={_handlePost} style={{ marginTop: '20px' }} variant='contained'> POST </Button>
                    </div>
                    <div className='list-card' style={{ marginTop: '20px' }}>
                        {dataPost && dataPost?.map((val, i) => {
                            return (
                                <div key={i} className='card-container'>
                                    <Link to={`/detail-post/${val.id}`} style={{ textDecoration: 'none' }}>
                                        <h3>{val.title}</h3>
                                        <p>{val.body}</p>
                                    </Link>
                                    <div>
                                        <Button color='error' onClick={_handleDelete} style={{ marginTop: '20px', marginRight: '10px' }} variant='contained'> DELETE </Button>
                                        <Button onClick={() => _handleEdit(val)} style={{ marginTop: '20px' }} variant='contained'> EDIT </Button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </TabPanel>

                <TabPanel index={1} value={value} >
                    <div className='list-card' style={{ marginTop: '20px' }}>
                        {dataAlbum && dataAlbum?.map((val, i) => {
                            return (
                                <Link to={`/detail-album/${val.id}`} key={i} className='card-container'>
                                    <h3> <span>Album: </span>{val.title}</h3>
                                </Link>
                            )
                        })}
                    </div>
                </TabPanel>
            </div>
        </div>
    )
}

export default DetailUser