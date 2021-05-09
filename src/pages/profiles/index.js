import { ProfileCard } from 'components/cards/profile'
import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { getProfileId } from 'store/profiles/selectors';
import { fetchProfileId, onSnapshotFetchUpdateProfileId } from 'store/profiles/actions';
import { api } from 'services';

function PageProfileContainer(props) {
    const {
        img,
        name,
        email,
        isDataExist,
        fetchProfileId,
        id,
        onlineInfo,
        onSnapshotFetchUpdateProfileId,
    } = props

    useEffect(() => {
        if (id) {
            fetchProfileId(id)
        }
        let unsubscribeToProfile;
        if (id) {
            unsubscribeToProfile = api.profiles.subscribeToProfile(id, onSnapshotFetchUpdateProfileId)
        }
        return () => {
            if (typeof unsubscribeToProfile === "function" && id) {
                unsubscribeToProfile()
            }
        }
    }, [fetchProfileId, id, onSnapshotFetchUpdateProfileId])

    return (
        <ProfileCard
            img={img}
            nameTitle={name}
            email={email}
            title={"Контакт"}
            isDataExist={isDataExist}
            returnBtn={true}
            isToChat={true}
            id={id}
            onlineInfo={onlineInfo}
        />
    )
}

const mapStateToProps = (state, props) => {
    const id = props.match.params["id"]
    const profile = getProfileId(state, id)
    return {
        img: profile?.photo,
        name: profile?.name,
        email: profile?.email,
        onlineInfo: profile?.status || {},
        isDataExist: profile,
        id,
    }
};

const mapDispatchToProps = { fetchProfileId, onSnapshotFetchUpdateProfileId };

const PageProfiles = compose(
    connect(mapStateToProps, mapDispatchToProps),
)(PageProfileContainer);

export { PageProfiles };