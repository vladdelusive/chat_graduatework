import { VideoCameraOutlined } from '@ant-design/icons'
import { Tooltip } from 'antd'
import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { onMakeCall } from 'store/call/actions'

function VideoCallBtn(props) {
    const { profile, onMakeCall } = props;
    return (
        <Tooltip title="Видео звонок">
            <VideoCameraOutlined className="video-call-btn" onClick={() => {
                onMakeCall(profile)
            }} />
        </Tooltip>
    )
}


const mapStateToProps = (state, props) => {
    return {
        
    }
};

const mapDispatchToProps = { onMakeCall };

const VideoCallButton = compose(
    connect(mapStateToProps, mapDispatchToProps),
)(VideoCallBtn);

export { VideoCallButton };
