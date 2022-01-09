import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import Tabs from '@mui/material/Tabs';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { makeStyles } from "@material-ui/core/styles";
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

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

    console.log(eState);

    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
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
                    rows={6}
                    inputProps={{ className: classes.input }}
                    style={{ marginTop: '10px' }}
                    placeholder='Write shomething . . .'
                />
                <Button style={{ marginTop: '20px' }} variant='contained'> POST </Button>
            </div>
                    <div className='list-card' style={{ marginTop: '20px' }}>
                        {dataPost && dataPost?.map((val, i) => {
                            return (
                                <Link to={`/detail-post/${val.id}`} key={i} className='card-container'>
                                    <h3>{val.title}</h3>
                                    <p>{val.body}</p>
                                </Link>
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