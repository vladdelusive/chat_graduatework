import React from 'react';
import { Button, Col, Form, Row, Spin } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone, LockOutlined, UserOutlined } from '@ant-design/icons';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { checkForm } from 'utils/validation';
import { AInput } from 'components';
import { AInputPassword } from 'components/controls';
import { fetchLogInByMailAndPassword } from 'store/auth/actions';

function LoginForm(props) {
    const {
        pending,
        handleSubmit,
        fetchLogInByMailAndPassword,
    } = props

    return (
        <Form onSubmitCapture={handleSubmit(fetchLogInByMailAndPassword)}>
            <Spin spinning={false}>
                <div className={'form__body'}>
                    <Row>
                        <Field
                            component={AInput}
                            prefix={<UserOutlined />}
                            name={'email'}
                            type={'text'}
                            placeholder={'Почта'}
                            size="large"
                            hint="Введите свою почту"
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
                            hint="Введите корректный пароль"
                        />
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
                            onClick={() => { }}
                        >
                            Авторизоватся
                            </Button>
                    </Col>
                </Row>
                {/* <Row style={{ marginTop: 20 }} typeof="flex" justify="center">
                        <Col>
                            <Button
                                className={'control'}
                                type={'text'}
                                size="small"
                                onClick={() => { }}
                            >
                                I don`t have an account
                            </Button>
                        </Col>
                    </Row> */}
            </div>
        </Form>
    )
}

const validate = (values) => {
    return checkForm(values, {
        'email': { required: true, email: true },
        'password': { required: true, minLength: 8 },
    });
};

const mapStateToProps = (state) => {
    return {}
};

const mapDispatchToProps = {
    fetchLogInByMailAndPassword,
};

const EnhancedLoginForm = compose(
    connect(mapStateToProps, mapDispatchToProps),
    reduxForm({
        form: 'login-form',
        validate,
    })
)(LoginForm);

export { EnhancedLoginForm };