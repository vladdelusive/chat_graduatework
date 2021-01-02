import React from 'react';
import { Tabs } from 'antd';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { EnhancedSignUpForm as SignUpForm } from './sign-form';
import { EnhancedLoginForm as LoginForm } from './login-form';

const { TabPane } = Tabs;

const AuthForm = () => {
    return (
        <Tabs defaultActiveKey="1" type="card" size={"large"}>
            <TabPane tab="Авторизация" key="1">
                <LoginForm />
            </TabPane>
            <TabPane tab="Регистрация" key="2">
                <SignUpForm />
            </TabPane>
        </Tabs>
    )
}

const mapStateToProps = (state) => {
    return {}
};

const mapDispatchToProps = {};

const EnhancedAuthForm = compose(
    connect(mapStateToProps, mapDispatchToProps),
)(AuthForm);

export { EnhancedAuthForm };