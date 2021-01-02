import { ProfileCard } from 'components/cards/profile'
import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { getProfileId } from 'store/profiles/selectors';
import { fetchProfileId } from 'store/profiles/actions';

function PageProfileContainer(props) {
    const {
        img,
        name,
        email,
        isDataExist,
        fetchProfileId,
        id,
    } = props

    useEffect(() => {
        if (!isDataExist && id) {
            fetchProfileId(id)
        }
    }, [isDataExist, fetchProfileId, id])

    return (
        <ProfileCard
            img={img}
            nameTitle={name}
            email={email}
            title={"Контакт"}
            isDataExist={isDataExist}
            returnBtn={true}
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
        isDataExist: profile,
        id,
    }
};

const mapDispatchToProps = { fetchProfileId };

const PageProfiles = compose(
    connect(mapStateToProps, mapDispatchToProps),
)(PageProfileContainer);

export { PageProfiles };