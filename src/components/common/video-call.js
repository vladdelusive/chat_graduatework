import { VideoCameraOutlined, QuestionCircleFilled } from '@ant-design/icons'
import { Popconfirm, Tooltip } from 'antd'
import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { onMakeCall } from 'store/call/actions'
import { getCallStateType } from 'store/call/selectors'

function VideoCallBtn(props) {
    const { profile, onMakeCall, isCurrentCall } = props;
    return isCurrentCall
        ? (
            <Popconfirm
                title={'Зателефонувавши, Ви завершите поточний дзвінок ...'}
                icon={<QuestionCircleFilled />}
                okText={'Зрозумів, окей'}
                cancelText={'Тоді ні'}
                placement={"left"}
                onConfirm={() => {
                    onMakeCall(profile)
                }}
            >
                <Tooltip title="Відеодзвінок">
                    <VideoCameraOutlined className="video-call-btn" />
                </Tooltip>
            </Popconfirm>
        )
        : (
            <Tooltip title="Відеодзвінок">
                <VideoCameraOutlined className="video-call-btn" onClick={() => {
                    onMakeCall(profile)
                }} />
            </Tooltip>
        )

}



const mapStateToProps = (state, props) => {
    return {
        isCurrentCall: !!getCallStateType(state),
    }
};

const mapDispatchToProps = { onMakeCall };

const VideoCallButton = compose(
    connect(mapStateToProps, mapDispatchToProps),
)(VideoCallBtn);

export { VideoCallButton };
