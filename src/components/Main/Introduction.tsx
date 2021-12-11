import React from 'react'
import styled from '@emotion/styled'
import ProfileImage from './ProfileImage'

function Introduction() {
  return (
    <Background>
      <IntroductionWrapper>
        <ProfileImage />
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
`

const SubTitle = styled.div`
  font-size: 20px;
  font-weight: 400;
`

const Title = styled.div`
  margin-top: 5px;
  font-size: 30px;
  font-weight: 700;
`
