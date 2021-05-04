import React, { useState } from 'react';
import { Button, Col, Form, Row, Spin, Upload, message } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone, FileImageOutlined, LockOutlined, SmileOutlined, UploadOutlined, UserOutlined } from '@ant-design/icons';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { checkForm, checkValue } from 'utils/validation';
import { AInput } from 'components';
import { AInputPassword } from 'components/controls';
import { noty } from 'utils';
import { fetchRegisterByMailAndPassword } from 'store/auth/actions';
import { hasPreloader } from 'store/preloaders/selectors';

function SignUpForm(props) {
    const {
        pending,
        handleSubmit,
        fetchRegisterByMailAndPassword,
    } = props

    const [file, setFile] = useState([])
    const [isDefaultImage, setIsDefaultImage] = useState(false)

    const logIn = (values) => {
        if (!file.length && !isDefaultImage) {
            message.error(`Завантажте картинку для аватарки або використайте резервне фото`);
        } else {
            const valuesData = {
                ...values,
                photo: file[0],
                isDefaultImage,
            }
            fetchRegisterByMailAndPassword(valuesData)
        }
    }

    const propsUpload = {
        name: 'file',
        onChange({ file }) {
            console.log(file);
            if (file.status === 'removed') {
                return
            }
            const error = checkValue([file], {
                fileTypes: 'png, jpg, jpeg',
                fileSize: 8 * 1024
            });
            if (!error) {
                setFile([file]);
            } else {
                noty('error', error);
            }
        },
        accept: "image/*",
        headers: { "content-type": "multipart/form-data" },
        showUploadList: true,
        multiple: false,
        beforeUpload: () => false,
        fileList: file,
        onRemove: () => {
            setFile([])
        }
    }

    return <Form onSubmitCapture={handleSubmit(logIn)} className="form form-registration">
        <Spin spinning={false}>
            <div className={'form__body'}>
                <Row>
                    <Field
                        component={AInput}
                        prefix={<SmileOutlined />}
                        name={'name'}
                        type={'text'}
                        placeholder={"Ім'я / нікнейм"}
                        size="large"
                        hint="Введіть своє ім'я або нікнейм"
                        disabled={pending}
                    />
                </Row>
                <Row>
                    <Field
                        component={AInput}
                        prefix={<UserOutlined />}
                        name={'email'}
                        type={'text'}
                        placeholder={'Пошта'}
                        size="large"
                        hint="Введіть будь-яку свою пошту"
                        disabled={pending}
                    />
                </Row>
                <Row>
                    <Field
                        component={AInputPassword}
                        prefix={<LockOutlined />}
                        name={'password'}
                        type={'password'}
                        placeholder={'Пароль'}
                        size="large"
                        iconRender={visible => visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />}
                        hint="Введіть коректний пароль"
                        disabled={pending}
                    />
                </Row>
                <Row style={{ marginBottom: file.length ? 50 : 20 }} typeof="flex" justify="space-between">
                    <Col>
                        <Upload {...propsUpload}>
                            <Button
                                icon={<UploadOutlined />}
                                loading={pending}
                                disabled={isDefaultImage}
                                type={!!file.length ? "dashed" : "default"}
                                style={!!file.length ? { background: "#ddefff" } : {}}
                            >Завантажте аватарку</Button>
                        </Upload>
                    </Col>
                    <Col>
                        <div className="or-devider">- або -</div>
                    </Col>
                    <Col>
                        <Button
                            icon={<FileImageOutlined />}
                            loading={pending}
                            disabled={!!file.length}
                            type={isDefaultImage ? "dashed" : "default"}
                            onClick={() => {
                                setIsDefaultImage(!isDefaultImage)
                            }}
                            style={isDefaultImage ? { background: "#ddefff" } : {}}
                        >
                            Використати резервну
                        </Button>
                    </Col>

                </Row>
            </div>
        </Spin>

        <div className={'form__footer'}>
            <Row gutter={6}>
                <Col span={24}>
                    <Button
                        htmlType={'submit'}
                        className={'control control--submit'}
                        type={'primary'}
                        size="large"
                        style={{ width: "100%" }}
                        loading={pending}
                    >
                        Зареєструватися
                    </Button>
                </Col>
            </Row>
        </div>
    </Form>
}

const validate = (values) => {
    return checkForm(values, {
        'email': { required: true, email: true },
        'password': { required: true, minLength: 8 },
        'name': { required: true, minLength: 2 },
    });
};

const mapStateToProps = (state) => {
    return {
        pending: hasPreloader(state, fetchRegisterByMailAndPassword)
    }
};

const mapDispatchToProps = {
    fetchRegisterByMailAndPassword,
};

const EnhancedSignUpForm = compose(
    connect(mapStateToProps, mapDispatchToProps),
    reduxForm({
        form: 'sign-form',
        validate,
    })
)(SignUpForm);

export { EnhancedSignUpForm };