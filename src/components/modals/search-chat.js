import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Modal, List, Skeleton, Avatar, Row, Col, Input, Button, Tag } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { getIsLoadingUsersChats, getUsersChats } from 'store/chats/selectors';
import { createNewChat, fetchUsersForChat } from 'store/chats/actions';
import { Link } from 'react-router-dom';
import { routes } from 'routes';

function SearchChatModal(props) {
    const { setIsShowNewChatModal, chatList, fetchUsersForChat, loading, createNewChat } = props;

    const [isShow, setIsShow] = useState(true)
    const [searchValue, setSearchValue] = useState("")

    const filteredChatsList = (searchValue?.toString().trim().length && chatList.filter(({ name, email }) => {
        return name?.toString().toLowerCase().trim().includes(searchValue.toString().toLowerCase().trim()) || email?.toString().toLowerCase().trim().includes(searchValue.toString().toLowerCase().trim())
    })) || chatList;

    useEffect(() => {
        fetchUsersForChat()
    }, [fetchUsersForChat])

    const clodeModal = () => {
        setTimeout(() => setIsShowNewChatModal(false), 200)
        setIsShow(false)
    }

    return (
        <Modal
            visible={isShow}
            title="Начните чат с новым пользователем"
            onCancel={clodeModal}
        >
            <Row typeof="flex" justify="center" style={{ marginBottom: 10 }} >
                <Col span={24}>
                    <Input
                        className="input"
                        placeholder="Поиск по имейл или имени..."
                        size="large"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}

                    />
                </Col>
            </Row>
            <List
                className="chat-list-modal"
                loading={loading}
                itemLayout="horizontal"
                loadMore={false}
                dataSource={filteredChatsList}
                renderItem={item => (
                    <List.Item
                        actions={[
                            <Button
                                size="small"
                                onClick={() => createNewChat({ chatWithUserUid: item.uid, callback: clodeModal })}
                            >Начать чат</Button>
                        ]}
                    >
                        <Skeleton avatar title={false} loading={item.loading} active>
                            <List.Item.Meta
                                avatar={
                                    <Link to={routes["profiles"].link(item.uid)}>
                                        <Avatar src={item.photo} icon={<UserOutlined />} />
                                    </Link>
                                }
                                title={<Link to={routes["profiles"].link(item.uid)}>{item.name}</Link>}
                                description={<Tag>{item.email}</Tag>}
                            />
                        </Skeleton>
                    </List.Item>
                )}
            />
        </Modal>
    )
}


const mapStateToProps = (state) => {
    return {
        chatList: getUsersChats(state),
        loading: getIsLoadingUsersChats(state),
    }
};

const mapDispatchToProps = { fetchUsersForChat, createNewChat };

const EnhancedSearchChatModal = compose(
    connect(mapStateToProps, mapDispatchToProps),
)(SearchChatModal);

export { EnhancedSearchChatModal };