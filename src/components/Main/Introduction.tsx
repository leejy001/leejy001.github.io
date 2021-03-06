import React from 'react'
import styled from '@emotion/styled'
import ProfileImage from './ProfileImage'
import { IGatsbyImageData } from 'gatsby-plugin-image'

type IntroductionType = {
  profileImage: IGatsbyImageData
}

function Introduction({ profileImage }: IntroductionType) {
  return (
    <Background>
      <IntroductionWrapper>
        <ProfileImage profileImage={profileImage} />
        <div>
          <SubTitle>Wellcome!</SubTitle>
          <Title>Frontend Developer Leeblog.</Title>
        </div>
      </IntroductionWrapper>
    </Background>
  )
}

export default Introduction

const Background = styled.div`
  width: 100%;
  background-image: linear-gradient(60deg, #29323c 0%, #485563 100%);
  color: white;
`

const IntroductionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 768px;
  height: 400px;
  margin: 0 auto;
  @media (max-width: 768px) {
    width: 100%;
    height: 300px;
    padding: 0 20px;
  }
`

const SubTitle = styled.div`
  font-size: 20px;
  font-weight: 400;
  @media (max-width: 768px) {
    font-size: 15px;
  }
`

const Title = styled.div`
  margin-top: 5px;
  font-size: 30px;
  font-weight: 700;
  @media (max-width: 768px) {
    font-size: 25px;
  }
`
