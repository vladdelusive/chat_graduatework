import { ProfileCard } from 'components/cards/profile'
import React from 'react'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { getAuthProfile } from 'store/auth/selectors';

function PageProfileContainer(props) {
    const {
        img,
        name,
        email,
    } = props

    return (
        <ProfileCard
            img={img}
            nameTitle={name}
            email={email}
            title={"Ваш профиль"}
            isDataExist={true}
        />
    )
}

const mapStateToProps = (state) => {
    const profile = getAuthProfile(state)
    return {
        img: profile.photo,
        name: profile.name,
        email: profile.email,
    };
};

const mapDispatchToProps = {};

const PageProfile = compose(
    connect(mapStateToProps, mapDispatchToProps),
)(PageProfileContainer);

export { PageProfile };