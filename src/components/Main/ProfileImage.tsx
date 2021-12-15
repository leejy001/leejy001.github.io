import React from 'react'
import styled from '@emotion/styled'
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image'

type ProfileImageType = {
  profileImage: IGatsbyImageData
}

function ProfileImage({ profileImage }: ProfileImageType) {
  return <ProfileImageWrapper image={profileImage} alt="Profile Image" />
}

export default ProfileImage

const ProfileImageWrapper = styled(GatsbyImage)`
  width: 120px;
  height: 120px;
  margin-bottom: 30px;
  border-radius: 50%;

  @media (max-width: 768px) {
    width: 80px;
    height: 80px;
  }
`
