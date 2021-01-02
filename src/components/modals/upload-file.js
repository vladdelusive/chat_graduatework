import React, { useState } from 'react'
import { Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { compose } from 'redux';
import { connect } from 'react-redux';

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

const state = {
    previewVisible: false,
    previewImage: '',
    previewTitle: '',
    fileList: [
        {
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
        {
            uid: '-2',
            name: 'image.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
    ],
};
const UploadImage = () => {

    const [stateSettings, setStateSettings] = useState(state)

    const handleCancel = () => setStateSettings((prev) => ({ ...prev, previewVisible: false }));

    const handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        setStateSettings((prev) => ({
            ...prev,
            previewImage: file.url || file.preview,
            previewVisible: true,
            previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
        }));
    };

    const handleChange = ({ fileList }) => setStateSettings((prev) => ({ ...prev, fileList }));

    const { previewVisible, previewImage, fileList, previewTitle } = stateSettings;

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    return <>
        <Upload
            listType=""
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
        >
            {fileList.length >= 8 ? null : uploadButton}
        </Upload>
        <Modal
            visible={previewVisible}
            title={previewTitle}
            footer={null}
            onCancel={handleCancel}
        >
            <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
    </>
}


const mapStateToProps = (state) => {
    return {}
};

const mapDispatchToProps = {};

const EnhancedUploadImage = compose(
    connect(mapStateToProps, mapDispatchToProps),
)(UploadImage);

export { EnhancedUploadImage };