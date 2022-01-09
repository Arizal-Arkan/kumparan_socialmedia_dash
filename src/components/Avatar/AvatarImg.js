import React, { memo } from 'react'
import Avatar from '@mui/material/Avatar';
import PropTypes from 'prop-types';

function AvatarImg(props) {
    const { name } = props;

    const stringToColor = (string) => {
        let hash = 0;
        let i;

        for (i = 0; i < string.length; i += 1) {
            hash = string?.charCodeAt(i) + ((hash << 5) - hash);
        }

        let color = '#';

        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value?.toString(16)}`.substr(-2);
        }

        return color;
    }

    const stringAvatar = (name) => {
        return {
            sx: {
                bgcolor: stringToColor(name),
            },
            children: `${name?.split(' ')[0][0]}${name?.split(' ')[1][0]}`,
        };
    }

    return (
        <>
        <Avatar sx={{ width: 100, height: 100 }} {...stringAvatar(name)} />
        </>
    )
}

AvatarImg.propTypes = {
    name: PropTypes.string,
};
  
AvatarImg.defaultProps = {
    name: '',
};

export default memo(AvatarImg);
