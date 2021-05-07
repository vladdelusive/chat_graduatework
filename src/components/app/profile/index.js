import React from 'react'
import { Col, Dropdown, Menu, Row } from 'antd';
import { DownOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Avatar from 'antd/lib/avatar/avatar';
import { getAuthProfile } from 'store/auth/selectors';
import { clearAuth } from 'store/auth/actions';
import { routes } from 'routes';
import { push } from 'connected-react-router';

function ProfileContainer(props) {
    const {
        name,
        img,
        uid,
        clearAuth,
        push
    } = props;

    const onClickLogout = () => {
        clearAuth(uid)
        push(routes.home.link())
    }

    const welcomeTitle = `${name}`
    const menu = (
        <Menu>
            <Menu.Item key="0" onClick={() => push(routes.profile.link())} ><UserOutlined />Профіль</Menu.Item>
            <Menu.Divider />
            <Menu.Item key="1" onClick={onClickLogout}><LogoutOutlined />Вийти</Menu.Item>
        </Menu>
    )
    return (
        <Dropdown overlay={menu}>
            <a className="ant-dropdown-link" onClick={e => e.preventDefault()} href="/">
                <Row justify="center" align="middle" gutter="12">
                    <Col>
                        {welcomeTitle}&nbsp;
                        <DownOutlined size="large" />
                    </Col>
                    <Col>
                        <Avatar size="large" src={img} />
                    </Col>
                </Row>
            </a>
        </Dropdown>
    )
}

const mapStateToProps = (state) => {
    const profile = getAuthProfile(state)
    return {
        img: profile.photo,
        name: profile.name,
        email: profile.email,
        uid: profile.uid,
    };
};

const mapDispatchToProps = { clearAuth, push };

const Profile = compose(
    connect(mapStateToProps, mapDispatchToProps),
)(ProfileContainer);

export { Profile };
