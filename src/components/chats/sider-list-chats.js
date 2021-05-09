import React from 'react'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Menu, Layout } from 'antd';
import Icon from '@ant-design/icons';
import { setActiveChatId, toggleCollapseSiderChat } from 'store/chats/actions';
import { getActiveChatId, getChatsList, getIsCollapsedSider } from 'store/chats/selectors';
const { Sider } = Layout;

function SiderListChats(props) {
    const {
        chats,
        setActiveChatId,
        activeChatId,
        toggleCollapseSiderChat,
        isCollapsed,
        searchValue
    } = props;

    const filteredChats = (searchValue?.toString().trim().length && chats.filter(({ userInfo }) => {
        return userInfo.name?.toString().toLowerCase().trim().includes(searchValue.toString().toLowerCase().trim())
    })) || chats;

    return (
        <Sider
            width={300}
            theme={'light'}
            collapsible={true}
            collapsed={isCollapsed}
            onCollapse={toggleCollapseSiderChat}
        >
            <Menu mode="inline" selectedKeys={[activeChatId]}>
                {filteredChats.map((chat) => {
                    const { userInfo, id } = chat;
                    const { name, photo, status } = userInfo;
                    return (
                        <Menu.Item
                            key={id}
                            onClick={() => setActiveChatId(id)}
                            icon={<Icon component={() => (
                                <>
                                    <img src={photo} alt="logo" />
                                    <div className={status.online ? `indicator indicator-online` : `indicator indicator-offline`}></div>
                                </>
                            )} />}>
                            {name}
                        </Menu.Item>
                    )
                })}
            </Menu>
        </Sider>
    )
}

const mapStateToProps = (state) => {
    const activeChatId = getActiveChatId(state)
    const chats = getChatsList(state);
    return {
        chats,
        activeChatId,
        isCollapsed: getIsCollapsedSider(state),
    };
};

const mapDispatchToProps = {
    setActiveChatId, toggleCollapseSiderChat
};

const EnchancedSiderListChats = compose(
    connect(mapStateToProps, mapDispatchToProps),
)(SiderListChats);

export { EnchancedSiderListChats };